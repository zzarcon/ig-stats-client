import styled from 'styled-components';

export const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    border-bottom: 1px solid #aaa;
    width: 100%;
    text-align: center;
  }
`;

export const LineWrapper = styled.div`
  width: 1000px;
`

export const LineChartPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px;
`;

export const PieWrapper = styled.div`
  width: 1000px;
`;

export const PieChartWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const LoginWrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  height: 100vh;

  > button {
    margin-left: 10px;
  }
`;