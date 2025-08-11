import { useCallback } from 'react';
import { mutate } from 'swr';
import { deleteUser } from '../../api/user';

export function useUserActions() {
  const handleDelete = useCallback(async (id: number) => {
    try {
      await deleteUser({ id });
      await mutate('users');
    } catch (error) {
      console.error('Ошибка при удалении пользователя', error);
    }
  }, []);

  return {
    handleDelete,
  };
}
