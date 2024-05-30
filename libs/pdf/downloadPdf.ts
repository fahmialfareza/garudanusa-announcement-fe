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
      proxy: "https://cors-anywhere.herokuapp.com/",
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
    const padding = 0; // 1 cm in mm
    const pageWidth = pdf.internal.pageSize.getWidth() - 2 * padding;
    const pageHeight = pdf.internal.pageSize.getHeight() - 2 * padding;
    const widthRatio = pageWidth / canvas.width;
    const heightRatio = pageHeight / canvas.height;
    const ratio = Math.min(widthRatio, heightRatio);

    // Add background color
    pdf.setFillColor(255, 255, 255);
    pdf.rect(
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight(),
      "F"
    );

    // Add the canvas image to PDF with padding
    pdf.addImage(
      imgData,
      "PNG",
      padding,
      padding,
      canvas.width * ratio,
      canvas.height * ratio
    );

    // Save the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error("Error during PDF generation: ", error);
  }
};
