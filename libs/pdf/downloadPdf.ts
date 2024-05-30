import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const exportPDF = async ({
  exportRef,
  fileName,
}: {
  exportRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}): Promise<void> => {
  if (!exportRef.current) {
    console.error("Export reference is not available.");
    return;
  }

  try {
    const canvas = await html2canvas(exportRef.current, {
      onclone: function (doc) {
        // Make PDF export header only visible in export document
        const pdfHeader = doc.querySelector(
          ".pdf-export-header"
        ) as HTMLElement | null;
        if (pdfHeader) {
          pdfHeader.style.display = "block";
        }
      },
      backgroundColor: "#FFFFFF",
      scale: 1,
      useCORS: true, // Helpful if your component contains images from external sources
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      putOnlyUsedFonts: true,
      compress: true,
    });

    // Apply document padding
    const padding = 10; // 10 mm padding
    const pageWidth = pdf.internal.pageSize.getWidth() - 2 * padding;
    const pageHeight = pdf.internal.pageSize.getHeight() - 2 * padding;
    const widthRatio = pageWidth / canvas.width;
    const heightRatio = pageHeight / canvas.height;
    const ratio = Math.min(widthRatio, heightRatio);

    // Calculate the centered position
    const canvasWidth = canvas.width * ratio;
    const canvasHeight = canvas.height * ratio;
    const x = (pdf.internal.pageSize.getWidth() - canvasWidth) / 2;
    const y = (pdf.internal.pageSize.getHeight() - canvasHeight) / 2;

    // Add background color
    pdf.setFillColor(255, 255, 255);
    pdf.rect(
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight(),
      "F"
    );

    // Add the canvas image to PDF centered
    pdf.addImage(imgData, "PNG", x, y, canvasWidth, canvasHeight);

    // Save the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error("Error during PDF generation: ", error);
  }
};
