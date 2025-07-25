import axios from 'axios';
import type { IUser } from '../entities/User';

export async function getAllUsers() {
  try {
    console.log('getAllUsers was started');
    const response = await axios.get<IUser[]>('https://68586580138a18086dfadfb1.mockapi.io/users');

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при запросе всех пользователей');
  }
}

export async function createUser(newUser: IUser) {
  try {
    console.log('createUser was started');
    const response = await axios.post<IUser>(
      'https://68586580138a18086dfadfb1.mockapi.io/users',
      newUser,
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

export async function deleteUser(id: number) {
  console.log('getAllUsers was started');
  const response = await fetch(`https://68586580138a18086dfadfb1.mockapi.io/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Ошибка при удалении пользователя');
  }

  return response.json();
}

export async function getOneUserDataById(id: number) {
  try {
    console.log('getOneUserDataById was started');
    const response = await axios.get<IUser[]>(`https://68586580138a18086dfadfb1.mockapi.io/users/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при получении данных одного пользователя по его id');
  }
}

export async function editOneUserDataById(id: number, newUser: IUser) {
  console.log('editOneUserDataById was started');
  try {
    const response = await axios.put(`https://68586580138a18086dfadfb1.mockapi.io/users/${id}`,
      newUser,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при обновлении пользователя');
  }
}