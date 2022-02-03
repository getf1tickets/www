import { useFormContext, Controller } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import Editor from '../editor';

export default function RHFEditor({ name, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Editor
          id={name}
          value={field.value}
          onChange={field.onChange}
          error={!!error}
          helperText={(
            <FormHelperText error sx={{ px: 2, textTransform: 'capitalize' }}>
              {error?.message}
            </FormHelperText>
          )}
          {...other}
        />
      )}
    />
  );
}