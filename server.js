import express from "express";
import path from "path";
import {
    deleteProduct,
    getAllCategories,
    insertProduct,
    insertCategory,
    deleteCategory,
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

app.post("/product/image", upload.single("imageFile"), async (req, res) => {
    console.log(req.file);
    res.send(req.file.path);
    // onFinishAddProduct(req.file.path);

    // const ProductImage = {
    //     path: req.file.path,
    // };
    // console.log(ProductImage);
    // const Product_image = JSON.stringify(ProductImage);
    // console.log(Product_image);
    // res.send(Product_image);
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
//     const detail = await getAllProduct();
//     res.send(detail);
// });

app.post("/product", async (req, res) => {
    const productInfo = await insertProduct(
        req.body.name,
        req.body.price,
        req.body.explanation
    );
    res.send(productInfo);
});

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
