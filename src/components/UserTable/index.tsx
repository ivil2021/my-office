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
import useSWR from 'swr';
import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getAllUsers, createUser, editUser } from '../../api/user';
import { useRegistrationForm } from "../../hooks/useRegistrationForm";
import { CreateAndEditUser } from '../../modals/user';
import { UserTableContainer } from './index.styles';

import { useUserModal } from './useUserModal';
import { useUserActions } from './useUserActions';
import { useUserEdit } from './useUserEdit';
import { useHandleOk } from './useHandleOk';
import { useHandleCancel } from './useHandleCancel';

export function UserTable () {
  const { isModalOpen, showModal, hideModal, handleCreate } = useUserModal()
  const { handleDelete } = useUserActions();
  const { form, setFormValues } = useRegistrationForm();
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const { handleEdit } = useUserEdit({ setFormValues, setEditingUserId, showModal });
  const handleOk = useHandleOk({ form, setEditingUserId, hideModal, createUser, editUser });
  const handleCancel = useHandleCancel({ setEditingUserId, hideModal });
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
