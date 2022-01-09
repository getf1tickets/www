import { CloseIcon } from './CustomIcons';

export default function Chip({ palette }) {
  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: <CloseIcon />,
      },

      styleOverrides: {
        colorDefault: {
          '& .MuiChip-avatarMedium, .MuiChip-avatarSmall': {
            color: palette.text.secondary,
          },
        },
        outlined: {
          borderColor: palette.grey[500_32],
          '&.MuiChip-colorPrimary': {
            borderColor: palette.primary.main,
          },
          '&.MuiChip-colorSecondary': {
            borderColor: palette.secondary.main,
          },
        },
        //
        avatarColorInfo: {
          color: palette.info.contrastText,
          backgroundColor: palette.info.dark,
        },
        avatarColorSuccess: {
          color: palette.success.contrastText,
          backgroundColor: palette.success.dark,
        },
        avatarColorWarning: {
          color: palette.warning.contrastText,
          backgroundColor: palette.warning.dark,
        },
        avatarColorError: {
          color: palette.error.contrastText,
          backgroundColor: palette.error.dark,
        },
      },
    },
  };
}
