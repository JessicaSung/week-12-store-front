// Step 1 - npm install mysql and either Prompt or Inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
var prompt = require('prompt');
var filesystem = require('fs');
var sqlPassword = require('./password.js');

// Step 5 - create database in MySQL workbench and then create the connection here
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", 
    password: sqlPassword, 
    database: "Bamazon"
});

// Step 6 - start the connection to the database
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

// Step 7 - call the first function to start it
buyProduct();

// Step 8 - displays products in database table, and then ask user which product he wants to purchase - write hoisted functions so they can be defined later in the file
function buyProduct() {
    connection.query('SELECT * FROM Products', function(err, res){
        console.log(res);
        inquirer.prompt({
            // ask user to choose ItemId of what he wants to buy
            name: "choice",
            type: "rawlist",
            message: "What would you like to bid on?",
            choices: function(value) {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].ProductName);
                }
                return choiceArray;
            }
        }).then(function(answer) {
            for (var i = 0; i < res.length; i++) {
                if (res[i].ProductName == answer.choice) {
                    var chosenItem = res[i];
                    inquire.prompt({
                        name: "quantity",
                        type: "input",
                        message: "How many would you like to bid on?",
                        validate: function(value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then(function(answer) {
                        var updateStock = parseInt(chosenItem.StockQuantity) - parseInt(answer.quantity);
                        if (chosenItem.StockQuantity >= parseInt(answer.quantity)) {
                            connection.query("UPDATE Products SET ? WHERE ?", [{StockQuantity: updateStock}, {ItemId: chosenItem.ItemId}], function(err, res) {
                                console.log("Bid placed successfully!");
                            });
                        }
                        else {
                            console.log("Insufficient quantity!");
                        }
                        console.log(res);
                    }); // line 55
                } // line 42
            } // line 41
        }); // line 40
    }); // line 26
} // line 25




// I'm going to try removing the for loop in the promise to see if the code will stop throwing an error







































