import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Stack, Card, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { FormProvider, RHFTextField } from '../form';

export default function AccountChangePassword() {
  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack sx={{ pb: 4 }} spacing={3} alignItems="flex-start">
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            Change password
          </Typography>
        </Stack>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="oldPassword" type="password" label="Old Password" autoComplete="current-password" />

          <RHFTextField name="newPassword" type="password" label="New Password" autoComplete="new-password" />

          <RHFTextField name="confirmNewPassword" type="password" label="Confirm New Password" autoComplete="new-password" />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
