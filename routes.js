require("dotenv").config();
const { default: axios } = require("axios");
const Order = require("./models/order.js");

const { REQUEST_URL, SECURE_URL, PRIVATE_KEY, TOKEN } = process.env;

module.exports = (app) => {
    app.get("/", (req, res) => {
        res.render("index", { title: "JT's Order Info" });
    });

    app.get("/order/:orderID", (req, res) => {
        const param = req.params.orderID;
        const orderPrefix = param.charAt(0);
        const orderNumber = param.substring(1);

        axios.get(
            `${REQUEST_URL}?invoicenumber=${orderNumber}&invoiceprefix=${orderPrefix}`,
            {
                headers: {
                    "Content-Type": "application/xml",
                    "Accept": "application/json",
                    "SecureURL": SECURE_URL,
                    "PrivateKey": PRIVATE_KEY,
                    "Token": TOKEN
                }
            }
        ).then(response => {
            const data = response.data[0];
            const order = Order.parse(data);
            res.render("order", { title: `JT's Order Info | ${order.orderNumber}`, order: order });
        }).catch(exception => {
            res.render("404", { title: "JT's Order Info | 404" });
            console.log(exception);
        });
    })

    app.get("*", (req, res) => {
        res.render("404", { title: "JT's Order Info | 404" });
    });
};