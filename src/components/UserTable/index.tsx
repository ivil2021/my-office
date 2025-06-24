/*
таблица с помощью antd, 
таблица юзеров должна принимать:
  имя юзера
  фамилия
  возраст
  номер телефона
  эмейл
  колона экшенов (редактирование, удаление)
справа вверху кнопка создания юзера
*/

import { UserTableContainer } from './index.styles';
import { Table, Button, Space } from 'antd';
import useSWR from 'swr';
import { getAllUsers } from '../../api/user';
import type { ColumnsType } from 'antd/es/table';
import type { IDataType } from '../../entities/UserTable';
import { useMemo } from 'react';

export function UserTable () {
  const { data: users } = useSWR(
    'users',
    async () => getAllUsers(),
  );

  const columns: ColumnsType<IDataType> = useMemo(
    () => [
      {
        title: 'Имя',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Фамилия',
        dataIndex: 'lastName',
        key: 'lastName',
      },
      {
        title: 'Возраст',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Телефон',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Действия',
        key: 'actions',
        dataIndex: 'actions',
        render: () => (
          <Space size="middle">
            <Button type="link" onClick={handleEdit}>Редактировать</Button>
            <Button type="link" danger onClick={handleDelete}>Удалить</Button>
          </Space>
        ),
      }
    ],
    [users],
  );

  const handleEdit = () => alert('Редактировать пользователя');
  const handleDelete = () => alert('Удалить пользователя');
  const handleCreateUser = () => alert('Создать нового пользователя');

  return (
    <UserTableContainer>
      <Button 
        type="primary"
        style={{ position:'absolute', top:20, right:20 }}
        onClick={handleCreateUser}
      >
        Создать пользователя
      </Button>
      <Table 
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{ pageSize:7 }}
        style={{ marginTop:50 }}
      />
    </UserTableContainer>
  );
};
