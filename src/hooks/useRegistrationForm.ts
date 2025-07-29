import * as Yup from "yup";
import { useFormik } from "formik";

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

export function useRegistrationForm() {
  const form = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      age: '',
      phone: '',
      email: ''
    },
    onSubmit: () => {},
    validationSchema,
  });

  const setFormValues = (newValues: { name: string; lastName: string; age: string; phone: string; email: string; }) => {
    form.setValues(newValues);
  };

  return {
    form,
    setFormValues
  }
}
