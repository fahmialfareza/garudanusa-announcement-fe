"use client";

import React from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { Color } from "@tiptap/extension-color";
import { Paper } from "@mantine/core";
import "@mantine/tiptap/styles.css";
import TextStyle from "@tiptap/extension-text-style";

interface PreviewEditorProps {
  content?: string;
}
const PreviewEditor = ({ content }: PreviewEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener",
          style: "cursor: pointer; text-decoration: underline;",
        },
      }),
      Superscript,
      SubScript,
      Highlight,
      Color,
      TextStyle,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({
        inline: true,
      }),
    ],
    content,
  });

  return (
    <Paper w="100%">
      <RichTextEditor editor={editor}>
        <RichTextEditor.Content />
      </RichTextEditor>
    </Paper>
  );
};

export default PreviewEditor;
