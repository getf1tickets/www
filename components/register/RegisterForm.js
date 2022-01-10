import * as Yup from 'yup';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Stack, IconButton, InputAdornment, Alert,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import Iconify from '../Iconify';
import { FormProvider, RHFTextField } from '../form';
import { post } from '../../utils/AsyncApi';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required('First name required'),
    lastName: Yup.string().required('Last name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    resetField,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = useCallback(async (data) => {
    const r = await post('/user', data);
    const { error, status } = r;

    if (error) {
      resetField('password');
      let errorMessage;

      if (status === 409) {
        errorMessage = 'This email address is already taken. Please try another email address.';
      } else {
        errorMessage = 'Server error, please try again.';
      }

      setError('afterSubmit', { message: errorMessage });
      return;
    }

    router.push({
      pathname: '/login',
      query: { na: true },
    });
  }, [router, resetField, setError]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="firstName" label="First name" />
          <RHFTextField name="lastName" label="Last name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
