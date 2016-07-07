Avalara
=========

A small library providing utility methods to calculate tax from Avalara Avatax

## Installation

```  npm install avalara --save  ```
***


#### Initialise Avalara

The following parameter required on the Initializing Api :-

**Account Number** : This is the account number that needs to be used to authenticate your API call (this is not an Admin Console login). It will be a ten-digit number (e.g. 1100012345)

**License Key** : This is the license key that needs to be set in the credentials portion of your connector (this is not an Admin Console Password). It will be a 16-character string (e.g. 1A2B3C4D5E6F7G8H).

```js

var Avalara = require("avalara");
var avalaraObj = new Avalara(<Account-Number>, <License-Key>, [options]);

/** options field is optional, set
options = {
     development : false,      // Defaults to true for development. Change to false if want to switch to Production.
     version    : '<version>', // Defaults to 1.0. Change if in future AVALARA release new Avatax Version
}
*/

```
---

#### Calculate Basic Tax
The Basic Tax Calculator requires a minimum of information to calculate tax. It is best used for finding tax rates or testing simple tax scenarios. Results display tax amounts, tax rates, and jurisdiction names.

```js

/* Example of Post Data*/
var body = {
     "customerCode":"FGGR4",
     "Addresses":[{
          "AddressCode": "1",
          "Line1": "100 Ravine Lane NE",
          "City": "Bainbridge Island",
          "Region": "WA",
          "PostalCode": "98110"
     },
     {
          "AddressCode": "2",
          "Line2": " 350 Fifth Avenue, 34th floor",
          "City": "New York",
          "Region": "NY",
          "PostalCode": "10118-3299"
     }],
     "Lines":[{
          "LineNo": "1",
          "DestinationCode": "2",
          "OriginCode": "1",
          "Amount": 10
     }
]
};

avalaraObj.basicTaxCalculator(body, function (err, data) {
     if(err) console.log("Avalara Error === ", err);
     console.log("Avalara Response === ", data);
});


```

The following fields appear on the Basic Tax Calculator :-
* **Customer/Vendor Code** : *Required*. The accounting, ERP, e-commerce, m-commerce, or POS application's code to uniquely identify a customer or vendor.
* **Origin Address** : *Required*.
* **Destination Address** : *Required*.
* **Item Code** : A unique identifier for the item (product, service, or charge).
* **Item Description** : A brief description of the product, service, or charge. Required for SST companies.
* **Amount** : *Required*. The extended currency price (quantity X unit price).
* **Entity Use Code** : An identifier used to group like kinds of customers for exemption purposes.
* **Discount**: The document-level discount that is to be applied.
* **Tax Code**: A unique identifier associated with items or tax rules to create custom taxing situations.
* **Date of Sale**: The date the sample transaction takes place.
---

#### Calculate Advance Tax
The Advanced Tax Calculator mimics an invoice document with multiple lines. It is best used for testing advanced tax scenarios. Results display tax amounts, tax rates, and jurisdiction names at a line item level.
* It is used if you want to record the document or want to save in the database. For this, you have to pass mandatory DocType either to "SalesOrder" or PurchaseOrder
* It hit same Api as basic tax Calculator API.

```js

/* Example of Post Data*/
var body = {
     "DocDate": "2013-01-16", // should be today's date or greater than today's Date
     "CustomerCode": "CUST1",
     "DocType" : 'SalesInvoice',
     "DocCode": "DOC0001",
     "Addresses":[{
          "AddressCode": "1",
          "Line1": "100 Ravine Lane NE",
          "City": "Bainbridge Island",
          "Region": "WA",
          "PostalCode": "98110"
     },
     {
          "AddressCode": "2",
          "Line2": " 350 Fifth Avenue, 34th floor",
          "City": "New York",
          "Region": "NY",
          "PostalCode": "10118-3299"
     }],
     "Lines":[{
          "LineNo": "1",
          "DestinationCode": "2",
          "OriginCode": "1",
          "Qty" : 1,
          "Amount": 10
     }
]
};

avalaraObj.advanceTaxCalculator(body, function (err, data) {
     if(err) console.log("Avalara Error === ", err);
     console.log("Avalara Response === ", data);
});


```

The following fields appear on the Advance Tax Calculator :-
* **Origin Address** : *Required*.
* **Destination Address** : *Required*.
* **Customer/Vendor Code** : *Required*. The code used by the accounting, ERP, e-commerce, m-commerce, or POS application to uniquely identify a customer or vendor.
* **Document Date** : *Required*. The date associated with the document. The document date is used for:
Tax calculation date
* **DocType** : It tells Avalara what kind of transaction this is. In this case, it is a document that represents a sale, and should be saved in our database.
Reporting date associated with the document
* **Discount** : The document-level discount amount to be applied.
* **Currency** : The currency type used in the document.
* **Exemption No (Number)** : The exemption certificate entry number associated with this customer.
* **Buyer's VAT No (Number)** : The VAT number of the buyer.
* **Reference Code** : A user-defined field for reference purposes only. The reference code can be used to refer to a * * corresponding document number in an accounting, ERP, e-commerce, m-commerce, or POS application.
* **Entity Use Code** : An identifier used to group like kinds of customers for exemption purposes. Select standard codes or type a custom code.
* **Purchase Order No (Number)** : The purchase order number assigned by the accounting, ERP, e-commerce, m-commerce, or POS application.
* **Salesperson Code** : The salesperson identifier assigned by the accounting, ERP, e-commerce, m-commerce, or POS application.
* **Lines** : *Required*. It is an array of all line items on the invoice (including any freight and miscellaneous charges). Each invoice line should be a line on the tax request, and should specify a line number (unique within the document), quantity, and extended amount.
---

**NOTE** : -
1. AvaTax Basic subscription includes access to Nexus Jurisdictions in the U.S. and Canada only. To access full AvaTax Pro System Tax Code functionality or Global Nexus Jurisdictions, please contact sales to inquire about a paid development account.
2. To activate your Avalara AvaTax Sales Tax API account, please login to the Admin Console at https://admin-development.avalara.net (for Development Accounts) or https://admin-avatax.avalara.net (for Production Accounts) using your user id and password

## Release History

* Initial release : 1.0.0
* Current release : 2.8.0
