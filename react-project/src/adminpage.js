import React, { useState, useEffect } from "react";
// import { insertCategory, deleteCategory } from "../../halfdb.js";
import { PlusOutlined } from "@ant-design/icons";
import {
    Layout,
    Select,
    Button,
    Form,
    Input,
    InputNumber,
    Upload,
    // message,
} from "antd";
import "./reset.css";
import "./adminpage.css";
import axios from "axios";

const { Header, Content } = Layout;
const { TextArea } = Input;

const normFile = (e) => {
    console.log("hello");
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

// [TODO]
const onFinishDeleteCategory = (values) => {
    console.log(values);
    axios
        .post("/categories/delete", {
            id: values.deleteCategory,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error("error", error);
        });
};
const onFinishAddCategory = (values) => {
    axios
        .post("/categories", {
            name: values.addCategory,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error("error", error);
        });
};

let images = [];

const onChangeAddImage = async (value) => {
    images = value.fileList;
};

const onFinishAddProduct = async (values) => {
    console.log(values);
    let imagesUrls = [];
    // 1. Upload image (save images to server)
    // Using Axios to call '/product/image'
    // image upload

    // 2. Pass paths (urls) of images to imageUrls array
    // const imageUrls = []; //한번에 올린 코드의 path로 이루어진 배열로 만들자.

    const formData = new FormData();
    images.forEach((image) => {
        formData.append("images", image.originFileObj);
    });

    try {
        const response = await axios.post("/product/image", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        imagesUrls = response.data;
    } catch (error) {
        console.error("error", error);
        return;
    }

    axios
        .post("/product", {
            name: values.productName,
            price: values.productPrice,
            explanation: values.productExplanation,
            images: JSON.stringify(imagesUrls),
            category: values.category,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error("error", error);
        });
};

function Admin() {
    const [categories, setCategories] = useState([]);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    function fetchAllCategories() {
        axios
            .get("/categories")
            .then((response) => {
                const category = response.data;
                setCategories(category);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        fetchAllCategories();
    }, []);

    const AdminComponent = (
        <>
            <Layout className="layout">
                <Header className="headerStyle">
                    <h1>관리자 페이지</h1>
                </Header>
                <Content className="content">
                    <Form
                        className="currentMenu"
                        onFinish={onFinishDeleteCategory}
                    >
                        <h2>현재 메뉴 목록</h2>
                        <Form.Item name="deleteCategory">
                            <Select
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                                options={categories.map((label, index) => {
                                    return {
                                        label: label,
                                        value: index + 1,
                                    };
                                })}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">삭제</Button>
                        </Form.Item>
                    </Form>
                    <Form
                        className="addCategory"
                        onFinish={onFinishAddCategory}
                    >
                        <h2>메뉴 추가</h2>
                        <Form.Item
                            id="addCategoryInput"
                            className="inputSize"
                            name="addCategory"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit">추가</Button>
                        </Form.Item>
                    </Form>
                    <Form
                        className="addProductImage"
                        encType="multipart/form-data"
                    >
                        <h2>상품 추가</h2>
                        <Form.Item
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                onChange={onChangeAddImage}
                                action={(file) => {
                                    console.log(file);
                                }}
                                listType="picture-card"
                                name="imageFile"
                            >
                                <div>
                                    <PlusOutlined />
                                    <div
                                        style={{
                                            marginTop: 8,
                                        }}
                                    >
                                        업로드
                                    </div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Form>
                    <Form className="addProduct" onFinish={onFinishAddProduct}>
                        <Form.Item label="카테고리" name="category">
                            <Select
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                                options={categories.map((label) => {
                                    return {
                                        label: label,
                                        value: label,
                                    };
                                })}
                            />
                        </Form.Item>
                        <Form.Item
                            label="상품명"
                            name="productName"
                            className="inputSize"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item label="상품 가격" name="productPrice">
                            <InputNumber />
                        </Form.Item>
                        <h2>상세정보 & 설명</h2>
                        <Form.Item
                            className="inputSize"
                            name="productExplanation"
                        >
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item
                            name="submitBox"
                            rules={[
                                {
                                    message:
                                        "상세한 정보와 설명을 추가해주세요!",
                                },
                            ]}
                        >
                            <Button htmlType="submit">추가</Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>
        </>
    );
    return AdminComponent;
}

export default Admin;
