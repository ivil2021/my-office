import { useState } from 'react';
import { useRegistrationForm } from "../../hooks/useRegistrationForm";

export function useUserModal() {
  const { setFormValues } = useRegistrationForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);

  const handleCreate = () => {
    setFormValues({ name: '', lastName: '', age: '', phone: '', email: '' });
    showModal();
  };

  return {
    isModalOpen,
    showModal,
    hideModal,
    handleCreate,
  };
}
