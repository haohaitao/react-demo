import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 100px auto auto;
  max-width: 900px;
  padding: 8px;
  .content {
    text-align: left;
    line-height: 30px;
  }
  img {
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
  .content >>> p:nth-child(1) {
    text-align: center;
  }
`;
