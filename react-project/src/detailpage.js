import React from "react";
import { Layout, Flex } from "antd";
import "./reset.css";
import "./detailpage.css";

const { Header, Footer, Content } = Layout;

function Detail() {
    const DetailComponent = (
        <>
            <Flex gap="middle" wrap="wrap">
                <Layout className="layoutStyle">
                    <Header className="headerStyle">상품 상세 정보</Header>
                    <Layout>
                        <Content className="contentStyle">
                            <div class="product-container">
                                <div class="product-image">
                                    <img
                                        className="mainImage"
                                        src="https://item.kakaocdn.net/do/493188dee481260d5c89790036be0e66f604e7b0e6900f9ac53a43965300eb9a"
                                        alt="아무이미지"
                                    />
                                </div>
                                <div class="product-info">
                                    <h1>루이스 PH5 펜던트 Ver.3</h1>
                                    <ul class="product-features">
                                        <li>3중 코팅 공정으로 가는 디자인</li>
                                        <li>고급스러운 쉐이드 색도</li>
                                        <li>상품크기 750 X 250</li>
                                    </ul>
                                    <div class="product-price">
                                        <span class="discount">32%</span>
                                        <span class="price">53,000원</span>
                                        <span class="original-price">
                                            70,000원
                                        </span>
                                    </div>
                                    <div class="product-options"></div>
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
}
export default Detail;
