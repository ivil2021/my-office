import * as Yup from "yup";
import { useFormik } from "formik";
import useSWR, { mutate } from 'swr';
import { getAllUsers, createUser, editUser } from '../../api/user';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Имя должно быть не меньше 3 символов!')
    .max(20, 'Имя слишком длинное!')
    .required('Имя обязательно'),
  lastName: Yup.string()
    .min(3, 'Фамилия должна быть не меньше 3 символов!')
    .max(20, 'Фамилия слишком длинная!')
    .required('Фамилия обязательна'),
  age: Yup.string()
    .min(1, 'Возраст должен быть не меньше 1 символов!')
    .max(3, 'Возраст слишком длинный!')
    .required('Возраст обязателен'),
  phone: Yup.string()
    .min(11, 'Номер телефона должен быть не меньше 11 символов!')
    .max(11, 'Номер телефона должен быть не больше 11 символов!')
    .required('Номер телефона обязателен'),
  email: Yup.string()
    .email('Неверный формат email')
    .required('Email обязателен')
});

export function useCreateAndEditUser() {
  const [editingUserId, setEditingUserId] = useState<number | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const form = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      age: '',
      phone: '',
      email: ''
    },
    onSubmit: () => {},
    validationSchema
  });

  const setFormValues = (
    newValues: {
      name: string;
      lastName: string;
      age: string;
      phone: string;
      email: string;
    }) => {
    form.setValues(newValues);
  };

  const { data: users } = useSWR( 'users', getAllUsers );

  async function handleOk() {
    if (!editingUserId) {
      await createUser({
        name: form.values.name,
        lastName: form.values.lastName,
        age: form.values.age,
        phone: form.values.phone,
        email: form.values.email
      });
      await mutate('users');

      hideModal();
    } else {
      try {
        await editUser({
          id: editingUserId,
          name: form.values.name,
          lastName: form.values.lastName,
          age: form.values.age,
          phone: form.values.phone,
          email: form.values.email,
        });
        await mutate('users');

        setEditingUserId(null);
        hideModal();
      } catch (error) {
        console.error('Ошибка при обновлении данных пользователя', error);
      }
    }
  };

  function handleCancel() {
    setEditingUserId(null);
    hideModal();
  };

  return {
    form,
    setFormValues,
    users,
    handleOk,
    showModal,
    isModalOpen,
    handleCancel
  }
};
