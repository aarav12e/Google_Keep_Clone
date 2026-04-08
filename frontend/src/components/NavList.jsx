import { useEffect, useRef } from 'react';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  LightbulbOutlined as Lightbulb,
  ArchiveOutlined as Archive,
  DeleteOutlineOutlined as Delete,
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';

const NavList = () => {
  const listRef = useRef(null);

  const navList = [
    { id: 1, name: 'Notes', icon: <Lightbulb />, route: '/' },
    { id: 2, name: 'Archives', icon: <Archive />, route: '/archive' },
    { id: 3, name: 'Trash', icon: <Delete />, route: '/delete' },
  ];

  useEffect(() => {
    if (listRef.current) {
      const items = listRef.current.querySelectorAll('.nav-item');
      gsap.fromTo(
        items,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    }
  }, []);

  return (
    <List ref={listRef} sx={{ px: 1, pt: 1 }}>
      {navList.map((list) => (
        <ListItem
          button
          key={list.id}
          component={NavLink}
          to={list.route}
          className="nav-item"
          sx={{
            color: 'oklch(var(--bc))',
            borderRadius: '12px',
            mb: 0.5,
            py: 1.2,
            px: 2,
            transition: 'all 0.25s ease',
            '&:hover': {
              backgroundColor: 'oklch(var(--p) / 0.08)',
              transform: 'translateX(4px)',
            },
            '&.active': {
              backgroundColor: 'oklch(var(--p) / 0.12)',
              color: 'oklch(var(--p))',
              fontWeight: 700,
              '& .MuiListItemIcon-root': {
                color: 'oklch(var(--p))',
              },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
            {list.icon}
          </ListItemIcon>
          <ListItemText
            primary={list.name}
            primaryTypographyProps={{
              fontWeight: 500,
              fontSize: '0.93rem',
              fontFamily: 'Inter',
            }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default NavList;