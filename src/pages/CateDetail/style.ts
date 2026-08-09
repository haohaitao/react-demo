import styled from "styled-components";

export const CateWrapper = styled.div`
  max-width: 1050px;
  margin: 0 auto;
  margin-top: 90px;
`;

export const CateDetailWrapper = styled.main`
  animation: fadeIn 0.6s linear;
  /* 与 Home 同理：float 元素只给 max-width 会由内容撑开宽度，
     骨架屏和真实卡片宽度不同导致左右抖动。255px 是 SliderAside 的宽度。 */
  width: calc(100% - 310px);
  max-width: 960px;
  margin: 0 auto;
  box-sizing: border-box;
  margin-bottom: 70px;
  float: left;

  /* index.css 里 aside 在 ≤1000px 时 display:none，此时不再预留侧边栏宽度 */
  @media screen and (max-width: 1000px) {
    width: 100%;
    float: none;
  }
  article {
    max-width: 700px;
    height: 193px;
    position: relative;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    margin: 20px;
    box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }
  article:hover {
    box-shadow: 1px 2px 12px 1px rgba(0, 0, 0, 0.15);
  }

  .bg-cover:hover {
    transition: 0.5s;
    transform: scale(1.1);
  }
  .bg-img::before {
    content: "Loading...";
    position: absolute;
    border-radius: 5px 5px 0 0;
    width: 100%;
    left: 0;
    background-color: rgba(169, 169, 169, 0.75);
    text-align: center;
    line-height: 193px;
    font-size: 26px;
    color: #333333;
    z-index: -1;
  }
  .bg-img::after {
    content: "";
    position: absolute;
    border-radius: 5px 5px 0 0;
    width: 100%;
    left: 0;
    background-color: rgba(255, 255, 255, 0);
    line-height: 193px;
    z-index: -1;
  }
  .top-icon {
    width: 46px;
    opacity: 0.86;
    height: 46px;
    position: absolute;
    left: -9px;
    top: -4px;
    text-align: center;
    line-height: 44px;
    color: #fff;
    background-size: cover;
  }
  i {
    font-size: 19px;
  }

  .bg-img {
    transition: all 1s ease;
    height: 193px;
    border-radius: 5px 5px 0 0;
  }

  .bg-cover {
    overflow: hidden;
    width: 240px;
    height: auto;
    clear: both;
    float: left;
    position: relative;
    box-sizing: border-box;
    border-radius: 8px;
    -webkit-transition: -webkit-transform 0.3s linear;
    -moz-transition: -moz-transform 0.3s linear;
    -o-transition: -o-transform 0.3s linear;
    transition: transform 0.3s linear;
  }
  .bg-cover p {
    font-size: 14px;
    margin: 0;
    margin-top: 26px;
    padding: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    opacity: 0;
    line-height: 26px;
    color: #fff;
  }

  .other-bgcover {
    position: absolute;
    z-index: 0;
    right: 0;
    bottom: 1px;
    left: 0;
    width: 110%;
    min-height: 100px;
    transform: rotate(5deg) translate(-10px, -20px);
    background-color: #fff;
  }
  .right-bgcover {
    transform: rotate(-10deg) translate(10px, -30px);
    opacity: 0.7;
    background-color: rgba(0, 0, 0, 0.5) !important;
  }

  .desc {
    width: 60%;
    height: 110px;
    background: #fff;
    padding: 7px 15px 10px;
    box-sizing: border-box;
    float: left;
  }
  .title {
    color: #000;
    font-size: 16px;
    height: 30px;
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    transition: padding-left 0.5s;
  }
  .title:hover {
    color: #ff8b18;
    cursor: pointer;
    position: relative;
    padding-left: 10px;
    text-decoration: overline;
  }
  .excerpt {
    height: 90px;
  }
  .desc-bottom {
    width: 400px;
  }
  .d-detail {
    position: absolute;
    bottom: 10px;
    padding: 0px 20px;
  }
  i {
    font-size: 14px;
    margin-top: -2px;
  }
  i:not(:first-child) {
    margin-left: 5px;
  }

  .item-icon {
    height: 37px;
    width: 36px;
    float: right;
    border-radius: 50%;
    background-size: cover;
  }
  .clear {
    clear: both;
  }
  .artList-by-type {
    background-color: #fff;
    margin: 15px;
    padding: 15px 0;
    text-align: center;
    font-size: 16px;
  }
  .type-title {
    padding-bottom: 10px;
    color: orange;
    font-weight: 700;
    border-radius: 4px;
    padding: 5px;
    margin: 0 5px;
  }
  .type-total {
    margin: 0 5px;
    color: orange;
    font-weight: 700;
  }
`;
