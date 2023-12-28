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

// const images = [];

// const onFinishAddImage = async (value) => {
//     console.log(value);
//     images.push(value);
// };

const onFinishAddProduct = async (values) => {
    console.log(values);
    // if (values.file) {
    //     const formData = new FormData();
    //     formData.append("file", values.file[0].originFileObj);
    //     await uploadFile(formData);
    // }
    // if (images) {
    //     uploadFile(images);
    // }
    axios
        .post("/product", {
            name: values.productName,
            price: values.productPrice,
            explanation: values.productExplanation,
            // images: values.productImage,
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error("error", error);
        });
};

// const uploadFile = async (value) => {
//     try {
//         console.log(value);
//         const formData = new FormData();
//         formData.append("image-file", value);
//         axios
//             .post("/product/image", formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             })
//             .then((response) => {
//                 message.success(response.formData.message);
//             })
//             .catch((error) => {
//                 message.error(error);
//             });
//     } catch (e) {
//         console.log(e);
//     }
// };

function Admin() {
    const [categories, setCategories] = useState([]);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    // const handleUpload = async ({ file, onSuccess, onError }) => {
    //     try {
    //         const response = await uploadFile(file);
    //         console.log(file);
    //         onSuccess(response, file);
    //     } catch (error) {
    //         console.error(error);
    //         onError(error);
    //     }
    // };

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
                        // onFinish={onFinishAddImage}
                        encType="multipart/form-data"
                    >
                        <h2>상품 추가</h2>
                        <Form.Item
                            valuePropName="fileList"
                            getValueFromEvent={normFile}
                        >
                            <Upload
                                action="/product/image"
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
