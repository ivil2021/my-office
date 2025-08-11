import { useCallback } from 'react';
import { mutate } from 'swr';

export function useHandleOk({ form, setEditingUserId, hideModal, mutateKey = 'users', createUser, editUser }: any) {
  const handleOk = useCallback(async () => {
    if (!form || !form.values) return;

    if (!form.values.id) {
      await createUser({
        name: form.values.name,
        lastName: form.values.lastName,
        age: form.values.age,
        phone: form.values.phone,
        email: form.values.email,
      });
      await mutate(mutateKey);
      hideModal();
    } else {
      try {
        await editUser({
          id: form.values.id,
          name: form.values.name,
          lastName: form.values.lastName,
          age: form.values.age,
          phone: form.values.phone,
          email: form.values.email,
        });
        await mutate(mutateKey);
        setEditingUserId(null);
        hideModal();
      } catch (error) {
        console.error('Ошибка при обновлении данных пользователя', error);
      }
    }
  }, [form, createUser, editUser, mutate, hideModal, setEditingUserId, mutateKey]);

  return handleOk;
}