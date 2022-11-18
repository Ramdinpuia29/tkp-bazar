import { useQuasar } from 'quasar';

export default function useNotify() {
  const $q = useQuasar();

  const notifySuccess = (message: string) => {
    $q.notify({
      type: 'positive',
      message: message || 'Successful',
      timeout: 2000,
      actions: [
        {
          label: 'OK',
          color: 'white',
        },
      ],
    });
  };

  const notifyError = (message: string) => {
    $q.notify({
      type: 'negative',
      message: message || 'Something went wrong!',
      timeout: 2000,
      actions: [
        {
          label: 'OK',
          color: 'white',
        },
      ],
    });
  };

  const notifyWarning = (message: string) => {
    $q.notify({
      type: 'warning',
      message: message || 'Careful!',
      textColor: 'white',
      timeout: 2000,
      actions: [
        {
          label: 'OK',
          color: 'white',
        },
      ],
    });
  };
}
