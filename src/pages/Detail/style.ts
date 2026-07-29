/*
 * @Description:
 * @Author: pacino
 * @Date: 2022-07-01 00:03:54
 * @LastEditTime: 2022-07-01 10:54:25
 * @LastEditors: pacino
 */
import styled from "styled-components";

export const ArticleContent = styled.article`
  animation: fadeIn 0.6s linear;
  max-width: 700px;
  padding: 25px 30px;
  margin: 0 auto;
  background-color: #fff;
  position: relative;
  text-align: left;
  font-size: 15px;
  line-height: 32px;
  margin-top: 90px;
  min-height: 600px;
  img {
    max-width: 100%;
    width: auto;
    height: auto;
    vertical-align: middle;
    display: block;
  }
  .art-header {
    padding-bottom: 12px;
    border-bottom: 1px dashed #b7b7b7;
    position: relative;
  }

  .header-info {
    margin: 12px 0px 0;
    color: #999;
    font-size: 12px;
  }
  .header-info span {
    padding-right: 6px;
  }

  .article-info {
    border-left: 2px solid #ccc;
    background-color: #f6f8fa;
    margin-top: 30px;
    margin-bottom: 15px;
    padding: 15px 0 15px 15px;
    font-size: 14px;
    margin-top: 20px;
  }
  .content-footer {
    border-top: 1px dashed #eee;
  }
  a {
    border-bottom: 1px solid #ccc;
    color: #555;
  }
  .post-nav-l {
    position: fixed;
    left: 10px;
    top: 45%;
    font-size: 50px !important;
    width: 50px;
    z-index: 1;
  }
  .post-nav-l span {
    font-size: 45px;
    color: #b6b6b6;
    text-align: center;
  }
  .post-nav-l span:hover {
    color: #555;
    cursor: pointer;
  }
  .post-nav-r {
    position: fixed;
    right: 10px;
    top: 45%;
    width: 50px;
    z-index: 1;
  }
  .post-nav-r span {
    font-size: 45px;
    color: #b6b6b6;
    text-align: center;
  }
  .post-nav-r span:hover {
    color: #555;
    cursor: pointer;
  }
  #blog p {
    text-indent: 2rem;
  }
  #blog h5 {
    font-size: 16px;
    line-height: 190%;
    margin: 2px -21px 10px -21px;
    padding: 0 44px;
    &:before {
      margin-right: 5px;
      content: "#";
      color: #f72d84;
    }
  }
  .flex {
    display: flex;
    margin-bottom: 8px;
  }
  .items-center {
    align-items: center;
  }
`;
