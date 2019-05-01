# Bamazon
Week 6 / Unit 12 HW - Node.js &amp; MySQL


<h1>A simple command line app to simulate purchasing items from a database and to manage items and inventory in a database</h1>

<h3>Languages Used:</h3>
<ul>
  <li>Javascript</li>

<h3>Technologies Used:</h3>
<ul>
  <li>Node.js</li>
  <li>Dotenv</li>
  <li>mySQL</li>
  <li>Inquirer</li>
</ul>

<h3>Instructions: bamazonCustomer.js</h3>

=================================================
<ul>
  <li>Run the app from the command line and you will be given a display of the items for sale as well as a prompt to choose from the selection</li>
  ex. https://raw.githubusercontent.com/CerberusC24/Bamazon/master/assets/customerImages/runApp.png
  
  <li>After choosing an option the user will be prompted to input a quantity. If the user inputs a an invalid quantity they will be prompted to try again</li>
  ex. https://raw.githubusercontent.com/CerberusC24/Bamazon/master/assets/customerImages/wrongQuantity.png
  
  <li>After the user inputs a valid quantity, they will be given the total for the specific item, and then prompted to whether they want to continue shopping or checkout</li>
  ex. https://raw.githubusercontent.com/CerberusC24/Bamazon/master/assets/customerImages/validQuantity.png
  
  <li>If the user selects to keep shopping it will bring up the prompt to select an item again</li>
  ex. https://raw.githubusercontent.com/CerberusC24/Bamazon/master/assets/customerImages/keepShopping.png
  
  <li>If the user selects to checkout, they will be given a short message and exit the app</li>
  ex. https://raw.githubusercontent.com/CerberusC24/Bamazon/master/assets/customerImages/checkout.png
  
</ul>
=================================================

<h3>Instructions: bamazonManager.js</h3>

=================================================
<ul>
  <li>Run the app from the command line and you will be given a menu with options</li>
  ex. https://raw.githubusercontent.com/CerberusC24/Bamazon/master/assets/managerImages/runApp.png
  
  <li>When the "View Product List" option is chosen you will be given a list of all the items for sale in the database and an option to add a new product to the list or exit the menu</li>
  ex. https://raw.githubusercontent.com/CerberusC24/Bamazon/master/assets/managerImages/productDisplay.png
  
  <li>If the "Add New Product" option is chosen the user will be prompted to provide the information needed to add to the database and be given a confirmation when done. The user is then asked if they want to add another item or not.</li>
  ex. https://raw.githubusercontent.com/CerberusC24/Bamazon/master/assets/managerImages/addProduct.png
  
  <li>If the user selects to check low inventory from the main portal menu they will be given a list of the items in the database with a stock quantity less than 50. The user will also be prompted to add inventory to a product from the list. If the user selects yes they will be asked for the specific item they want to update, and for the quantity they want to add. The list will then update, the user will be given a confirmation when done, and then asked if they want to update any other items</li>
  ex. https://raw.githubusercontent.com/CerberusC24/Bamazon/master/assets/managerImages/lowInventory.png
  
  <li>If the user selects to exit the portal from the main menu they will be exited from the application</li>
  ex. https://raw.githubusercontent.com/CerberusC24/Bamazon/master/assets/managerImages/exitApp.png
  
</ul>
=================================================

