import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';

//components
import HeaderBar from './HeaderBar';
import NavList from './NavList';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
  minHeight: '70px !important',
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {
        ...openedMixin(theme),
        background: 'oklch(var(--b1) / 0.65)',
        backdropFilter: 'blur(28px) saturate(1.5)',
        borderRight: '1px solid oklch(var(--bc) / 0.06)',
      },
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {
        ...closedMixin(theme),
        background: 'oklch(var(--b1) / 0.65)',
        backdropFilter: 'blur(28px) saturate(1.5)',
        borderRight: '1px solid oklch(var(--bc) / 0.06)',
      },
    }),
  })
);

function SwipeDrawer({ currentTheme, setCurrentTheme, children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <HeaderBar
        open={open}
        handleDrawer={handleDrawer}
        currentTheme={currentTheme}
        setCurrentTheme={setCurrentTheme}
      />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <NavList />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 1.5, sm: 3 },
          mt: '70px',
          width: '100%',
          minHeight: 'calc(100vh - 70px)',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ml: open ? `${drawerWidth}px` : `calc(${theme.spacing(7)} + 1px)`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default SwipeDrawer;
