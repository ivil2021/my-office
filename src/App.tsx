import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserTable } from './components/UserTable';
import { ClientTable } from './components/ClientTable';
import { LayoutComponent } from './components/Layout';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Общий макет для всех страниц */}
        <Route path="/" element={<LayoutComponent />}>
          {/* Внутренние маршруты */}
          <Route path="users" element={<UserTable />} />
          <Route path="clients" element={<ClientTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
