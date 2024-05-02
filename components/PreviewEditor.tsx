import React from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Paper } from "@mantine/core";
interface PreviewEditorProps {
  content: string;
}
const PreviewEditor = ({ content }: PreviewEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content,
  });

  return (
    <Paper withBorder p={24} w="100%">
      <RichTextEditor editor={editor}>
        <RichTextEditor.Content />
      </RichTextEditor>
    </Paper>
  );
};

export default PreviewEditor;
