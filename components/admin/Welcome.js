import { styled, alpha } from '@mui/material/styles';
import {
  Typography, Card, CardContent,
} from '@mui/material';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

export default function AppWelcome({ displayName }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
        }}
      >
        <Typography gutterBottom variant="h4" sx={{ pt: { md: 4, xs: 1 } }}>
          Welcome back,
          {' '}
          {!displayName ? '...' : displayName}
          !
        </Typography>
      </CardContent>
    </RootStyle>
  );
}
