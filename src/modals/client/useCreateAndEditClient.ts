import * as Yup from "yup";
import { useFormik } from "formik";
import { mutate } from 'swr';
import { createClient, editClient } from '../../api/client';
import type { IClient } from "../../entities/client";

const noSpecialSymbolsRegex = /^[a-zA-Z0-9]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Имя должно быть не меньше 3 символов!')
    .max(20, 'Имя слишком длинное!')
    .matches(noSpecialSymbolsRegex, 'Имя не должно содержать специальных символов')
    .required('Имя обязательно'),
  lastName: Yup.string()
    .min(3, 'Фамилия должна быть не меньше 3 символов!')
    .max(20, 'Фамилия слишком длинная!')
    .matches(noSpecialSymbolsRegex, 'Фамилия не должна содержать специальных символов')
    .required('Фамилия обязательна'),
  age: Yup.string()
    .min(1, 'Возраст должен быть не меньше 1 символов!')
    .max(3, 'Возраст слишком длинный!')
    .matches(noSpecialSymbolsRegex, 'Возраст не должен содержать специальных символов')
    .required('Возраст обязателен'),
  phone: Yup.string()
    .min(11, 'Номер телефона должен быть не меньше 11 символов!')
    .max(11, 'Номер телефона должен быть не больше 11 символов!')
    .matches(noSpecialSymbolsRegex, 'Номер телефона не должен содержать специальных символов')
    .required('Номер телефона обязателен'),
  email: Yup.string()
    .matches(emailRegex, 'Некорректный формат email')
    .required('Email обязателен')
});

interface IUseCreateAndEditClient {
  client?: IClient;
  onClose: () => void;
}

export function useCreateAndEditClient({ client, onClose }: IUseCreateAndEditClient) {
  const form = useFormik({
    initialValues: {
      name: client?.name || '',
      lastName: client?.lastName || '',
      age: client?.age || '',
      phone: client?.phone || '',
      email: client?.email || ''
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
    if (!client?.id) {
      try {
        await createClient({
          name: form.values.name,
          lastName: form.values.lastName,
          age: form.values.age,
          phone: form.values.phone,
          email: form.values.email
        });
        await mutate('clients');

        onClose();
      } catch (error) {
        console.error('Ошибка при создании клиента', error);
      }
    } else {
      try {
        await editClient({
          id: client?.id,
          name: form.values.name,
          lastName: form.values.lastName,
          age: form.values.age,
          phone: form.values.phone,
          email: form.values.email,
        });
        await mutate('clients');

        onClose();
      } catch (error) {
        console.error('Ошибка при обновлении данных клиента', error);
      }
    }
  };

  return {
    form,
    setFormValues,
    handleOk
  }
};
