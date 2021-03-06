import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import Avatar from '../../components/Avatar';
import useUser from '../../hooks/useUser';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

export default function NavbarAccount() {
  const user = useUser();

  return (
    <NextLink href="/account/settings" passHref>
      <Link href underline="none" color="inherit">
        <RootStyle>
          <Avatar color="default" />

          <Box
            sx={{
              ml: 2,
              transition: (theme) => theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            }}
          >
            <Typography variant="subtitle2" noWrap>
              {user?.info?.name}
            </Typography>
            {/* <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
              {user?.role}
            </Typography> */}
          </Box>
        </RootStyle>
      </Link>
    </NextLink>
  );
}
