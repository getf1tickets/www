import * as Yup from 'yup';
import { useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/router';
import {
  Card, Grid, Stack, Typography, InputAdornment,
} from '@mui/material';
import {
  FormProvider,
  RHFTextField,
  RHFEditor,
} from '../form';
import useNotification from '../../hooks/useNotification';
import { post } from '../../utils/AsyncApi';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export default function ProductNewForm({ isEdit, currentProduct }) {
  const notification = useNotification();
  const { push } = useRouter();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().moreThan(0, 'Price should not or more than $0.00'),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      price: currentProduct?.price || '',
    }),
    [currentProduct],
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = useCallback(async (data) => {
    const { error } = await post('/product', {
      ...data,
      images: ['https://sf2.auto-moto.com/wp-content/uploads/sites/9/2021/12/icon_010901_0247-e1639040980772.jpg'],
    });

    if (error) {
      notification.error(`An error occurred while ${isEdit ? 'editing' : 'creating'}, please try again.`);
      return;
    }

    notification.success(isEdit ? 'Update success!' : 'Create success!');
    push('/');
  }, [notification, isEdit, push]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Product Name" />

              <div>
                <LabelStyle>Description</LabelStyle>
                <RHFEditor simple name="description" />
              </div>
            </Stack>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="price"
                  label="Price"
                  placeholder="0.00"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                    type: 'number',
                  }}
                />
              </Stack>
            </Card>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? 'Create Product' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
