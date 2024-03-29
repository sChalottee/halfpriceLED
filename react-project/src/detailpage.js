import React from "react";
import { Layout, Flex, Image } from "antd";
import "./reset.css";
import "./detailpage.css";
// import axios from "axios";

const { Header, Footer, Content } = Layout;

const productData = function Detail() {
    const DetailComponent = (
        <>
            <Flex gap="middle" wrap="wrap">
                <Layout className="layoutStyle">
                    <Header className="headerStyle">상품 상세 정보</Header>
                    <Layout>
                        <Content className="contentStyle">
                            <div className="product-details">
                                <div className="product-image">
                                    <Image
                                        className="mainImage"
                                        src="/product/image/1704000364719.png"
                                        alt="아무이미지"
                                    />
                                </div>
                                <div className="product-info">
                                    <h1>루이스 PH5 펜던트 Ver.3</h1>
                                    <ul className="product-features">
                                        <li>3중 코팅 공정으로 가는 디자</li>
                                        <li>고급스러운 쉐이드 색도</li>
                                        <li>상품크기 750 X 250</li>
                                    </ul>
                                    <div className="product-price">
                                        <span className="discount">32%</span>
                                        <span className="price">53,000원</span>
                                        <span className="original-price">
                                            70,000원
                                        </span>
                                    </div>
                                    <div className="product-options"></div>
                                </div>
                            </div>
                        </Content>
                    </Layout>
                    <Footer className="footerStyle">
                        <div>전화번호 : 010 - 1111 - 2222</div>
                        <div>사업장위치 : 경기도 용인시 처인구 이동읍</div>
                    </Footer>
                </Layout>
            </Flex>
        </>
    );
    return DetailComponent;
};
export default productData;
