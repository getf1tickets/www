import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const success = useCallback((content, opts) => {
    enqueueSnackbar(content, {
      variant: 'success',
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top',
      },
      ...opts,
    });
  }, [enqueueSnackbar]);

  const error = useCallback((content, opts) => {
    enqueueSnackbar(content, {
      variant: 'error',
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top',
      },
      ...opts,
    });
  }, [enqueueSnackbar]);

  return {
    success,
    error,
  };
};

export default useNotification;
