/* eslint-disable */
/* prettier-ignore-start */
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import FontSize from "./extensions/FontSize";
import FontFamily from "./extensions/FontFamily";
import ToolbarTiptap from "./ToolbarTiptap";
import Placeholder from "@tiptap/extension-placeholder";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Subscript from "@tiptap/extension-subscript";
import "./tiptap.css";

const EditorTiptap = ({
  value,
  onChange,
  onBlur,
  invalid,
  name,
  ...rest }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        // listKeymap: false,
      }),
      Underline,
      TextStyle,
      Color,
      Highlight,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      FontSize,
      FontFamily,
      ListItem,
      BulletList.configure({
        keepMarks: true,
        keepAttributes: false,
      }),
      OrderedList.configure({
        keepMarks: true,
        keepAttributes: false,
      }),

      Placeholder.configure({
        placeholder: "Enter Text Here",
        emptyEditorClass: "is-editor-empty",
      }),
      Subscript,
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: "_blank",
          rel: "noopener noreferrer",
          class: "text-blue-500 underline cursor-pointer",
        },
      }),
    ],
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML() || "");
    },
    onBlur: () => {
      if (onBlur) {
        onBlur();
      }
    },
  });

  React.useEffect(() => {
  if (!editor || !value) return;

  const hasImage = editor.getHTML().includes("<img");
  const valueHasImage = value.includes("<img");

  // jangan replace content kalau editor sudah ada image
  if (!hasImage && value !== editor.getHTML()) {
    editor.commands.setContent(value);
  }
}, [value, editor]);


  return (
    <div className="editor-container">
      <div>
        <ToolbarTiptap editor={editor} />
      </div>
      <div className="border rounded p-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default EditorTiptap;
