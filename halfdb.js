import sqlite3 from "sqlite3";

let db = new sqlite3.Database("./db/halfpriceLED.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Connected to the mydb database.");
    }
});

const selectCategoryQuery = `
  SELECT Categorie_name FROM Categorie
`;

const insertCategoryQuery = `
  INSERT INTO Categorie (Categorie_name)
            VALUES (?)
`;
const returnCategoryIdQuery = `
    SELECT Categorie_id FROM Categorie WHERE Categorie_name = ?
`;

const deleteCategoryQuery = `
    DELETE FROM Categorie WHERE Categorie_id = ?`;

const selectProductQuery = `
  SELECT * FROM Product
`;
const insertProductQuery = `
INSERT INTO Product (Product_name, Product_price, Product_explanation, Product_image) VALUES (?, ?, ?, ?)`;
// const insertProductQuery = `
// INSERT INTO Product (Product_name, Product_price, Product_explanation) VALUES (?, ?, ?)`;

const linkCategoryProductQuery =
    "INSERT INTO CategorieProduct (Categorie_id, Product_id) VALUES (?, ?)";

const deleteProductQuery = `
DELETE FROM Product WHERE id = ?`;

// const insertImageQuery = `INSERT INTO Product (Product_image) VALUES (?)`;

async function getAllCategories() {
    return new Promise((resolve, reject) => {
        db.all(selectCategoryQuery, [], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                let categories = rows.map((row) => row["Categorie_name"]);
                resolve(categories);
            }
        });
    });
}
async function getAllProduct() {
    return new Promise((resolve, reject) => {
        db.all(selectProductQuery, [], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                let products = rows.map((row) => {
                    return {
                        id: row["Product_id"],
                        name: row["Product_name"],
                        price: row["Product_price"],
                        explanation: row["Product_explanation"],
                        image: row["Product_Image"],
                    };
                });
                console.log(products);
                resolve(products);
            }
        });
    });
}
async function insertCategory(categoryName) {
    return new Promise((resolve, reject) => {
        db.run(insertCategoryQuery, [categoryName], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastId);
            }
        });
    });
}

async function deleteCategory(id) {
    return new Promise((resolve, reject) => {
        db.run(deleteCategoryQuery, id, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
}

async function insertProduct(
    productName,
    productPrice,
    productExplanation,
    productImage
) {
    return new Promise((resolve, reject) => {
        db.run(
            insertProductQuery,
            [productName, productPrice, productExplanation, productImage],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
}

async function returnCategoryId(category) {
    return new Promise((resolve, reject) => {
        db.get(returnCategoryIdQuery, [category], function (err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(row["Categorie_id"]);
            }
        });
    });
}

async function insertProductCategory(categoryId, productId) {
    console.log(categoryId);
    return new Promise((resolve, reject) => {
        db.run(
            linkCategoryProductQuery,
            [categoryId, productId],
            function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.lastID);
                }
            }
        );
    });
}

async function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        db.run(deleteProductQuery, id, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
}

function close() {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Close the database connection.");
        }
    });
}

export {
    getAllCategories,
    insertCategory,
    returnCategoryId,
    deleteCategory,
    getAllProduct,
    insertProduct,
    insertProductCategory,
    deleteProduct,
    close,
};
