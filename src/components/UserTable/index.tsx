import { useMemo } from 'react';
import { Table, Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { CreateAndEditUser } from '../../modals/user';
import { UserTableContainer } from './index.styles';
import { useUserTable } from "../../components/UserTable/useUserTable";
import { Link } from 'react-router-dom';

interface DataType {
  id: number;
  name: string;
  lastName: string;
  age: string;
  phone: string;
  email: string;
  placeOfStudy: string;
  actions: string[];
}

export function UserTable () {
  const {
    users,
    handleDelete,
    selectedUser,
    setSelectedUser,
    createAndEditUserModalController,
    isUsersLoading
  } = useUserTable();

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
        title: 'Место учебы',
        dataIndex: 'placeOfStudy',
        key: 'placeOfStudy',
      },
      {
        title: 'Действия',
        key: 'actions',
        dataIndex: 'actions',
        render: (_, record) => (
          <Space size="middle">
            <Button type="text" icon={<EditOutlined />} onClick={() => {setSelectedUser(record); createAndEditUserModalController.open()}} />
            <Button type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
          </Space>
        ),
      }
    ],
    [createAndEditUserModalController, handleDelete, setSelectedUser]
  );

  return (
    <UserTableContainer>
      <Button 
        type="primary"
        onClick={createAndEditUserModalController.open}
      >
        Создать пользователя
      </Button>

      <Table 
        columns={columns}
        dataSource={users}
        loading={isUsersLoading}
        rowKey="id"
        pagination={{ pageSize:7 }}
        style={{ marginTop:50 }}
      />

      {createAndEditUserModalController.isOpen && (
        <CreateAndEditUser
          user={selectedUser}
          open={createAndEditUserModalController.isOpen}
          onClose={() => {
            createAndEditUserModalController.dismiss();
            setSelectedUser(undefined);
          }}
        />
      )}

      <Link to="/">На главную</Link>
    </UserTableContainer>
  );
};
