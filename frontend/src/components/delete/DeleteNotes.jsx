import { useContext, useEffect, useRef } from 'react';

import { Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { gsap } from 'gsap';

import { DataContext } from '../../context/DataProvider';

//components
import DeleteNote from './DeleteNote';

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const DeleteNotes = () => {
  const { deleteNotes } = useContext(DataContext);
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current && deleteNotes.length > 0) {
      const cards = gridRef.current.querySelectorAll('.delete-grid-item');
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }
      );
    }
  }, [deleteNotes.length]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ p: { xs: 1, sm: 3 }, width: '100%' }}>
        <DrawerHeader />

        {deleteNotes.length > 0 && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, px: 1 }}>
            <div
              className="badge badge-error badge-sm"
              style={{ fontFamily: 'Inter', fontWeight: 600 }}
            >
              {deleteNotes.length} in Trash
            </div>
            <div
              style={{ flex: 1, height: 1, background: 'oklch(var(--bc) / 0.08)' }}
            />
          </Box>
        )}

        <Grid container ref={gridRef}>
          {deleteNotes.map((deleteNote) => (
            <Grid item key={deleteNote.id} className="delete-grid-item">
              <DeleteNote deleteNote={deleteNote} />
            </Grid>
          ))}
        </Grid>

        {deleteNotes.length === 0 && (
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
              Trash is empty
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DeleteNotes;