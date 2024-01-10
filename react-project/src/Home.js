import React, { useEffect, useState } from "react";
import { Menu, Layout, Space, Image } from "antd";
import "./reset.css";
import "./Home.css";
import axios from "axios";

const { Header, Footer, Content } = Layout;

function Home() {
    const [categories, setCategories] = useState([]);
    const [productsInfo, setProductsInfo] = useState([]);
    const [parsedImages, setParsedImages] = useState([]);

    // const productInfo = [
    //     "/product/image/1704000363719.png",
    //     "/product/image/1704005546456.png",
    // ];
    console.log(productsInfo);

    function fetchAllProducts() {
        axios
            .get("/product")
            .then((response) => {
                setProductsInfo(response.data);

                const parsedImages = response.data.map((product) => {
                    const imagesArray = JSON.parse(product.image);
                    return imagesArray[0];
                });
                setParsedImages(parsedImages);
                console.log(parsedImages);
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
                        items={categories.map((label, index) => {
                            return {
                                label: label,
                                key: index + 1,
                                onClick: () => {
                                    if (label === "거실 조명") {
                                        document
                                            .querySelector(".livingRoom")
                                            .scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    } else if (label === "방 조명") {
                                        document
                                            .querySelector(".generalRoom")
                                            .scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    } else if (label === "식탁 · 포인트") {
                                        document
                                            .querySelector(".tablePoint")
                                            .scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    } else if (label === "주방 · 욕실 · 레일") {
                                        document
                                            .querySelector(".kitchenBathRail")
                                            .scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    } else if (label === "현관 · 베란다") {
                                        document
                                            .querySelector(".entranceVeranda")
                                            .scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    } else if (label === "매입") {
                                        document
                                            .querySelector(".landfill")
                                            .scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    } else if (label === "산업 조명") {
                                        document
                                            .querySelector(".industrial")
                                            .scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }
                                },
                            };
                        })}
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
                    <div className="livingRoom">
                        <h2>거실 조명</h2>
                        <div className="livingRoomImg">
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
                    <div className="generalRoom">
                        <h2>방 조명</h2>
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
                    <div className="tablePoint">
                        <h2>식탁 · 포인트</h2>
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
                    <div className="kitchenBathRail">
                        <h2>주방 · 욕실 · 레일</h2>
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
                    <div className="entranceVeranda">
                        <h2>현관 · 베란다</h2>
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
                    <div className="landfill">
                        <h2>매입</h2>
                        <div className="landfillImg">
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
                    <div className="industrial">
                        <h2>산업 조명</h2>
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

/////
// const a = {
//     name: "kk",
//     image: "['asdf', 'asdf'",
// };
// const b = {
//     name: "kk",
//     image: "['asdf', 'asdf'",
// };
// const arr = [a, b, c, d, e];

// // Case 1
// const names = [];
// const images = [];
// for (const o of arr) {
//     names.push(o.name);
//     images.push(o.images);
// }

// for (const name of names) {
//     console.log(name);
// }

// // Case 2
// for (const o of arr) {
//     console.log(o.name);
// }
