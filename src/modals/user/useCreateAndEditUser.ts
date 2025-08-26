import * as Yup from "yup";
import { useFormik } from "formik";
import { mutate } from 'swr';
import { createUser, editUser } from '../../api/user';
import type { IUser } from "../../entities/user";

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

interface IUseCreateAndEditUser {
  user?: IUser;
  onClose: () => void;
}

export function useCreateAndEditUser({ user, onClose }: IUseCreateAndEditUser) {
  const form = useFormik({
    initialValues: {
      name: user?.name || '',
      lastName: user?.lastName || '',
      age: user?.age || '',
      phone: user?.phone || '',
      email: user?.email || ''
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

  async function handleOk() {
    if (!user?.id) {
      await createUser({
        name: form.values.name,
        lastName: form.values.lastName,
        age: form.values.age,
        phone: form.values.phone,
        email: form.values.email
      });
      await mutate('users');

      onClose();
    } else {
      try {
        await editUser({
          id: user?.id,
          name: form.values.name,
          lastName: form.values.lastName,
          age: form.values.age,
          phone: form.values.phone,
          email: form.values.email,
        });
        await mutate('users');

        onClose();
      } catch (error) {
        console.error('Ошибка при обновлении данных пользователя', error);
      }
    }
  };

  return {
    form,
    setFormValues,
    handleOk,
  }
};
