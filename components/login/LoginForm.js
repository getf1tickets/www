import * as Yup from 'yup';
import { useState, useCallback } from 'react';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import {
  Link, Stack, Alert, IconButton, InputAdornment,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { yupResolver } from '@hookform/resolvers/yup';
import Iconify from '../Iconify';
import { FormProvider, RHFTextField } from '../form';
import useUser from '../../hooks/useUser';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { getAuthEntity } = useUser();
  const router = useRouter();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    resetField,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = useCallback(async (data) => {
    const { success, error } = await getAuthEntity(data.email, data.password);

    if (!success) {
      resetField('password');
      setError('afterSubmit', { message: error });
      return;
    }

    router.push(router.query.redirect || '/');
  }, [router, getAuthEntity, resetField, setError]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!router.query?.na && !errors.afterSubmit && !isSubmitting && <Alert severity="success">Thanks for registering! You can now login to your account.</Alert>}
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <RHFTextField name="email" label="Email address" autoComplete="email" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <RHFCheckbox name="remember" label="Remember me" /> */}
        <NextLink href="/reset" passHref>
          <Link href variant="subtitle2">Forgot password?</Link>
        </NextLink>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
