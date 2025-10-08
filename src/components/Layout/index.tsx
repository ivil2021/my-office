import { Layout, Menu } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';
import { StyledLayout, StyledSider } from './index.styles';
import { useRoutes } from "../../hooks/useRoutes";
import type { MenuProps } from 'antd';

const { Content } = Layout;

export function LayoutComponent() {
  // const { currentRoute } = useRoutes();
  const location = useLocation();
  const navigate = useNavigate();

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      key: 'users',
      label: 'Пользователи',
      icon: <UserOutlined />
    },
    {
      key: 'clients',
      label: 'Клиенты',
      icon: <TeamOutlined />
    }
  ];

  const keyToPathMap: Record<string, string> = {
    users: '/users',
    clients: '/clients'
  };

  // Функция для определения активного пункта меню
  const getSelectedKeys = () => {
    const currentPath = location.pathname;
    
    // Находим ключ по текущему пути
    for (const [key, path] of Object.entries(keyToPathMap)) {
      if (currentPath === path || currentPath.startsWith(path + '/')) {
        return [key];
      }
    }
    
    return [];
  };

  return (
    <StyledLayout>
      <StyledSider>
        <Menu
          // selectedKeys={currentRoute ? [currentRoute.key] : []}
          selectedKeys={getSelectedKeys()}
          items={items}
          // onClick={({ key }: { key: string }) => {const path = keyToPathMap[key]; if (path) {navigate(path)}}}
          onClick={({ key }: { key: string }) => {
            const path = keyToPathMap[key];
            if (path) {
              navigate(path);
            }
          }}
          // mode="inline"
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
