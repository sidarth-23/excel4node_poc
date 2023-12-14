import { Router } from "express";
var xl = require("excel4node");

export default function users() {
  const router = Router();

  router
    .get("/", (req, res, next) => {
      var wb = new xl.Workbook();
      var ws = wb.addWorksheet("Sheet 1");
      var style = wb.createStyle({
        font: {
          color: "#FF0800",
          size: 12,
        },
        numberFormat: "$#,##0.00; ($#,##0.00); -",
      });
      ws.cell(1, 1).string("Hello").style(style);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Excel.xlsx"
      );

      wb.write("Excel.xlsx", res);

    })
    .post(["/", "/:id"], (req, res, next) => {
      const params = req.params;
      const id = params.id;
      const queryParams = req.query;
    });

  return router;
}
