import { useCallback } from 'react';
import { getOneUser } from '../../api/user';

export function useUserEdit({ setFormValues, setEditingUserId, showModal }: any) {
  const handleEdit = useCallback(async (id: number) => {
    try {
      const userData = await getOneUser({ id });
      setFormValues(userData);
      setEditingUserId(id);
      showModal();
    } catch (error) {
      console.error('Ошибка при редактировании данных пользователя', error);
    }
  }, [setFormValues, setEditingUserId, showModal]);

  return { handleEdit };
}