import express from "express";
import path from "path";
import {
    deleteProduct,
    getAllCategories,
    getAllProduct,
    insertProduct,
    insertCategory,
    returnCategoryId,
    deleteCategory,
    insertProductCategory,
    temporaryIntegrationTable,
} from "./halfdb.js";
// import Busboy from "busboy";
import multer from "multer";

const app = express();
const port = 3000;
const __dirname = path.resolve();

const storage = multer.diskStorage({
    destination: function (req, file, done) {
        done(null, path.join(__dirname, "uploads/"));
    },
    filename: function (req, file, done) {
        done(null, new Date().valueOf() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, "react-project/build")));
app.use(express.json());
app.use("/product/image", express.static(path.join(__dirname, "uploads/")));

app.post("/product/image", upload.array("images"), async (req, res) => {
    const files = req.files;
    let paths = files.map((file) => `/product/image/${file.filename}`);
    res.send(paths);
});

app.get("/categories", async (req, res) => {
    const categories = await getAllCategories();
    res.send(categories);
});

// 1. Post 로 받기
// 2. DB 에 가져온 데이터와 함꼐 Insert
// 3. success 응답 주기
app.post("/categories", async (req, res) => {
    const categories = await insertCategory(req.body.name);
    res.send(categories);
});

app.post("/categories/delete", async (req, res) => {
    const categories = await deleteCategory(req.body.id);
    console.log(categories);
    res.sendStatus(200);
});

// app.get("/product", async (req, res) => {
//     const product = await getAllProduct();
//     // const categoryRowId = await returnCategoryId(req.body.category);
//     res.send(product);
//     const AllProductInfo = await temporaryIntegrationTable();
//     // res.send(categoryRowId);
//     res.send(AllProductInfo);
// });

app.get("/product", async (req, res) => {
    try {
        const product = await getAllProduct();
        const AllProductInfo = await temporaryIntegrationTable();
        res.send({ product, AllProductInfo });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/product", async (req, res) => {
    console.log(req.body);
    const productRowId = await insertProduct(
        req.body.name,
        req.body.price,
        req.body.explanation,
        req.body.images
    );
    const categoryRowId = await returnCategoryId(req.body.category);
    await insertProductCategory(categoryRowId, productRowId);
    await temporaryIntegrationTable();
    res.sendStatus(200);
});

// categoryId 로 product 를 받아온다.
// app.get("/product/:categoryId", async (req, res) => {
//     try {
//         const categoryId = req.params.categoryId;
//         console.log(categoryId);
//         res.send(categoryId);
//     } catch (error) {
//         res.status(500);
//     }
// });

app.post("/product/delete", async (req, res) => {
    const productInfo = await deleteProduct(req.body.id);
    console.log(productInfo);
    res.sendStatus(200);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "react-project/build/index.html"));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
