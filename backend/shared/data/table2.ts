var faker = require("faker"); // for generating random data

export var headerContentInvoice = [
  "Invoice ID",
  "Item",
  "Quantity",
  "Price",
  "Total",
  "Date",
];

// Generate random data
export var randomDataInvoice = Array.from({ length: 6 }, () => ({
  invoiceId: faker.datatype.uuid(),
  item: faker.commerce.productName(),
  quantity: faker.datatype.number({ min: 1, max: 10 }),
  price: faker.commerce.price(),
  total: function () {
    return this.quantity * this.price;
  },
  date: faker.date.recent().toLocaleDateString(),
}));
