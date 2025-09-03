import { Modal } from 'antd';
import { FormContainer, TextError } from './index.styles';
import { useCreateAndEditClient } from "../../modals/client/useCreateAndEditClient";
import type { IClient } from "../../entities/client";

interface ICreateAndEditClientProps {
  client?: IClient;
  open: boolean;
  onClose: () => void;
}

export function CreateAndEditClient({
  client,
  open,
  onClose
}: ICreateAndEditClientProps) {
  const { form, handleOk } = useCreateAndEditClient({ client, onClose });

  return (
    <Modal
      title={`${client?.id ? 'Редактирование' : 'Создание'} клиента`}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
    >
      <FormContainer>
        <div>
          <label htmlFor="name">Имя: </label>
          <input
            name="name"
            value={form.values.name}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.name && form.touched.name && (
            <TextError>
              <div>{form.errors.name}</div>
            </TextError>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Фамилия: </label>
          <input
            name="lastName"
            value={form.values.lastName}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.lastName && form.touched.lastName && (
            <TextError>
              <div>{form.errors.lastName}</div>
            </TextError>
          )}
        </div>

        <div>
          <label htmlFor="age">Возраст: </label>
          <input
            name="age"
            value={form.values.age}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.age && form.touched.age && (
            <TextError>
              <div>{form.errors.age}</div>
            </TextError>
          )}
        </div>

        <div>
          <label htmlFor="phone">Телефон: </label>
          <input
            name="phone"
            value={form.values.phone}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
          />
          {form.errors.phone && form.touched.phone && (
            <TextError>
              <div>{form.errors.phone}</div>
            </TextError>
          )}
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            name="email"
            value={form.values.email}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            disabled={!form.values.name || Boolean(form.errors.name)}
          />
          {form.errors.email && form.touched.email && (
            <TextError>
              <div>{form.errors.email}</div>
            </TextError>
          )}
        </div>
      </FormContainer>
    </Modal>
  );
}
