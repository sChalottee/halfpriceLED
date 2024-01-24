import React, { useEffect, useState } from "react";
import { Menu, Layout, Space, Image, Carousel } from "antd";
import "./reset.css";
import "./Home.css";
import axios from "axios";

const { Header, Footer, Content } = Layout;

function Home() {
    const [categories, setCategories] = useState([]);
    // const [productsInfo, setProductsInfo] = useState([]);
    const [parsedImages, setParsedImages] = useState([]);
    const [AllProductInfoArray, setAllPrductInfoArray] = useState([]);

    function fetchAllProducts() {
        axios
            .get("/product")
            .then((response) => {
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
                                    let categoryElement =
                                        document.querySelector(
                                            `.${categoryName}`
                                        );
                                    console.log(categoryElement);
                                    if (categoryElement) {
                                        categoryElement.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }
                                },
                            };
                        })}
                    />
                </nav>
                <Content className="contentStyle">
                    <Carousel autoplay autoplaySpeed={2000}>
                        {parsedImages.map((src, index) => (
                            <div key={index}>
                                <Image
                                    // key={index}
                                    width={600}
                                    height={450}
                                    src={src}
                                    alt={`이미지 ${index + 1}`}
                                />
                            </div>
                        ))}
                    </Carousel>

                    <div>
                        {categories.map((categoryName, index) => (
                            <div key={index} className={categoryName}>
                                <h2>{categoryName}</h2>
                                <div className="product-container-flex">
                                    {AllProductInfoArray.map(
                                        (product, productIndex) => {
                                            if (
                                                product.categoryName ===
                                                categoryName
                                            ) {
                                                return (
                                                    <div
                                                        key={productIndex}
                                                        className="product-item"
                                                    >
                                                        <Image
                                                            width={300}
                                                            height={200}
                                                            src={
                                                                JSON.parse(
                                                                    product.image
                                                                )[0]
                                                            }
                                                            alt={`이미지 ${
                                                                productIndex + 1
                                                            }`}
                                                        />
                                                        <div>
                                                            <h3>
                                                                {product.name}
                                                                {"  "}
                                                                {product.price}
                                                                원
                                                            </h3>
                                                            <h3>
                                                                {
                                                                    product.explanation
                                                                }
                                                            </h3>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        }
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
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
