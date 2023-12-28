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

const deleteCategoryQuery = `
    DELETE FROM Categorie WHERE Categorie_id = ?`;

const selectProductQuery = `
  SELECT * FROM Product
`;
const insertProductQuery = `
INSERT INTO Product (Product_name, Product_price, Product_explanation, Product_image) VALUES (?, ?, ?, ?)`;
// const insertProductQuery = `
// INSERT INTO Product (Product_name, Product_price, Product_explanation) VALUES (?, ?, ?)`;

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
                let product = rows.map((row) => row["product_name"]);
                resolve(product);
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
    productCategory,
    productExplanation,
    productImage
) {
    return new Promise((resolve, reject) => {
        db.run(
            insertProductQuery,
            [productName, productCategory, productExplanation, productImage],
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

// async function insertImage(Product_image) {
//     return new Promise((resolve, reject) => {
//         db.run(insertImageQuery, [Product_image], (err) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(this.lastID);
//             }
//         });
//     });
// }

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
    deleteCategory,
    getAllProduct,
    insertProduct,
    deleteProduct,
    close,
};
