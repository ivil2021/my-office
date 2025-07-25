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
import { Table, Button, Space, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getAllUsers, createUser, deleteUser, getOneUserDataById, editOneUserDataById } from '../../api/user';
import type { IUser } from '../../entities/User';
import { useRegistrationForm } from "./useRegistrationForm";
import { UserTableContainer, FormContainer, TextError } from './index.styles';

export function UserTable () {
  const { form } = useRegistrationForm();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const handleOk = () => setIsModalOpen(false);
  const handleCancel = () => setIsModalOpen(false);

  const newUserData = {
    id: -1,
    name: form.values.name,
    lastName: form.values.lastName,
    age: form.values.age,
    phone: form.values.phone,
    email: form.values.email
  };

  const { data: users } = useSWR(
    'users',
    async () => getAllUsers(),
  );

  const {} = useSWR(
    'user',
    async () => createUser(newUserData),
  );

  const columns: ColumnsType<IUser> = useMemo(
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
            <Button type="link" onClick={() => handleEdit(record.id)}>Редактировать</Button>
            <Button type="link" danger onClick={() => handleDelete(record.id)}>Удалить</Button>
          </Space>
        ),
      }
    ],
    [users],
  );

  const handleDelete = async (id: number) => {
    try {
      const deletedUserData = await deleteUser(id)
      console.log(`Данные удаленного пользователя с id ${id}:`, deletedUserData);

      await mutate('users');
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      // получаем данные пользователя по его id
      const foundUserData = await getOneUserDataById(id);
      console.log(`Данные пользователя, найденного по его id ${id}:`, foundUserData);

      // открываем модальное окно
      showModal();

      // редактируем данные пользователя
      await editOneUserDataById(id, newUserData);

      await mutate('users');
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
      <Modal
        title="Создание нового пользователя"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FormContainer>
          <div>
            <label htmlFor="name">Имя: </label>
            <input
              name="name"
              value={form.values.name}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.name && form.touched.name && (
              <TextError>
                <div>{form.errors.name}</div>
              </TextError>
            )}
          </div>

          <div>
            <label htmlFor="lastName">Фамилия: </label>
            <input
              name="lastName"
              value={form.values.lastName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.lastName && form.touched.lastName && (
              <TextError>
                <div>{form.errors.lastName}</div>
              </TextError>
            )}
          </div>

          <div>
            <label htmlFor="age">Возраст: </label>
            <input
              name="age"
              value={form.values.age}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.age && form.touched.age && (
              <TextError>
                <div>{form.errors.age}</div>
              </TextError>
            )}
          </div>

          <div>
            <label htmlFor="phone">Телефон: </label>
            <input
              name="phone"
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.phone && form.touched.phone && (
              <TextError>
                <div>{form.errors.phone}</div>
              </TextError>
            )}
          </div>

          <div>
            <label htmlFor="email">Email: </label>
            <input
              name="email"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              disabled={!form.values.name || Boolean(form.errors.name)}
            />
            {form.errors.email && form.touched.email && (
              <TextError>
                <div>{form.errors.email}</div>
              </TextError>
            )}
          </div>

        </FormContainer>
      </Modal>
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
