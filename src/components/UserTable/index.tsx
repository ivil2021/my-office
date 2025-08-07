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
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllUsers, createUser, deleteUser, getOneUser, editUser } from '../../api/user';
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import { CreateAndEditUser } from '../../modals/user/CreateAndEditUser';
import { UserTableContainer } from './index.styles';

export function UserTable () {
  const { form, setFormValues } = useRegistrationForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  function handleCreate() {
    setFormValues({ name: '', lastName: '', age: '', phone: '', email: '' });
    showModal();
  };

  async function handleOk() {
    if (!editingUserId) {
      await createUser({
        name: form.values.name,
        lastName: form.values.lastName,
        age: form.values.age,
        phone: form.values.phone,
        email: form.values.email
      });
      await mutate('users');

      hideModal();
    } else {
      try {
        await editUser({
          id: editingUserId,
          name: form.values.name,
          lastName: form.values.lastName,
          age: form.values.age,
          phone: form.values.phone,
          email: form.values.email,
        });
        await mutate('users');

        setEditingUserId(null);
        hideModal();
      } catch (error) {
        console.error('Ошибка при обновлении данных пользователя', error);
      }
    }
  };

  function handleCancel() {
    setEditingUserId(null);
    hideModal();
  };

  async function handleEdit(id: number) {
    try {
      const editingUserData = await getOneUser({ id });
      setFormValues(editingUserData);
      setEditingUserId(id);
      showModal();
    } catch (error) {
      console.error('Ошибка при редактировании данных пользователя', error);
    }
  };

  async function handleDelete(id: number) {
    try {
      await deleteUser({ id });
      await mutate('users');
    } catch (error) {
      console.error('Ошибка при удалении пользователя', error);
    }
  };

  const { data: users } = useSWR( 'users', getAllUsers );

  interface DataType {
    id: number;
    name: string;
    lastName: string;
    age: string;
    phone: string;
    email: string;
    actions: string[];
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
    [users]
  );

  return (
    <UserTableContainer>
      <Button 
        type="primary"
        style={{ position:'absolute', top:20, right:20 }}
        onClick={handleCreate}
      >
        Создать пользователя
      </Button>
      <CreateAndEditUser
        title={`${editingUserId ? 'Редактирование' : 'Создание'} пользователя`}
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
