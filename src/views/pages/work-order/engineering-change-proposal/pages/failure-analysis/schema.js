/* eslint-disable */
/* prettier-ignore-start */
import * as Yup from "yup";

const clean = (v) =>
  (v ?? "")
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .trim();

const faTaskSchema = Yup.object().shape({
  fmea_summary: Yup.string().nullable(),
  fmea_desc: Yup.string().nullable(),
  rcfa_summary: Yup.string().nullable(),
  rcfa_desc: Yup.string().nullable(),
  cba_summary: Yup.string().nullable(),
  cba_desc: Yup.string().nullable(),
  lcca_summary: Yup.string().nullable(),
  lcca_desc: Yup.string().nullable(),
}).test(
  "pair-required",
  "Isi salah satu pasangan Summary & Description (misal FMEA Summary + FMEA Desc)",
  function (values) {
    if (!values) return false;

    const pairs = [
      ["fmea_summary", "fmea_desc"],
      ["rcfa_summary", "rcfa_desc"],
      ["cba_summary", "cba_desc"],
      ["lcca_summary", "lcca_desc"],
    ];

    const hasCompletePair = pairs.some(([sKey, dKey]) => {
      const s = clean(values[sKey]);
      const d = clean(values[dKey]);
      return s !== "" && d !== "";
    });

    if (hasCompletePair) return true;

    return this.createError({
      path: "fmea_summary",
      message:
        "Isi minimal satu pasangan Summary & Description (misal FMEA Summary + FMEA Desc)",
    });
  }
);

export { faTaskSchema };
