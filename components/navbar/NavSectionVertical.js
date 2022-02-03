import { styled } from '@mui/material/styles';
import { List, Box, ListSubheader } from '@mui/material';
import { v4 } from 'uuid';
import { NavListRoot } from './NavList';
import useUser from '../../hooks/useUser';

export const ListSubheaderStyle = styled(
  (props) => <ListSubheader disableSticky disableGutters {...props} />,
)(
  ({ theme }) => ({
    ...theme.typography.overline,
    paddingTop: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shorter,
    }),
  }),
);

export default function NavSectionVertical({ navConfig, ...other }) {
  const user = useUser();

  return (
    <Box {...other}>
      {navConfig.map((group) => {
        if (group.require?.authenticated && !user.isAuthenticated) {
          return null;
        }

        if (group.require?.unauthenticated && user.isAuthenticated) {
          return null;
        }

        if (group.require?.admin && !user.isAdmin) {
          return null;
        }

        return ((
          <List key={group.subheader || v4()} disablePadding sx={{ px: 2 }}>
            <ListSubheaderStyle>
              {group.subheader}
            </ListSubheaderStyle>

            {group.items.map((list) => (
              <NavListRoot key={list.title} list={list} />
            ))}
          </List>
        ));
      })}
    </Box>
  );
}
