import {
  ErrorIcon, InfoIcon, SuccessIcon, WarningIcon,
} from './CustomIcons';

export default function Alert({ palette, spacing }) {
  const isLight = palette.mode === 'light';

  const standardStyle = (color) => ({
    color: palette[color][isLight ? 'darker' : 'lighter'],
    backgroundColor: palette[color][isLight ? 'lighter' : 'darker'],
    '& .MuiAlert-icon': {
      color: palette[color][isLight ? 'main' : 'light'],
    },
  });

  const filledStyle = (color) => ({
    color: palette[color].contrastText,
  });

  const outlinedStyle = (color) => ({
    color: palette[color][isLight ? 'darker' : 'lighter'],
    border: `solid 1px ${palette[color][isLight ? 'light' : 'dark']}`,
    backgroundColor: palette[color][isLight ? 'lighter' : 'darker'],
    '& .MuiAlert-icon': {
      color: palette[color][isLight ? 'main' : 'light'],
    },
  });

  return {
    MuiAlert: {
      defaultProps: {
        iconMapping: {
          info: <InfoIcon />,
          success: <SuccessIcon />,
          warning: <WarningIcon />,
          error: <ErrorIcon />,
        },
      },

      styleOverrides: {
        message: {
          '& .MuiAlertTitle-root': {
            marginBottom: spacing(0.5),
          },
        },
        action: {
          '& button:not(:first-of-type)': {
            marginLeft: spacing(1),
          },
        },

        standardInfo: standardStyle('info'),
        standardSuccess: standardStyle('success'),
        standardWarning: standardStyle('warning'),
        standardError: standardStyle('error'),

        filledInfo: filledStyle('info'),
        filledSuccess: filledStyle('success'),
        filledWarning: filledStyle('warning'),
        filledError: filledStyle('error'),

        outlinedInfo: outlinedStyle('info'),
        outlinedSuccess: outlinedStyle('success'),
        outlinedWarning: outlinedStyle('warning'),
        outlinedError: outlinedStyle('error'),
      },
    },
  };
}
