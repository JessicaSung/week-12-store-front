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
        // console.log(res);

        // display products and price to user
        for (var i = 0; i < res.length; i++) {
            console.log('Item: ' + res[i].ProductName + ' | Price: ' + res[i].Price + ' | Stock: ' + res[i].StockQuantity);
        }
        

        // ask user questions for purchase 
        inquirer.prompt([{
            // ask user to choose a product to purchase
            name: "choice",
            type: "rawlist",
            message: "What would you like to buy?",
            choices: function(value) {
                var choiceArray = [];
                for (var i = 0; i < res.length; i++) {
                    choiceArray.push(res[i].ProductName);
                }
                return choiceArray;
            }
        }, {
            // ask user to enter a quantity to purchase
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?",
            validate: function(value) {
                if (isNaN(value) == false) {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function(answer) {
            // grabs the entire object for the product the user chose
            for (var i = 0; i < res.length; i++) {
                if (res[i].ProductName == answer.choice) {
                    var chosenItem = res[i];
                }
            }
            // shows the entire object of the product chosen
            // console.log(chosenItem);
                             
            // calculate remaining stock if purchase occurs
            var updateStock = parseInt(chosenItem.StockQuantity) - parseInt(answer.quantity);

            // if customer wants to purchase more than available in stock, user will be asked if he wants to make another purchase
            if (chosenItem.StockQuantity < parseInt(answer.quantity)) {
                console.log("Insufficient quantity!");

                again();
            }
            // if the customer wants to purchase an amount that is in stock, the remaining stock quantity will be updated in the database and the price presented to the customer
            else {
                connection.query("UPDATE Products SET ? WHERE ?", [{StockQuantity: updateStock}, {ItemId: chosenItem.ItemId}], function(err, res) {
                    console.log("Purchase successful!");

                    var Total = (parseInt(answer.quantity)*chosenItem.Price).toFixed(2);
                    console.log("Your total is $" + Total);

                    again();
                });
            }

        }); // .then of inquirer prompt
                         
    }); // first connection.query of the database
    
} // buyProduct function




function again() {
    inquirer.prompt({
        // ask user if he wants to purchase another item
        name: "repurchase",
        type: "list",
        choices: ["Yes", "No"],
        message: "Would you like to purchase another item?"
    }).then(function(answer) {
        if (answer.repurchase == "Yes") {
            buyProduct();
        }
        else {
            console.log("Thanks for shopping for us. Have a great day!")
        }
    });
}