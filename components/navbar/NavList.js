import { useState } from 'react';
import { useRouter } from 'next/router';
import { List, Collapse } from '@mui/material';
import { NavItemRoot, NavItemSub } from './NavItem';

export function getActive(path, pathname, asPath) {
  return path === '/'
    ? (path === pathname || path === asPath)
    : pathname.includes(path) || asPath.includes(path);
}

export function NavListRoot({ list }) {
  const { pathname, asPath } = useRouter();

  const active = getActive(list.path, pathname, asPath);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemRoot
          item={list}
          active={active}
          open={open}
          onOpen={() => setOpen(!open)}
        />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {(list.children || []).map((item) => (
              <NavListSub key={item.title} list={item} />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return <NavItemRoot item={list} active={active} />;
}

function NavListSub({ list }) {
  const { pathname, asPath } = useRouter();

  const active = getActive(list.path, pathname, asPath);

  const [open, setOpen] = useState(active);

  const hasChildren = list.children;

  if (hasChildren) {
    return (
      <>
        <NavItemSub item={list} onOpen={() => setOpen(!open)} open={open} active={active} />

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 3 }}>
            {(list.children || []).map((item) => (
              <NavItemSub
                key={item.title}
                item={item}
                active={getActive(item.path, pathname, asPath)}
              />
            ))}
          </List>
        </Collapse>
      </>
    );
  }

  return <NavItemSub item={list} active={active} />;
}
