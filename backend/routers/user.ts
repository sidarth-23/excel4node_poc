import { Router } from "express";
var xl = require("excel4node");
var faker = require("faker"); // for generating random data

var headerContent = ["Name", "Age", "DOB", "Address", "Twitter", "Email"];

var randomData = [
  {
    name: "John Doe",
    age: 24,
    dob: "1994-01-01",
    address: "123 Fake St. San Francisco, CA 94101",
    twitter: "@johndoe",
    email: "john@gmail.com",
  },
  {
    name: "Jane Doe",
    age: 25,
    dob: "1993-02-02",
    address: "456 Fake St. San Francisco, CA 94101",
    twitter: "@janedoe",
    email: "jane@gmail.com",
  },
  {
    name: "Sammy Doe",
    age: 26,
    dob: "1992-03-03",
    address: "789 Fake St. San Francisco, CA 94101",
    twitter: "@sammydoe",
    email: "sammy",
  },
  {
    name: "Barry Doe",
    age: 27,
    dob: "1991-04-04",
    address: "101 Fake St. San Francisco, CA 94101",
    twitter: "@barrydoe",
    email: "",
  },
  {
    name: "Steve Smith",
    age: 28,
    dob: "1990-05-05",
    address: "111 Fake St. San Francisco, CA 94101",
    twitter: "@stevesmith",
    email: "",
  },
  {
    name: "Sally Smith",
    age: 29,
    dob: "1989-06-06",
    address: "222 Fake St. San Francisco, CA 94101",
    twitter: "@sallysmith",
    email: "",
  },
  {
    name: "Ben Smith",
    age: 30,
    dob: "1988-07-07",
    address: "333 Fake St. San Francisco, CA 94101",
    twitter: "@bensmith",
    email: "",
  },
  {
    name: "Beth Smith",
    age: 31,
    dob: "1987-08-08",
    address: "444 Fake St. San Francisco, CA 94101",
    twitter: "@bethsmith",
    email: "",
  },
  {
    name: "Larry Smith",
    age: 32,
    dob: "1986-09-09",
    address: "555 Fake St. San Francisco, CA 94101",
    twitter: "@larrysmith",
    email: "",
  },
  {
    name: "Linda Smith",
    age: 33,
    dob: "1985-10-10",
    address: "666 Fake St. San Francisco, CA 94101",
    twitter: "@lindasmith",
    email: "",
  },
  {
    name: "Oliver Smith",
    age: 34,
    dob: "1984-11-11",
    address: "777 Fake St. San Francisco, CA 94101",
    twitter: "@oliversmith",
    email: "",
  },
];

var headerContentInvoice = [
  "Invoice ID",
  "Item",
  "Quantity",
  "Price",
  "Total",
  "Date",
];

// Generate random data
var randomDataInvoice = Array.from({ length: 6 }, () => ({
  invoiceId: faker.datatype.uuid(),
  item: faker.commerce.productName(),
  quantity: faker.datatype.number({ min: 1, max: 10 }),
  price: faker.commerce.price(),
  total: function () {
    return this.quantity * this.price;
  },
  date: faker.date.recent().toLocaleDateString(),
}));

var wb = new xl.Workbook({
  alignment: {
    shrinkToFit: true,
    wrapText: true,
  },
});
var contentStyle = wb.createStyle({
  font: {
    color: "#000000",
    size: 12,
  },
});

var headerStyle = wb.createStyle({
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

var infoStyle = wb.createStyle({
  font: {
    color: "#000000",
    size: 12,
    italics: true,
  },
});
function addInvoice(ws: any, startRow: number) {
  try {
    // Add a line space
    startRow++;

    // Add title row
    ws.cell(startRow, 1, startRow, 6, true)
      .string("Order Invoice")
      .style({ alignment: { horizontal: "center" } });

    // Add headers
    startRow++;
    headerContentInvoice.forEach((header, index) => {
      ws.cell(startRow, index + 1)
        .string(header)
        .style(headerStyle);
    });

    // Add invoice data
    startRow++;
    randomDataInvoice.forEach((item, i) => {
      ws.cell(startRow + i, 1).string(item.invoiceId);
      ws.cell(startRow + i, 2).string(item.item);
      ws.cell(startRow + i, 3).number(parseInt(item.quantity));
      ws.cell(startRow + i, 4).number(parseInt(item.price));
      ws.cell(startRow + i, 5).number(item.total());
      ws.cell(startRow + i, 6).string(item.date);
    });

    // Add total
    ws.cell(startRow + randomDataInvoice.length, 4)
      .string("Total")
      .style(headerStyle);
    ws.cell(startRow + randomDataInvoice.length, 5)
      .formula(`SUM(E${startRow}:E${randomDataInvoice.length + startRow - 1})`)
      .style(infoStyle);
  } catch (e) {
    console.log(e);
  }
}

export default function users() {
  const router = Router();

  router
    .get("/file", (req, res, next) => {
      const userEmail = req.query.email;

      var ws = wb.addWorksheet("Sheet 1");
      ws.cell(1, 1, 1, 6, true)
        .string("A user list")
        .style({ alignment: { horizontal: "center" } });
      for (var i = 0; i < headerContent.length; i++) {
        ws.cell(2, i + 1)
          .string(headerContent[i])
          .style(headerStyle);
      }
      for (var i = 1; i < randomData.length; i++) {
        var item = randomData[i];
        ws.cell(i + 2, 1)
          .string(item.name)
          .style(contentStyle);
        ws.cell(i + 2, 2)
          .number(item.age)
          .style(contentStyle);
        ws.cell(i + 2, 3)
          .date(new Date(item.dob))
          .style(contentStyle)
          .style({ numberFormat: "yyyy-mm-dd" });
        ws.cell(i + 2, 3).comment("This is the date of birth");
        ws.cell(i + 2, 4)
          .string(item.address)
          .style(contentStyle);
        ws.cell(i + 2, 5)
          .string(item.twitter)
          .style(contentStyle);
        ws.cell(i + 2, 6)
          .string(item.email)
          .style(contentStyle);
      }

      addInvoice(ws, randomData.length + 2);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "Excel.xlsx"
      );

      wb.write("CustomName.xlsx", res);
    })

  return router;
}
