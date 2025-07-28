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

export async function createUser(newUser: IUser) {
  try {
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
    const response = await axios.get<IUser[]>(`https://68586580138a18086dfadfb1.mockapi.io/users/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при получении данных одного пользователя по его id');
  }
}

export async function editOneUserDataById(id: number, editedUserData: IUser) {
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
