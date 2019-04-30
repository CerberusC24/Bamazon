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