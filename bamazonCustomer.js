// import node packages
const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config();

//  connect to database
const bamazonDB = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: "bamazon"
});

function productDisplay() {
  // on app load first show all the items for sale
  bamazonDB.query(
    "SELECT * FROM products", function (err, productInfo) {

      if (err) throw err;

      console.log(`
    Welcome to Bamazon!
`)

      for (let i = 0; i < productInfo.length; i++) {

        console.log(`      
  ======================================================
   ${productInfo[i].item_id}. ${productInfo[i].product_name}, $${productInfo[i].price}
  ======================================================
`)
      }

      return buyProduct();

    })

};
productDisplay();

function buyProduct() {
  bamazonDB.query("SELECT * FROM products", function (err, productInfo) {
    if (err) throw err;

    const productName = productInfo.map(product => product.product_name)

      inquirer.prompt([
        {
          name: "product_name",
          message: "Please select the item you would like to purchase",
          type: "list",
          choices: productName,
        },
        {
          name: "howMany",
          message: "How many units would you like to purchase?",
          validate: function (quantityInput) {

            if (isNaN(quantityInput)) {
              console.log(`
              ==============================
              Please input a valid quantity
              ==============================
`)
            } 
            else if (quantityInput <= 0) {
              console.log(`
              ==============================
              Please input a valid quantity
              ==============================
`)
            }
            else if (!quantityInput) {
              console.log(`
              ==============================
              Please input a valid quantity
              ==============================
`) 
            } 
            else {
              return true;
            }          
          }
        }
      ]).then(function (purchaseInfo) {
        console.log(purchaseInfo);
        // purchaseInfo => {product_name: "game title", howMany: "num"}

        // get the item the user is purchasing by using .find()
        const selectedItem = productInfo.find(product => product.product_name === purchaseInfo.product_name)

        // if quantity requested is higher than stock then do nothing
        if (purchaseInfo.howMany > selectedItem.stock_quantity) {
          console.log(`
          =====================================================
          Sorry, we're running low on stock for that item at the moment. Try a smaller order or try again later.
          =====================================================
`);
          buyProduct()
        } 
        else {

          var updatedQuantity = (selectedItem.stock_quantity - purchaseInfo.howMany)

          bamazonDB.query(`UPDATE products SET stock_quantity = ? WHERE item_id = ?`, [updatedQuantity, selectedItem.item_id]);

          totalItemPrice = (selectedItem.price * purchaseInfo.howMany).toFixed(2);

          console.log(`
          Your item has been added to the cart!
          Total Price for this selection is ${totalItemPrice}     
`)

          inquirer.prompt([
            {
              name: "keepShopping",
              message: "Would you like to keep shopping or checkout?",
              type: "list",
              choices: ["Keep Shopping", "Checkout"]
            }
          ]).then(function (continueShopping) {
            if (continueShopping.keepShopping === "Keep Shopping") {
              buyProduct();
            }
            else {
              checkout();
            }
          })
          
          
        }
      })
  })
}

function checkout() {
  console.log(`
  ========================================================================================
      Thank you for shopping Bamazon. The order is being prepared and will ship soon.
  ========================================================================================
  `)
  process.exit() 
}
