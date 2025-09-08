import { Layout, Menu } from 'antd';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { UserOutlined, TeamOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

export function LayoutComponent() {
  const location = useLocation();

  const selectedKey = location.pathname.startsWith('/clients')
    ? 'clients'
    : location.pathname.startsWith('/users')
    ? 'users'
    : '';

  return (
    <Layout style={{ minHeight: '100vh', width: '1000px' }}>
      <Sider style={{ background: '#fff' }}>
        <Menu theme="light" mode="inline" selectedKeys={[selectedKey]}>
          <Menu.Item key="users" icon={<UserOutlined />}>
            <Link to="/users">Пользователи</Link>
          </Menu.Item>
          <Menu.Item key="clients" icon={<TeamOutlined />}>
            <Link to="/clients">Клиенты</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
