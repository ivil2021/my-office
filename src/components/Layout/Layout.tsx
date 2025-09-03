import { Outlet, Link } from 'react-router-dom';

export function Layout() {
  return (
    <div className="layout">
      <div className="sidebar">
        <nav>
          <ul>
            <li><Link to="/users">Пользователи</Link></li>
            <li><Link to="/clients">Клиенты</Link></li>
          </ul>
        </nav>
      </div>

      {/* Основной контент */}
      <div className="content">
      {/* сюда будет вставляться содержимое страниц */}
        <Outlet /> 
      </div>
    </div>
  );
}
