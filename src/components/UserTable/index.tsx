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

import { useState, useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllUsers, createUser, deleteUser, editOneUser } from '../../api/user';
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import { UserTableContainer } from './index.styles';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { CreateUser } from '../../modals/user/CreateUser';

export function UserTable () {
  const { form, setFormValues } = useRegistrationForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);

  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const handleOk = async () => {
    if (editingUserId) {
      try {
        await editOneUser(editingUserId, {
          id: editingUserId,
          name: form.values.name,
          lastName: form.values.lastName,
          age: form.values.age,
          phone: form.values.phone,
          email: form.values.email,
        });
        await mutate('users');

        setIsModalOpen(false);

        setEditingUserId(null);
      } catch (error) {
        console.error('Ошибка при обновлении данных пользователя:', error);
      }
    } else {
      await createUser(newUserData);

      setIsModalOpen(false);

      await mutate('users');
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);

    setEditingUserId(null);
  };

  const newUserData = {
    id: -1,
    name: form.values.name,
    lastName: form.values.lastName,
    age: form.values.age,
    phone: form.values.phone,
    email: form.values.email
  };

  const { data: users } = useSWR( 'users', getAllUsers );

  interface DataType {
    id: number;
    name: string;
    lastName: string;
    age: string;
    phone: string;
    email: string;
  }

  const columns: ColumnsType<DataType> = useMemo(
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
        render: (_, record) => (
          <Space size="middle">
            <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(record.id)} />
            <Button type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
          </Space>
        ),
      }
    ],
    [users],
  );

  const handleDelete = async (id: number) => {
    try {
      await deleteUser({ id });

      await mutate('users');
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      setFormValues({
        name: form.values.name,
        lastName: form.values.lastName,
        age: form.values.age,
        phone: form.values.phone,
        email: form.values.email
      });

      setEditingUserId(id);

      showModal();
    } catch (error) {
      console.error('Ошибка при редактировании данных пользователя:', error);
    }
  };

  return (
    <UserTableContainer>
      <Button 
        type="primary"
        style={{ position:'absolute', top:20, right:20 }}
        onClick={showModal}
      >
        Создать пользователя
      </Button>
      <CreateUser
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
      />
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
