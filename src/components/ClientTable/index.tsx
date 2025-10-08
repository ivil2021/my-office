import { useMemo } from 'react';
import { Button, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { CreateAndEditClient } from '../../modals/client';
import { ClientTableContainer, StyledTable, CreateButton } from './index.styles';
import { useClientTable } from "../../components/ClientTable/useClientTable";
import { Link } from 'react-router-dom';

interface DataType {
  id: number;
  name: string;
  lastName: string;
  age: string;
  phone: string;
  email: string;
  actions: string[];
}

export function ClientTable () {
  const {
    clients,
    handleDelete,
    selectedClient,
    setSelectedClient,
    createAndEditClientModalController,
    isClientsLoading
  } = useClientTable();

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
            <Button type="text" icon={<EditOutlined />} onClick={() => {setSelectedClient(record); createAndEditClientModalController.open()}} />
            <Button type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
          </Space>
        ),
      }
    ],
    [createAndEditClientModalController, handleDelete, setSelectedClient]
  );

  return (
    <ClientTableContainer>
      <CreateButton 
        type="primary"
        onClick={createAndEditClientModalController.open}
      >
        Создать клиента
      </CreateButton>

      <StyledTable 
        columns={columns}
        dataSource={clients}
        loading={isClientsLoading}
        rowKey="id"
        pagination={{ pageSize:7 }}
        style={{ marginTop:50 }}
      />

      {createAndEditClientModalController.isOpen && (
        <CreateAndEditClient
          client={selectedClient}
          open={createAndEditClientModalController.isOpen}
          onClose={() => {
            createAndEditClientModalController.dismiss();
            setSelectedClient(undefined);
          }}
        />
      )}

      <Link to="/">На главную</Link>
    </ClientTableContainer>
  );
};
