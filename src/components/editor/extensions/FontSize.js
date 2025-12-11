/* eslint-disable */
/* prettier-ignore-start */
import { Extension } from "@tiptap/core";

const FontSize = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize?.replace(/['"]+/g, ""),
            renderHTML: attributes => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        fontSize =>
        ({ chain, editor }) => {
          const prev = editor.getAttributes("textStyle");

          return chain()
            .setMark("textStyle", { ...prev, fontSize: `${fontSize}px` })
            .run();
        },
    };
  },
});

export default FontSize;
