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

import type { ColumnsType } from 'antd/es/table';
import { UserTableContainer } from './index.styles';
import { Table, Button, Space } from 'antd';
import { useMemo } from 'react';
import type { IDataType } from '../../entities/UserTable';

const mockUsersData = [
  {
    id: 1,
    name: 'Mark1',
    lastName: 'White1',
    age: 31,
    phone: +7900100200511,
    email: 'test1@gmail.com',
  },
  {
    id: 2,
    name: 'Mark2',
    lastName: 'White2',
    age: 32,
    phone: +7900100200512,
    email: 'test2@gmail.com',
  },
  {
    id: 3,
    name: 'Mark3',
    lastName: 'White3',
    age: 33,
    phone: +7900100200513,
    email: 'test3@gmail.com',
  },
  {
    id: 4,
    name: 'Mark4',
    lastName: 'White4',
    age: 34,
    phone: +7900100200514,
    email: 'test4@gmail.com',
  },
  {
    id: 5,
    name: 'Mark5',
    lastName: 'White5',
    age: 35,
    phone: +7900100200515,
    email: 'test5@gmail.com',
  },
  {
    id: 6,
    name: 'Mark6',
    lastName: 'White6',
    age: 36,
    phone: +7900100200516,
    email: 'test6@gmail.com',
  },
  {
    id: 7,
    name: 'Mark7',
    lastName: 'White7',
    age: 37,
    phone: +7900100200517,
    email: 'test7@gmail.com',
  },
  {
    id: 8,
    name: 'Mark8',
    lastName: 'White8',
    age: 38,
    phone: +7900100200518,
    email: 'test8@gmail.com',
  },
  {
    id: 9,
    name: 'Mark9',
    lastName: 'White9',
    age: 39,
    phone: +7900100200519,
    email: 'test9@gmail.com',
  },
  {
    id: 10,
    name: 'Mark10',
    lastName: 'White10',
    age: 310,
    phone: +79001002005110,
    email: 'test10@gmail.com',
  }
];

export function UserTable () {
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
        render: function () {
          return (
            <Space size="middle">
              <Button type="link" onClick={handleEdit}>Редактировать</Button>
              <Button type="link" danger onClick={handleDelete}>Удалить</Button>
            </Space>
          )
        }
      }
    ],
    [mockUsersData],
  );

  const handleEdit = () => {
    alert('Редактировать пользователя');
  };

  const handleDelete = () => {
    alert('Удалить пользователя');
  };

  const handleCreateUser = () => {
    alert('Создать нового пользователя');
  };

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
        dataSource={mockUsersData}
        rowKey="id"
        pagination={{ pageSize:7 }}
        style={{ marginTop:50 }}
      />
    </UserTableContainer>
  );
};
