import { useCallback } from 'react';

export function useHandleCancel({ setEditingUserId, hideModal }: any) {
  const handleCancel = useCallback(() => {
    setEditingUserId(null);
    hideModal();
  }, [setEditingUserId, hideModal]);

  return handleCancel;
}
