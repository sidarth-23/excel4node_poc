var xl = require("excel4node");

export const wb = new xl.Workbook({
    alignment: {
      shrinkToFit: true,
      wrapText: true,
    },
  });