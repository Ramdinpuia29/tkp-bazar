import { useQuasar } from 'quasar';

export default function useDialog() {
  const $q = useQuasar();

  function dialogShow(title: string, message: string) {
    return $q.dialog({
      title: title || 'Confirmation',
      message: message || 'Dialog Message',
      cancel: true,
      persistent: true,
    });
  }

  return {
    dialogShow,
  };
}
