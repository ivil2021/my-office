import axios from 'axios';

export async function getAllClients() {
  try {
    const response = await axios.get('https://68586580138a18086dfadfb1.mockapi.io/clients');

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при запросе данных всех клиентов');
  }
}

interface ICreateClient {
  name: string;
  lastName: string;
  age: string;
  phone: string;
  email: string;
}

export async function createClient({ name, lastName, age, phone, email }: ICreateClient) {
  try {
    const response = await axios.post(
      'https://68586580138a18086dfadfb1.mockapi.io/clients',
      { name, lastName, age, phone, email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при создании клиента');
  }
}

interface IDeleteClient {
  id: number;
}

export async function deleteClient({ id }: IDeleteClient) {
  try {
    const response = await axios.delete(`https://68586580138a18086dfadfb1.mockapi.io/clients/${id}`);

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при удалении клиента');
  }
}

interface IEditClient {
  id: number;
  name: string;
  lastName: string;
  age: string;
  phone: string;
  email: string;
}

export async function editClient({ id, name, lastName, age, phone, email }: IEditClient) {
  try {
    const response = await axios.put(`https://68586580138a18086dfadfb1.mockapi.io/clients/${id}`,
      { name, lastName, age, phone, email },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Ошибка при обновлении данных клиента');
  }
}
