import useSWR, { mutate } from 'swr';
import { deleteClient, getAllClients } from '../../api/client.ts';
import { useState } from 'react';
import type { IClient } from "../../entities/client.ts";
import { useModalController } from "../../hooks/useModalController.ts";

export function useClientTable() {
  const [selectedClient, setSelectedClient] = useState<IClient>();

  const createAndEditClientModalController = useModalController();

  const { data: clients, isValidating: isClientsLoading } = useSWR( 'clients', getAllClients );

  async function handleDelete(id: number) {
    try {
      await deleteClient({ id });
      await mutate('clients');
    } catch (error) {
      console.error('Ошибка при удалении клиента', error);
    }
  };

  return {
    handleDelete,
    clients,
    selectedClient,
    setSelectedClient,
    createAndEditClientModalController,
    isClientsLoading
  }
};
