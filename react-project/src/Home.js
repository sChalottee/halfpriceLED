import React, { useEffect, useState } from "react";
import { Menu, Layout, Space } from "antd";
import "./reset.css";
import "./Home.css";
import axios from "axios";

const { Header, Footer, Content } = Layout;

function Home() {
    const [categories, setCategories] = useState([]);

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
                            };
                        })}
                    />
                </nav>
                <Content className="contentStyle">
                    <div>
                        <div>
                            <img
                                className="mainImage"
                                src="/product/image/1703586846334.png"
                                alt="아무이미지"
                            />

                            <img
                                className="mainImage"
                                src="/product/image/1703586886764.png"
                                alt="아무이미지2"
                            />

                            <img
                                className="mainImage"
                                src="https://pbs.twimg.com/media/EA9UJBjU4AAdkCm.jpg"
                                alt="아무이미지3"
                            />
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66113e2bd2b7407c8202a97d2241a96625"
                                alt="아무이미지4"
                            />
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66113e2bd2b7407c8202a97d2241a96625"
                                alt="아무이미지5"
                            />
                        </div>
                    </div>
                    <div className="livingRoom">
                        <h2>거실조명</h2>
                        <div className="livingRoomImg">
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a"
                                alt="아무이미지"
                            />

                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e669f5287469802eca457586a25a096fd31"
                                alt="아무이미지2"
                            />

                            <img
                                className="mainImage"
                                src="https://pbs.twimg.com/media/EA9UJBjU4AAdkCm.jpg"
                                alt="아무이미지3"
                            />
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66113e2bd2b7407c8202a97d2241a96625"
                                alt="아무이미지4"
                            />
                        </div>
                    </div>
                    <div className="generalRoom">
                        <h2>방조명</h2>
                        <div>
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a"
                                alt="아무이미지"
                            />

                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e669f5287469802eca457586a25a096fd31"
                                alt="아무이미지2"
                            />

                            <img
                                className="mainImage"
                                src="https://pbs.twimg.com/media/EA9UJBjU4AAdkCm.jpg"
                                alt="아무이미지3"
                            />
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66113e2bd2b7407c8202a97d2241a96625"
                                alt="아무이미지4"
                            />
                        </div>
                    </div>
                    <div className="tablePoint">
                        <h2>식탁.포인트</h2>
                        <div>
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a"
                                alt="아무이미지"
                            />

                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e669f5287469802eca457586a25a096fd31"
                                alt="아무이미지2"
                            />

                            <img
                                className="mainImage"
                                src="https://pbs.twimg.com/media/EA9UJBjU4AAdkCm.jpg"
                                alt="아무이미지3"
                            />
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66113e2bd2b7407c8202a97d2241a96625"
                                alt="아무이미지4"
                            />
                        </div>
                    </div>
                    <div className="kitchenBathRail">
                        <h2>주방.욕실.레일</h2>
                        <div>
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a"
                                alt="아무이미지"
                            />

                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e669f5287469802eca457586a25a096fd31"
                                alt="아무이미지2"
                            />

                            <img
                                className="mainImage"
                                src="https://pbs.twimg.com/media/EA9UJBjU4AAdkCm.jpg"
                                alt="아무이미지3"
                            />
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66113e2bd2b7407c8202a97d2241a96625"
                                alt="아무이미지4"
                            />
                        </div>
                    </div>
                    <div className="entranceVeranda">
                        <h2>현관.베란다</h2>
                        <div>
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a"
                                alt="아무이미지"
                            />

                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e669f5287469802eca457586a25a096fd31"
                                alt="아무이미지2"
                            />

                            <img
                                className="mainImage"
                                src="https://pbs.twimg.com/media/EA9UJBjU4AAdkCm.jpg"
                                alt="아무이미지3"
                            />
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66113e2bd2b7407c8202a97d2241a96625"
                                alt="아무이미지4"
                            />
                        </div>
                    </div>
                    <div className="landfill">
                        <h2>매입조명</h2>
                        <div className="landfillImg">
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a"
                                alt="아무이미지"
                            />

                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e669f5287469802eca457586a25a096fd31"
                                alt="아무이미지2"
                            />

                            <img
                                className="mainImage"
                                src="https://pbs.twimg.com/media/EA9UJBjU4AAdkCm.jpg"
                                alt="아무이미지3"
                            />
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66113e2bd2b7407c8202a97d2241a96625"
                                alt="아무이미지4"
                            />
                        </div>
                    </div>
                    <div className="industrial">
                        <h2>산업조명</h2>
                        <div>
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a"
                                alt="아무이미지"
                            />

                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e669f5287469802eca457586a25a096fd31"
                                alt="아무이미지2"
                            />

                            <img
                                className="mainImage"
                                src="https://pbs.twimg.com/media/EA9UJBjU4AAdkCm.jpg"
                                alt="아무이미지3"
                            />
                            <img
                                className="mainImage"
                                src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66113e2bd2b7407c8202a97d2241a96625"
                                alt="아무이미지4"
                            />
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
