/* eslint-disable */
/* prettier-ignore-start */
import { Extension } from "@tiptap/core";

const FontFamily = Extension.create({
  name: "fontFamily",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: element =>
              element.style.fontFamily?.replace(/['"]+/g, ""),
            renderHTML: attributes => {
              if (!attributes.fontFamily) return {};
              return { style: `font-family: ${attributes.fontFamily}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontFamily:
        fontFamily =>
        ({ chain, editor }) => {
          const prev = editor.getAttributes("textStyle");

          return chain()
            .setMark("textStyle", { ...prev, fontFamily })
            .run();
        },
    };
  },
});

export default FontFamily;
