// import node packages
const inquirer = require('inquirer');
const mysql = require('mysql');
require('dotenv').config();

//  connect to database
const bamazon = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: "bamazon"
});

// create function to bring up a menu when the app is run

function managerPortal() {

  console.log(`
  ==========================================
    Welcome to the Bamazon Manager Portal
  ==========================================
`);

  inquirer.prompt([
  {
    name: "takeAction",
    message: "What would you like to do?",
    type: "list",
    choices: ["View Product List", "Add New Product", "Check Low Inventory", "Exit Portal"]
  }
])
.then(function (actionInfo) {
  if (actionInfo.takeAction === "View Product List") {
    productList();
  } else if (actionInfo.takeAction === "Add New Product") {
    addProduct();
  } else if (actionInfo.takeAction === "Check Low Inventory") {
    lowInventory();
  } else if (actionInfo.takeAction === "Exit Portal") {
    process.exit();
  }
});
};
managerPortal();

// create function to display list of current products in the database and ask user to make an action

function productList() {
  console.log(`
  ========================
    Product Display Menu
  ========================
`)

  bamazon.query(`SELECT * FROM products`, function (err, productInfo) {
    
    if (err) throw err;

    for (let i = 0; i < productInfo.length; i++) {
      console.log(`      
  ================================================================================================
    ${productInfo[i].item_id}. | ${productInfo[i].product_name} | Price: $${productInfo[i].price} | Department: ${productInfo[i].department_name}
  ================================================================================================
`);
    }
  })

  inquirer.prompt([
  {
    name: "addAction",
    message: "What would you like to do?",
    type: "list",
    choices: ["Add New Product", "Exit Menu"]
  }
])
.then(function (actionInfo) {
    if (actionInfo.addAction === "Add New Product") {
      addProduct();
    } 
    else if (actionInfo.addAction === "Exit Menu") {
      managerPortal();
    }
  })
};

function addProduct() {
console.log(`
========================
  Add New Product Menu
========================
`);

inquirer.prompt([
  {
    name: "productName",
    message: "Please provide product name",
    type: "input",
    validate: function (nameInput) {
      if (!nameInput) {
        console.log(`
       =======================================
         Please provide a valid product name
       =======================================
`)
      } 
      else {
        return true;
      }
    }
  },
  {
    name: "productPrice",
    message: "What is the MSRP price for this item?",
    type: "input",
    validate: function (priceInput) {

      if (!priceInput) {
        console.log(`
        ===============================
         Please provide a valid price
        ===============================
`)
      } else if (priceInput <= 0) {
        console.log(`
        ===============================
         Please provide a valid price
        ===============================
`)
      } else if (!isNaN(priceInput)) {
        return true;
      } 
      else {
        console.log(`
        ===============================
         Please provide a valid price
        ===============================
`)
      }
    }
  },
  {
    name: "productDept",
    message: "What department does this item belong to?",
    type: "input",
    validate: function (deptInput) {

      if (deptInput.productDept === "") {
        console.log(`
        ===================================
         Please provide a valid department
        ===================================
`)
      } 
      else {
        return true;
      }
    }
  },
  {
    name: "productStock",
    message: "Enter Initial Stock Quantity",
    type: "input",
    validate: function (stockInput) {

      if (!stockInput) {
        console.log(`
        =================================
         Please provide a valid quantity
        =================================
`)
      } else if (stockInput <= 0) {
        console.log(`
        =================================
         Please provide a valid quantity
        =================================
`)
      } else if (!isNaN(stockInput)) {
        return true;
        
      } 
      else {
        console.log(`
        =================================
         Please provide a valid quantity
        =================================
`);
      }
    }
  }
])
.then(function(stockInfo) {
  bamazon.query(`
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("${stockInfo.productName}", "${stockInfo.productDept}", "${stockInfo.productPrice}", "${stockInfo.productStock}")
`)
  console.log(`
    ==========================================================
    ${stockInfo.productName} has been added to inventory
    Current Stock: ${stockInfo.productStock}
    ==========================================================
`)

  inquirer.prompt([
    {
      name: "more",
      message: "Do you want to add another item?",
      type: "list",
      choices: ["Yes", "No"]
    }
  ])
  .then(function(moreInfo) {
    if (moreInfo.more === "Yes") {
      addProduct();
    }
    else if (moreInfo.more === "No") {
      console.log(`
      ====================================
        Exiting the Add New Product menu
      ====================================
`)
      managerPortal(); 
    }
  })
})
}

// create function to check database for any product with a stock_quantity less than 50

function lowInventory() {
  console.log(`
  ======================
    Low Inventory Menu
  ======================
`);

  bamazon.query(`
  SELECT * FROM products WHERE stock_quantity < 50`, function (err, inventoryInfo) {
    if (err) throw err;

    else {
      for (let i = 0; i < inventoryInfo.length; i++) {
        console.log(`      
  =============================================================
    ${inventoryInfo[i].item_id}. | ${inventoryInfo[i].product_name} | Quantity: ${inventoryInfo[i].stock_quantity}
  =============================================================
`)
      }

      inquirer.prompt([
        {
          name: "addInventory",
          message: "Would you like to update inventory?",
          type: "list",
          choices: ["Yes", "No"]
        }
      ])
      .then(function (inventoryInfo) {

        if (inventoryInfo.addInventory === "No") {
          console.log(`
        ==================================
          Exiting the low inventory menu
        ==================================
`)
          managerPortal();
        }
        else if (inventoryInfo.addInventory === "Yes") {
          updateInventory();
        }
      })
    }
  })
}

// create function to update inventory for already existing products

function updateInventory() {
  console.log(`
  =========================
    Inventory Update Menu
  =========================  
`);

  bamazon.query(`
  SELECT * FROM products WHERE stock_quantity < 50`, function(err, productInfo) {
    if (err) throw err;

    const productName = productInfo.map(product => product.product_name);

    inquirer.prompt([
      {
        name: "whatProduct",
        message: "What item needs updating?",
        type: "list",
        choices: productName
      },
      {
        name: "howMuch",
        message: "How much inventory are you adding",
        type: "input",
        validate: function (quantityInput) {

          if (!isNaN(quantityInput)) {
            return true;
            
          } else if (quantityInput <= 0) {
            console.log(`
          ==============================
          Please input a valid quantity
          ==============================
`)
          } else if (!quantityInput) {
            console.log(`
          ==============================
          Please input a valid quantity
          ==============================
`)
          }
        }
      }
    ])
    .then(function (inputInfo) {

      const selectedItem = productInfo.find(function(product) {
        return inputInfo.whatProduct
      });

      var updatedQuantity = parseInt(inputInfo.howMuch) + productInfo[0].stock_quantity;

      bamazon.query(`
      UPDATE products SET stock_quantity = ? WHERE item_id = ?`, [updatedQuantity, selectedItem.item_id])
  
      console.log(`
      ===============================================
      Selected Item: ${selectedItem.product_name}
      Updated Stock: ${inputInfo.howMuch} Units
      New Total: ${updatedQuantity} Units
      ===============================================
  `)             
       lowInventory();    
    })
  })
};