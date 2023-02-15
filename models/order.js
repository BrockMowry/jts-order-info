const Address = require("./address.js");

class Order {
    constructor(orderNumber, orderStatus, billingAddress, shippingAddress) {
        this.orderNumber = orderNumber;
        this.orderStatus = orderStatus;
        this.billingAddress = billingAddress;
        this.shippingAddress = shippingAddress;
    }

    static parse = (json) => {
        const orderNumber = `${json["InvoiceNumberPrefix"]}${json["InvoiceNumber"]}`;
        const orderStatus = `${json["OrderStatusID"]}`;

        /**
         * Get the billing address.
         */
        const billingName = `${json["BillingFirstName"]} ${json["BillingLastName"]}`;
        const billingCompany = `${json["BillingCompany"]}`;
        const billingAddress1 = `${json["BillingAddress"]}`;
        const billingAddress2 = `${json["BillingAddress2"]}`;
        const billingCity = `${json["BillingCity"]}`;
        const billingProvince = `${json["BillingState"]}`;
        const billingPostal = `${json["BillingZipCode"]}`;
        const billingAddress = new Address(billingName, billingCompany.trim() == "" ? undefined : billingCompany, billingAddress1, 
            billingAddress2.trim() == "" ? undefined : billingAddress2, billingCity, billingProvince, billingPostal);

        /**
         * Get the shipping address.
         */
        const shippingJson = json["ShipmentList"][0];
        const shippingName = `${shippingJson["ShipmentFirstName"]} ${shippingJson["ShipmentLastName"]}`;
        const shippingCompany = `${shippingJson["ShipmentCompany"]}`;
        const shippingAddress1 = `${shippingJson["ShipmentAddress"]}`;
        const shippingAddress2 = `${shippingJson["ShipmentAddress2"]}`;
        const shippingCity = `${shippingJson["ShipmentCity"]}`;
        const shippingProvince = `${shippingJson["ShipmentState"]}`;
        const shippingPostal = `${shippingJson["ShipmentZipCode"]}`;
        const shippingAddress = new Address(shippingName, shippingCompany.trim() == "" ? undefined : shippingCompany, shippingAddress1, 
            shippingAddress2.trim() == "" ? undefined : shippingAddress2, shippingCity, shippingProvince, shippingPostal);
        
        return new Order(orderNumber, orderStatus, billingAddress, shippingAddress);
    };
};

module.exports = Order;