import axios from 'axios';
import type { IUser } from '../entities/User';

export async function getAllUsers() {
  try {
    const response = await axios.get<IUser[]>('https://68586580138a18086dfadfb1.mockapi.io/users');

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при запросе данных всех пользователей');
  }
}

export interface ICreateUser {
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

export interface IDeleteUser {
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

export async function getOneUser(id: number) {
  try {
    const response = await axios.get(`https://68586580138a18086dfadfb1.mockapi.io/users/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при получении данных одного пользователя по его id');
  }
}

export async function editOneUser(id: number, editedUserData: IUser) {
  try {
    const response = await axios.put(`https://68586580138a18086dfadfb1.mockapi.io/users/${id}`,
      editedUserData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при обновлении данных пользователя');
  }
}
