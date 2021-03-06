import React from 'react';
import Home from './view/Home';
import About from './view/About';
import Article from './view/Detail';
import Everyday from './view/Everyday';
import Categories from './view/Categories';
import CategoriesDetail from './view/CateDetail';
import { Provider } from 'react-redux';
import store from './store';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom";
// 页头页脚和侧边栏通用组件
import Header from './components/Header'
import Footer from './components/Footer';

function router() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
          <Switch>
              <Route exact path="/" component={Home}/>  {/*首页*/}
              <Route exact path="/page/:page" component={Home}/>  {/*首页*/}
              <Route exact path="/article/:id" component={Article}/>  {/*文章详情*/}
              <Route exact path="/categories" component={Categories} />  {/*分类页面*/}
              <Route exact path="/catedetail/:id" component={CategoriesDetail} />  {/*分类详情*/}
              <Route exact path="/everyday" component={Everyday}/>  {/*每日一图*/}
              <Route exact path="/about" component={About}/>  {/*关于我们*/}
              <Route exact path="/err" component={NotFound} />{/*404页面*/}
              {/* 如果匹配到以上路由将渲染路由，否则重定向404 */}
              <Redirect to="/err" />
          </Switch>
        <Footer />
      </Router>
    </Provider>
    );
}

export default router;