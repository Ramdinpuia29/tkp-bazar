import { useQuasar } from 'quasar';

export default function useDetectPlatform() {
  const $q = useQuasar();

  function mobilePlatform() {
    if ($q.platform.is.mobile) return true;
  }

  function iosPlatform() {
    if ($q.platform.is.ios) return true;
  }

  function androidPlatform() {
    if ($q.platform.is.android) return true;
  }
  function desktopPlatform() {
    if ($q.platform.is.desktop) return true;
  }

  return {
    mobilePlatform,
    iosPlatform,
    androidPlatform,
    desktopPlatform,
  };
}
