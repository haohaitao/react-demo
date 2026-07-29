import { Spin } from 'antd';

import { MainWrapper } from './style';
import { useEveryday } from '@/hooks/queries';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

export function Everyday() {
  useDocumentTitle('每日一图');

  const { data, isPending } = useEveryday();

  return (
    <MainWrapper className="mobile_everyday animated rollIn">
      <Spin tip="Loading..." spinning={isPending}>
        <article
          className="excerpt"
          dangerouslySetInnerHTML={{ __html: data?.content ?? '' }}
        />
      </Spin>
    </MainWrapper>
  );
}

export default Everyday;
