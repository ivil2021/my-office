import styled from '@emotion/styled';
import { Layout } from 'antd';
const { Sider } = Layout;

export const StyledLayout = styled(Layout)`
  &&& {
    min-height: 100vh;
    width: 1000px;
  }
`;

export const StyledSider = styled(Sider)`
  &&& {
    width: 1000px;
    background: #fff;
  }
`;
