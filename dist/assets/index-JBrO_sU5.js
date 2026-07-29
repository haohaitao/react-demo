import{j as e}from"./query-B1h2dbl9.js";import{r,h as c,u as x,f as h}from"./react-Cyq9zxIJ.js";import{g as m,u as f,a as g,b as u,f as d}from"./index-CcbrH7Ip.js";import{S as v,k as b,l as j,T as l}from"./antd-BIav05ht.js";const z=m.article`
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
      content: '#';
      color: #f72d84;
    }
  }
`;function I({path:i}){const n=r.useRef(null);return r.useEffect(()=>{n.current},[i]),e.jsx("div",{id:"vcomments",ref:n})}function y(){const{id:i}=c(),{pathname:n}=x(),s=h(),{data:t,isPending:o}=f(i),{data:p}=g(t?.tagIds??[]);return u(t?.title),e.jsx(z,{className:o?"detail-loading":"",children:e.jsxs(v,{tip:"Loading...",spinning:o,children:[t?.previousPostId&&e.jsx("div",{className:"post-nav-l",title:"上一篇",onClick:()=>s(`/article/${t.previousPostId}`),children:e.jsx("span",{children:e.jsx(b,{})})}),t?.nextPostId&&e.jsx("div",{className:"post-nav-r",title:"下一篇",onClick:()=>s(`/article/${t.nextPostId}`),children:e.jsx("span",{children:e.jsx(j,{})})}),t&&e.jsxs("div",{className:"detail-article",children:[e.jsxs("div",{className:"art-header",children:[e.jsx("h2",{children:t.title}),e.jsxs("div",{className:"header-info",children:[e.jsxs("span",{children:["发布于：",d(t.date)]}),e.jsxs("span",{children:[t.pageviews,"次浏览"]}),e.jsxs("span",{children:[t.totalComments,"条评论"]})]})]}),e.jsx("div",{id:"blog",dangerouslySetInnerHTML:{__html:t.content}}),e.jsxs("div",{className:"content-footer",children:[e.jsxs("div",{className:"article-info",children:[e.jsxs("div",{children:["文章分类：",e.jsx(l,{color:"blue",children:t.categoryName})]}),e.jsxs("div",{children:["文章标签：",p.map(a=>e.jsx(l,{color:"blue",style:{paddingRight:8},children:a.name},a.id))]}),e.jsxs("p",{children:["版权声明：",e.jsxs("a",{href:"https://creativecommons.org/licenses/by-nc/3.0/cn/deed.zh",target:"_blank",rel:"noopener noreferrer",children:[" ","自由转载-署名-非商用"]})]}),e.jsxs("p",{children:["最后编辑时间：",d(t.modified)]})]}),e.jsx(I,{path:n})]})]})]})})}export{y as Detail,y as default};
