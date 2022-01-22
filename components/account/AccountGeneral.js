import * as Yup from 'yup';
import { useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Card, Stack, Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useUser from '../../hooks/useUser';
import {
  FormProvider, RHFSelect, RHFTextField,
} from '../form';
import { post } from '../../utils/AsyncApi';
import useNotification from '../../hooks/useNotification';

export default function AccountGeneral() {
  const { email, info } = useUser();
  const notification = useNotification();

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
  });

  const defaultValues = useMemo(() => ({
    name: info?.name || '',
    email: email || '',
    phoneNumber: info?.phoneNumber || '',
    country: info?.country || '',
    address: info?.address || '',
    state: info?.state || '',
    city: info?.city || '',
    zip: info?.zip || '',
  }), [email, info]);

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    setValue('name', info?.name || '');
    setValue('email', email || '');
    setValue('phoneNumber', info?.phoneNumber || '');
    setValue('country', info?.country || '');
    setValue('address', info?.address || '');
    setValue('state', info?.state || '');
    setValue('city', info?.city || '');
    setValue('zip', info?.zip || '');
  }, [setValue, info, email]);

  const onSubmit = async (data) => {
    const { error } = await post('/user/@me', {
      info: { ...data, email: undefined },
    });

    if (error) {
      notification.error('An error occurred while changing your settings');
      return;
    }

    notification.success('User settings changed');
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack sx={{ pb: 4 }} spacing={3} alignItems="flex-start">
          <Typography variant="overline" sx={{ color: 'text.secondary' }}>
            Account information
          </Typography>
        </Stack>
        <Box
          sx={{
            display: 'grid',
            rowGap: 3,
            columnGap: 2,
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
          }}
        >
          <RHFTextField name="name" label="Name" />
          <RHFTextField disabled name="email" label="Email Address" />

          <RHFTextField name="phoneNumber" label="Phone Number" />
          <RHFTextField name="address" label="Address" />

          <RHFSelect name="country" label="Country" placeholder="Country">
            {/* <option value="" /> */}
            <option value="fr">
              France
            </option>
          </RHFSelect>

          <RHFTextField name="state" label="State/Region" />

          <RHFTextField name="city" label="City" />
          <RHFTextField name="zip" label="Zip/Code" />
        </Box>

        <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Save Changes
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
}
