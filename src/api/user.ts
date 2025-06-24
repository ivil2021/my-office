import axios from 'axios';
import type { IDataType } from '../entities/UserTable';

export async function getAllUsers(){
  try {
    const response = await axios.get<IDataType[]>('https://68586580138a18086dfadfb1.mockapi.io/users');

    return response.data;
  } catch (error) {
    throw new Error('Ошибка');
  }
}
