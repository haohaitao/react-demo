import { Wrapper } from './style';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function About() {
  useDocumentTitle('关于');

  return (
    <Wrapper>
      <div className="content animated rollIn">
        <p>
          <img
            src="https://www.haohaitao.cn/wp-content/uploads/2019/04/about20190403.jpg"
            alt="关于"
            width={690}
            height={388}
            srcSet="https://www.haohaitao.cn/wp-content/uploads/2019/04/about20190403.jpg 690w, https://www.haohaitao.cn/wp-content/uploads/2019/04/about20190403-300x169.jpg 300w"
            sizes="(max-width: 690px) 100vw, 690px"
          />
        </p>
        <h2>关于本站</h2>
        <p>
          主要用到的技术：Vite + React 19 + TypeScript + React Router + TanStack
          Query + Zustand + styled-components + Ant Design
        </p>
        <p>代码已开源，页脚有 github 的入口，欢迎交流，共同学习</p>
        <h2>关于博主</h2>
        <p>曾梦想仗剑走天涯，看一看世界的繁华，后来工作太忙没去。</p>
        <h2>送给自己</h2>
        <p>你好哇，hht。</p>
        <p>虽然生活总是不尽人意，但是活着就有希望！</p>
        <p>困难像弹簧，你弱它就强！</p>
        <h2>联系方式</h2>
        <p>Email：haohaitao28#163.com　#换@</p>
        <p>微信：hht28_</p>
      </div>
    </Wrapper>
  );
}

export default About;
