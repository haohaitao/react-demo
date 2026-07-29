import styled from "styled-components";
import bg from "@/assets/bg.png";

export const HeaderWrapper = styled.header`
  background: #e0c18c;
  opacity: 0.7;
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0;
  z-index: 1;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  .container {
    max-width: 1000px;
    margin: 0 auto;
    line-height: 70px;
    color: #3c3c3c;
  }
  .title_left {
    color: red;
  }
  .title_middle {
    color: yellow;
  }
  .title_right {
    color: blue;
  }
  .mobile_menu_block {
    display: block;
    position: absolute;
    top: 3px;
    line-height: 70px;
    left: 20px;
    font-size: 25px;
  }
  .mobile_menu_none {
    display: none;
  }
  .mobile_menu_list {
    width: 120px;
    background: #fff;
    margin: 0 auto;
    overflow: auto;
    padding-left: 0;
    line-height: 3;
    text-align: center;
  }
  /* 竖排菜单，抵消桌面端 li 的左右间距 */
  .mobile_menu_list li {
    margin: 0;
  }
  .home-left {
    float: left;
  }
  a {
    color: #3c3c3c;
    text-decoration: none;
  }
  .home {
    height: 100%;
    line-height: 70px;
    font-size: 24px;
    float: left;
  }
  a {
    font-size: 20px;
    position: relative;
    z-index: 1;
  }

  .nav-right {
    float: right;
    height: 70px;
  }
  /* ul 的浏览器默认 margin/padding 会把导航整体往下推，
     导致它在 70px 高的 Header 里偏离垂直中心 */
  .nav-far {
    display: flex;
    align-items: center;
    height: 100%;
    margin: 0 38px 0 0;
    padding-left: 0;
  }
  li {
    position: relative;
    margin: 0 16px;
    list-style: none;
    font-size: 14px;
    a {
      font-size: 14px;
    }
  }
`;
export const FooterContent = styled.footer`
  margin-top: 35px;
  clear: both;
  text-align: center;
  .container {
    max-width: 1080px;
    margin: 0 auto;
    height: 100%;
    text-align: center;
    font-size: 14px;
    position: relative;
    line-height: 26px;
  }
  .footer-flot {
    position: relative;
    color: #eee;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
  }
  .link-git {
    transform: translateY(-50%);
    display: inline-block;
  }
  a {
    color: #555;
  }
  .ant-back-top {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    -webkit-font-feature-settings: "tnum";
    font-feature-settings: "tnum";
    position: fixed;
    right: 100px;
    bottom: 50px;
    z-index: 10;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  .ant-back-top-inner {
    width: 40px;
    height: 40px;
    overflow: hidden;
    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.45);
    border-radius: 20px;
    -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
`;

export const MainWrapper = styled.div`
  height: 620px;
  padding-top: 90px;
  .content {
    padding: 20px;
    text-align: center;
  }
  .image-box {
    font-size: 0;
    display: inline-block;
    padding: 30px 140px;
    box-sizing: border-box;
    background: url(${bg}) no-repeat center;
  }
`;

export const SliderAside = styled.aside`
  float: left;
  width: 310px;
  font-size: 16px;
  margin-top: 20px;
  h3 {
    background: #f8f8f8;
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #ddd;
    padding-left: 10px;
    font-size: 14px;
  }
  section {
    border: 1px solid #ddd;
    border-radius: 2px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.04);
    margin-bottom: 10px;
  }
  section > ul {
    padding-left: 10px;
  }
  section > ul li {
    list-style-type: none;
    font-size: 13px;
    padding: 8px 0;
    width: 220px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    cursor: pointer;
  }
  section > ul li .newPost {
    transition: padding-left 0.5s;
  }
  section > ul li .newPost:hover {
    color: #ff8b18;
    cursor: pointer;
    position: relative;
    padding-left: 10px;
  }
  .listNumber {
    font-size: 12px;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    background-color: #7f828b;
    color: #fff;
    margin-right: 8px;
    display: inline-block;
  }
  .tag {
    display: inline-block;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid #eee;
    cursor: pointer;
    margin: 0 0 8px 8px;
  }
  .tag:hover {
    background: #eee;
    transition: background 0.5s;
  }
`;
