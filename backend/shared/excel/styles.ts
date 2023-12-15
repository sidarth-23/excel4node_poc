import { wb } from "./workbook";

export var contentStyle = wb.createStyle({
  font: {
    color: "#000000",
    size: 12,
  },
});

export var headerStyle = wb.createStyle({
  font: {
    color: "#000000",
    size: 12,
    bold: true,
    underline: true,
  },
  fill: {
    type: "pattern", // the fill type
    patternType: "solid", // the pattern type
    fgColor: "FFFF00", // the color in hexadecimal format
  },
  numberFormat: "$#,##0.00; ($#,##0.00); -",
});

export var infoStyle = wb.createStyle({
  font: {
    color: "#000000",
    size: 12,
    italics: true,
  },
});
