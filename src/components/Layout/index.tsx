import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { StyledLayout, StyledSider } from './index.styles';
import { useRoutes } from "../../hooks/useRoutes";
import type { MenuProps } from 'antd';

const { Content } = Layout;

export function LayoutComponent() {
  const { currentRoute } = useRoutes();
  const navigate = useNavigate();

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      key: 'users',
      label: 'Пользователи',
      icon: <UserOutlined />,
    },
    {
      key: 'clients',
      label: 'Клиенты',
      icon: <TeamOutlined />,
    },
  ];

  const keyToPathMap: Record<string, string> = {
    users: '/users',
    clients: '/clients',
  };

  const onClick = ({ key }: { key: string }) => {
    const path = keyToPathMap[key];

    if (path) {
      navigate(path);
    }
  };

  return (
    <StyledLayout>
      <StyledSider>
        <Menu
          selectedKeys={currentRoute ? [currentRoute.key] : []}
          items={items}
          onClick={onClick}
        />
      </StyledSider>

      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </StyledLayout>
  );
}
