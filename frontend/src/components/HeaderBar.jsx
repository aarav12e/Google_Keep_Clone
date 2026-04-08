import { useEffect, useRef } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import { Menu } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';

const Header = styled(AppBar)`
  z-index: 1201;
  position: fixed;
  height: 70px;
`;

const Heading = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-left: 14px;
  background: linear-gradient(135deg, oklch(var(--p)), oklch(var(--s)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const themeOptions = [
  { id: 'emerald', label: '🌿 Emerald', desc: 'Clean & Bright' },
  { id: 'night', label: '🌙 Night', desc: 'Dark Mode' },
  { id: 'cyberpunk', label: '⚡ Cyberpunk', desc: 'Neon Vibes' },
  { id: 'garden', label: '🌸 Garden', desc: 'Soft & Warm' },
];

const HeaderBar = ({ open, handleDrawer, currentTheme, setCurrentTheme }) => {
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
  }, []);

  return (
    <Header ref={headerRef} open={open} elevation={0} className="glass-header">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, height: '100%' }}>
        {/* Left: menu + logo + title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            onClick={handleDrawer}
            edge="start"
            aria-label="toggle drawer"
            className="theme-btn"
            sx={{ color: 'oklch(var(--bc))' }}
          >
            <Menu />
          </IconButton>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="oklch(var(--p))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 6 }}>
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <line x1="8" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="13" y2="14" />
          </svg>
          <Heading>Keep Clone</Heading>
        </Box>

        {/* Right: theme switcher */}
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-sm gap-2 normal-case theme-btn"
            style={{ fontFamily: 'Inter' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <span className="hidden sm:inline text-sm font-semibold">Theme</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content z-[9999] menu p-2 shadow-lg rounded-box w-56"
            style={{
              background: 'oklch(var(--b1))',
              border: '1px solid oklch(var(--bc) / 0.1)',
              backdropFilter: 'blur(20px)',
            }}
          >
            {themeOptions.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => setCurrentTheme(t.id)}
                  className={`flex items-center justify-between ${currentTheme === t.id ? 'active' : ''}`}
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: currentTheme === t.id ? 700 : 400,
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span>{t.label}</span>
                  </span>
                  <span className="text-xs opacity-50">{t.desc}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </Toolbar>
    </Header>
  );
};

export default HeaderBar;
