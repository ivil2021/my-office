import useSWR, { mutate } from 'swr';
import { deleteUser, getAllUsers } from '../../api/user';
import { useState } from 'react';
import type { IUser } from "../../entities/user.ts";
import { useModalController } from "../../hooks/useModalController.ts";

export function useUserTable() {
  const [selectedUser, setSelectedUser] = useState<IUser>();

  const createAndEditUserModalController = useModalController();

  const { data: users } = useSWR( 'users', getAllUsers );

  async function handleDelete(id: number) {
    try {
      await deleteUser({ id });
      await mutate('users');
    } catch (error) {
      console.error('Ошибка при удалении пользователя', error);
    }
  };

  return {
    handleDelete,
    users,
    selectedUser,
    setSelectedUser,
    createAndEditUserModalController,
  }
};
