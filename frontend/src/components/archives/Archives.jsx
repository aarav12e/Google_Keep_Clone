import { useContext, useEffect, useRef } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';

import { DataContext } from '../../context/DataProvider';

//components
import Archive from './Archive';

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Archives = () => {
  const { archiveNotes } = useContext(DataContext);
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current && archiveNotes.length > 0) {
      const cards = gridRef.current.querySelectorAll('.archive-grid-item');
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      );
    }
  }, [archiveNotes.length]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ p: { xs: 1, sm: 3 }, width: '100%' }}>
        <DrawerHeader />

        {archiveNotes.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, px: 1 }}>
            <div
              className="badge badge-secondary badge-sm"
              style={{ fontFamily: 'Inter', fontWeight: 600 }}
            >
              {archiveNotes.length} Archived
            </div>
            <div
              style={{ flex: 1, height: 1, background: 'oklch(var(--bc) / 0.08)' }}
            />
          </Box>
        )}

        <Grid container ref={gridRef}>
          {archiveNotes.map((archive) => (
            <Grid item key={archive.id} className="archive-grid-item">
              <Archive archive={archive} />
            </Grid>
          ))}
        </Grid>

        {archiveNotes.length === 0 && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mt: '18vh',
            }}
          >
            <Typography
              sx={{
                color: 'oklch(var(--bc) / 0.4)',
                fontSize: '1.1rem',
                fontWeight: 500,
                fontFamily: 'Inter',
              }}
            >
              No archived notes
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Archives;