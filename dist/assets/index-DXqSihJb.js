import{j as a}from"./query-B1h2dbl9.js";import{g as t,b as n,h as r}from"./index-CcbrH7Ip.js";import{S as o}from"./antd-BIav05ht.js";import"./react-Cyq9zxIJ.js";const s=t.main`
  margin-top: 90px;
  max-width: 900px;
  margin: 0 auto;
  overflow: hidden;
  height: 1200px;
  padding: 8px;
  img {
    width: 100%;
  }
  article {
    margin-top: 100px;
  }
`;function x(){n("每日一图");const{data:e,isPending:i}=r();return a.jsx(s,{className:"mobile_everyday animated rollIn",children:a.jsx(o,{tip:"Loading...",spinning:i,children:a.jsx("article",{className:"excerpt",dangerouslySetInnerHTML:{__html:e?.content??""}})})})}export{x as Everyday,x as default};
