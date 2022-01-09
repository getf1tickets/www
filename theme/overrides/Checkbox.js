import { CheckboxIcon, CheckboxCheckedIcon, CheckboxIndeterminateIcon } from './CustomIcons';

export default function Checkbox({ palette, spacing }) {
  return {
    MuiCheckbox: {
      defaultProps: {
        icon: <CheckboxIcon />,
        checkedIcon: <CheckboxCheckedIcon />,
        indeterminateIcon: <CheckboxIndeterminateIcon />,
      },

      styleOverrides: {
        root: {
          padding: spacing(1),
          '&.Mui-checked.Mui-disabled, &.Mui-disabled': {
            color: palette.action.disabled,
          },
          '& .MuiSvgIcon-fontSizeMedium': {
            width: 24,
            height: 24,
          },
          '& .MuiSvgIcon-fontSizeSmall': {
            width: 20,
            height: 20,
          },
          svg: {
            fontSize: 24,
            '&[font-size=small]': {
              fontSize: 20,
            },
          },
        },
      },
    },
  };
}
