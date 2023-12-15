import { Router } from "express";
import fs from 'fs';

import { wb } from "../shared/excel/workbook";
import { headerContent, randomData } from "../shared/data/table1";
import { headerContentInvoice, randomDataInvoice } from "../shared/data/table2";
import { contentStyle, headerStyle, infoStyle } from "../shared/excel/styles";
import { transporter, mailOptions } from "../shared/nodemailer/connection";


function addUserData(ws: any, startRow: number) {
  try {
    // Add title row
    ws.cell(startRow, 1, startRow, 6, true)
      .string("A user list")
      .style({ alignment: { horizontal: "center" } });

    // Add headers
    startRow++;
    headerContent.forEach((header, index) => {
      ws.cell(startRow, index + 1)
        .string(header)
        .style(headerStyle);
    });

    // Add user data
    startRow++;
    randomData.forEach((item, i) => {
      ws.cell(startRow + i, 1).string(item.name);
      ws.cell(startRow + i, 2).number(item.age);
      ws.cell(startRow + i, 3).date(new Date(item.dob));
      ws.cell(startRow + i, 3).comment("This is the date of birth");
      ws.cell(startRow + i, 4).string(item.address);
      ws.cell(startRow + i, 5).string(item.twitter);
      ws.cell(startRow + i, 6).string(item.email);
    });
  } catch (e) {
    console.log(e);
  }
}

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

  router.get("/file", (req, res, next) => {
    const userEmail = req.query.email?.toString() || '';

    var ws = wb.addWorksheet("Sheet 1");

    addUserData(ws, 1);
    addInvoice(ws, randomData.length + 2);
    wb.write("CustomName.xlsx", function(err: any) {
      if (err) {
        console.error(err);
      } else {
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions(userEmail), (error, info) => {
          if (error) {
            res.status(400).json({ message: 'Mail not send' });
          }
          console.log('Message sent: %s', info.messageId);
          res.status(200).json({ message: 'Mail send' });
          
          // delete the file after sending
          fs.unlinkSync(__dirname + '/CustomName.xlsx');
        });
      }
    });
  });

  return router;
}
