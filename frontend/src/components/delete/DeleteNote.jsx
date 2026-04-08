import { useContext, useRef, useEffect } from 'react';

import { Card, CardContent, CardActions, Typography, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { DataContext } from '../../context/DataProvider';

gsap.registerPlugin(ScrollTrigger);

const StyledCard = styled(Card)`
  border-radius: 16px;
  width: 260px;
  margin: 8px;
  background: oklch(var(--b1));
  border: 1px solid oklch(var(--bc) / 0.08);
  box-shadow: 0 4px 24px oklch(var(--bc) / 0.06);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.35s ease,
              border-color 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 20px 50px oklch(var(--bc) / 0.12);
    border-color: oklch(var(--a) / 0.3);
  }
`;

const DeleteNote = ({ deleteNote }) => {
  const { restoreNote, permanentlyDelete } = useContext(DataContext);
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (el) {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, []);

  return (
    <div ref={cardRef}>
      <StyledCard>
        <CardContent sx={{ pb: 1 }}>
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: '0.95rem',
              color: 'oklch(var(--bc))',
              mb: 0.5,
            }}
          >
            {deleteNote.heading}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '0.85rem',
              color: 'oklch(var(--bc) / 0.7)',
              lineHeight: 1.6,
            }}
          >
            {deleteNote.text}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', px: 1.5, pb: 1 }}>
          <Tooltip title="Delete Permanently" arrow>
            <IconButton
              size="small"
              onClick={() => permanentlyDelete(deleteNote)}
              sx={{
                color: 'oklch(var(--bc) / 0.5)',
                '&:hover': {
                  color: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Restore" arrow>
            <IconButton
              size="small"
              onClick={() => restoreNote(deleteNote)}
              sx={{
                color: 'oklch(var(--bc) / 0.5)',
                '&:hover': {
                  color: 'oklch(var(--su))',
                  backgroundColor: 'oklch(var(--su) / 0.1)',
                },
              }}
            >
              <Restore fontSize="small" />
            </IconButton>
          </Tooltip>
        </CardActions>
      </StyledCard>
    </div>
  );
};

export default DeleteNote;