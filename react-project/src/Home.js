import React, { useEffect, useState } from "react";
import { Menu, Layout, Space, Image } from "antd";
import "./reset.css";
import "./Home.css";
import axios from "axios";

const { Header, Footer, Content } = Layout;

function Home() {
    const [categories, setCategories] = useState([]);
    // const [productsInfo, setProductsInfo] = useState([]);
    const [parsedImages, setParsedImages] = useState([]);
    const [AllProductInfoArray, setAllPrductInfoArray] = useState([]);

    // const productInfo = [
    //     "/product/image/1704000363719.png",
    //     "/product/image/1704005546456.png",
    // ];

    function fetchAllProducts() {
        axios
            .get("/product")
            .then((response) => {
                console.log(response);
                // setProductsInfo(response.data);

                const parsedImages = response.data.AllProductInfo.map(
                    (product) => {
                        const imagesArray = JSON.parse(product.image);
                        // console.log(imagesArray);
                        // console.log(imagesArray[0]);
                        return imagesArray[0];
                    }
                );
                setParsedImages(parsedImages);
                console.log(parsedImages);
                const AllProductArray = response.data.AllProductInfo;
                setAllPrductInfoArray(AllProductArray);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function fetchAllCategories() {
        // '/categories' 에 요청해서 카테고리 이름들을 받아온다. 힌트: axios
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
    console.log(categories);
    // function searchCategory() {
    //     axios
    //         .get("/product")
    //         .then((response) => {
    //             // console.log(response.data);
    //             // console.log(response.data.AllProductInfo[0].categoryId);
    //             const AllProductArray = response.data.AllProductInfo;
    //             // const category = response.data;
    //             setAllPrductInfoArray(AllProductArray);
    //             // const AllProductInfoArray = response.data.AllproductInfo;
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }

    console.log(AllProductInfoArray);
    // for (let element of AllProductInfoArray) {
    //     console.log(element.categoryId);
    //     // const categoryNumber = element.categoryId
    // }

    useEffect(() => {
        fetchAllCategories();
        fetchAllProducts();
    }, []);

    const HomeComponent = (
        <Space
            direction="vertical"
            style={{
                width: "100%",
            }}
            size={[0, 48]}
        >
            <Layout>
                <Header className="headerStyle">
                    <div>
                        <h1>반값LED</h1>
                    </div>
                </Header>
                <nav className="navStyle">
                    <div className="demo-logo" />
                    <Menu
                        theme="white"
                        mode="horizontal"
                        defaultSelectedKeys={["0"]} //내비메뉴 초기 디폴트값
                        items={categories.map((categoryName, index) => {
                            return {
                                label: categoryName,
                                key: index + 1,
                                onClick: () => {
                                    console.log(`${categoryName} 클릭`);
                                    const categoryElement =
                                        document.querySelector(
                                            `.${categoryName}`
                                        );
                                    console.log(
                                        "categoryElement:",
                                        categoryElement
                                    );
                                    if (categoryElement) {
                                        categoryElement.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }
                                },
                            };
                        })}
                        // items={categories.map((label, index) => {
                        //     return {
                        //         label: label,
                        //         key: index + 1,
                        //         onClick: () => {
                        //             if (label === "거실 조명") {
                        //                 document
                        //                     .querySelector(".livingRoom")
                        //                     .scrollIntoView({
                        //                         behavior: "smooth",
                        //                     });
                        //             } else if (label === "방 조명") {
                        //                 document
                        //                     .querySelector(".generalRoom")
                        //                     .scrollIntoView({
                        //                         behavior: "smooth",
                        //                     });
                        //             } else if (label === "식탁 · 포인트") {
                        //                 document
                        //                     .querySelector(".tablePoint")
                        //                     .scrollIntoView({
                        //                         behavior: "smooth",
                        //                     });
                        //             } else if (label === "주방 · 욕실 · 레일") {
                        //                 document
                        //                     .querySelector(".kitchenBathRail")
                        //                     .scrollIntoView({
                        //                         behavior: "smooth",
                        //                     });
                        //             } else if (label === "현관 · 베란다") {
                        //                 document
                        //                     .querySelector(".entranceVeranda")
                        //                     .scrollIntoView({
                        //                         behavior: "smooth",
                        //                     });
                        //             } else if (label === "매입") {
                        //                 document
                        //                     .querySelector(".landfill")
                        //                     .scrollIntoView({
                        //                         behavior: "smooth",
                        //                     });
                        //             } else if (label === "산업 조명") {
                        //                 document
                        //                     .querySelector(".industrial")
                        //                     .scrollIntoView({
                        //                         behavior: "smooth",
                        //                     });
                        //             }
                        //         },
                        //     };
                        // })}
                    />
                </nav>
                <Content className="contentStyle">
                    <div>
                        <div>
                            {parsedImages.map((src, index) => (
                                <Image
                                    key={index}
                                    width={200}
                                    src={src}
                                    alt={`이미지 ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                    {AllProductInfoArray.map((category, index) => (
                        <div key={index} className={category.categoryName}>
                            <h2>{category.categoryName}</h2>
                            <div className="categoryImg">
                                {JSON.parse(category.image).map(
                                    (src, imgIndex) => (
                                        <div key={imgIndex}>
                                            <Image
                                                width={200}
                                                src={src}
                                                alt={`이미지 ${imgIndex + 1}`}
                                            />
                                            <span>{category.name}</span>
                                            <span>{category.price}</span>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    ))}

                    {/* {categories.map((categoryName, index) => (
                        <div key={index} className={categoryName}>
                            <h2>{categoryName}</h2>
                            <div className="categoryImg">
                                {parsedImages.map((src, imgIndex) => (
                                    <Image
                                        key={imgIndex}
                                        width={200}
                                        src={src}
                                        alt={`이미지 ${imgIndex + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))} */}

                    {/* for loop (category_id, category_name, allproduct)
                    <div>
                        <h2>category_name</h2>
                        <div>
                            p = api call (product/category_id) for loop (p) if
                            (product)
                        </div>
                    </div> */}
                </Content>
                <Footer className="footerStyle">
                    <div>전화번호 : 010 - 1111 - 2222</div>
                    <div>사업장위치 : 경기도 용인시 처인구 이동읍</div>
                </Footer>
            </Layout>
        </Space>
    );
    return HomeComponent;
}

export default Home;
