import axios from 'axios';

export async function getAllUsers() {
  try {
    const response = await axios.get('https://68586580138a18086dfadfb1.mockapi.io/users');

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при запросе данных всех пользователей');
  }
}

interface ICreateUser {
  name: string;
  lastName: string;
  age: string;
  phone: string;
  email: string;
}

export async function createUser({ name, lastName, age, phone, email }: ICreateUser) {
  try {
    const response = await axios.post(
      'https://68586580138a18086dfadfb1.mockapi.io/users',
      { name, lastName, age, phone, email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при создании пользователя');
  }
}

interface IDeleteUser {
  id: number;
}

export async function deleteUser({ id }: IDeleteUser) {
  try {
    const response = await axios.delete(`https://68586580138a18086dfadfb1.mockapi.io/users/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при удалении пользователя');
  }
}

interface IGetOneUser {
  id: number;
}

export async function getOneUser({ id }: IGetOneUser) {
  try {
    const response = await axios.get(`https://68586580138a18086dfadfb1.mockapi.io/users/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при получении данных одного пользователя');
  }
}

interface IEditUser {
  id: number;
  name: string;
  lastName: string;
  age: string;
  phone: string;
  email: string;
}

export async function editUser({ id, name, lastName, age, phone, email }: IEditUser) {
  try {
    const response = await axios.put(`https://68586580138a18086dfadfb1.mockapi.io/users/${id}`,
      { name, lastName, age, phone, email },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при обновлении данных пользователя');
  }
}
