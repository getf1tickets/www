import { useCallback } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box, Stack, Dialog, Button, Divider, DialogTitle, DialogContent, DialogActions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {
  FormProvider, RHFSelect, RHFTextField, RHFRadioGroup,
} from '../form';
import useUser from '../../hooks/useUser';

export default function CheckoutNewAddressForm({
  open, onClose,
}) {
  const { addAddress } = useUser();

  const NewAddressSchema = Yup.object().shape({
    fullName: Yup.string().required('Fullname is required'),
    phoneNumber: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    zip: Yup.string().required('Zip is required'),
  });

  const defaultValues = {
    type: 'Home',
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    country: 'France',
    zip: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods;

  const onSubmit = useCallback(async (data) => {
    await addAddress({ ...data, type: `${data.type}`.toLocaleLowerCase() });
    reset();
    onClose();
  }, [addAddress, onClose, reset]);

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle>Add new address</DialogTitle>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={3}>
            <RHFRadioGroup name="type" options={['Home', 'Office']} />

            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="fullName" label="Full Name" />
              <RHFTextField name="phoneNumber" label="Phone Number" />
            </Box>

            <RHFTextField name="address" label="Address" />

            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
              }}
            >
              <RHFTextField name="city" label="Town / City" />
              <RHFTextField name="state" label="State" />
              <RHFTextField name="zip" label="Zip / Postal Code" />
            </Box>

            <RHFSelect name="country" label="Country">
              {/* {countries.map((option) => (
                <option key={option.code} value={option.label}>
                  {option.label}
                </option>
              ))} */}
              <option value="France">
                France
              </option>
            </RHFSelect>
          </Stack>
        </DialogContent>

        <Divider />

        <DialogActions>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Add this billing address
          </LoadingButton>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
