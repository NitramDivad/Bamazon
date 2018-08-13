var mysql = require("mysql"),
    inquirer = require("inquirer"),
    consoleTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "1234",
    database: "bamazon"
});


connection.connect(function(err) {

    if (err)
        throw err;
    else
        menuOptions();
});


function displayProducts(whichGroup) {

    if (whichGroup === 'all')
        var sql = "SELECT item_id AS 'Product Item', product_name AS 'Product Name', LPAD(CONCAT('$',price), 13, ' ') AS 'Product Price', stock_quantity as 'Quantity' FROM products";

    if (whichGroup === 'low')
        var sql = "SELECT item_id AS 'Product Item', product_name AS 'Product Name', LPAD(CONCAT('$',price), 13, ' ') AS 'Product Price', stock_quantity as 'Quantity' FROM products WHERE stock_quantity < 5";

	connection.query(sql, function(err, results) {
        if (err)
            throw err;
		else {
            console.log("\n\n*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*\n");
            console.table(results);
            menuOptions();
		};
    });
};


function menuOptions() {

    inquirer.prompt([
		{
			name: "choice",
			type: "list",
            choices: ["View Products for Sale",
                      "View Low Inventory",
                      "Add to Inventory",
                      "Add New Product",
                      "Quit"],
			message: "What would you like to do?"
		}
	])
	.then(function(answer) {
        if (answer.choice === 'View Products for Sale')
            displayProducts('all');

        if (answer.choice === 'View Low Inventory')
            displayProducts('low');

        if (answer.choice === 'Add to Inventory')
            addToInventory();

        if (answer.choice === 'Add New Product')
            addNewProduct();

        if (answer.choice === 'Quit')
            quitProgram();
	});
};


function quitProgram() {

    console.log("\n\nExiting Program");
    connection.end();
};


function addToInventory() {

    connection.query("SELECT item_id, product_name, stock_quantity FROM products",
        function(err, results) {
        
        if (err) 
          throw err;
		else {
            inquirer.prompt([
                {
                    name: "choice",
                    type: "list",
                    choices: function() {
                        var arrChoices = [];
                        for (var i = 0; i < results.length; i++) {
                            arrChoices.push(results[i].product_name);
                        }
                        return arrChoices;
                    },
                    message: "Add more of which item?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many should be added?"
                }
            ])
            .then(function(answer) {
                var whichItem;

                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        whichItem = results[i];
                    }
                }

                var newQuantity = parseInt(whichItem.stock_quantity) + parseInt(answer.quantity);
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [{ stock_quantity: newQuantity },
                     { item_id: whichItem.item_id }
                    ],
                    function(error) {
                        if (error) throw err;
                        console.log("\nYou have added " + answer.quantity + " units. There are now " + newQuantity + " in stock.\n");
                        menuOptions();
                });
            });
        };
	});
};


function addNewProduct() {

    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "What is the Product Name for this item?"
        },
        {
            name: "department_name",
            type: "input",
            message: "Which Department to assign this item?"
        },
        {
            name: "price",
            type: "input",
            message: "What is the Sales Price for this item (decimal format: ##.##)?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "How many should be added?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    .then(function(answer) {
        connection.query(
            "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('" + answer.product_name + "', '" + answer.department_name + "', '" + answer.price + "', '" + answer.stock_quantity + "')",
            function(err, result) {

                if (err)
                    throw err;
                else {
                    console.log("\nYou have added " + answer.stock_quantity + " units for " + answer.product_name + ".\n");
                    menuOptions();
                }    
        });
    });
};