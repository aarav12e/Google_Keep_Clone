import { useEffect, useRef } from 'react';
import { LightbulbOutlined as Lightbulb } from '@mui/icons-material';
import { Typography, Box, styled } from '@mui/material';
import { gsap } from 'gsap';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18vh;
  user-select: none;
`;

const EmptyNotes = () => {
  const iconRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Floating animation for the icon
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        y: -18,
        duration: 2.5,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
      });

      gsap.fromTo(
        iconRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)', delay: 0.2 }
      );
    }

    // Text entrance
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  return (
    <Container ref={containerRef}>
      <div ref={iconRef}>
        <Lightbulb
          sx={{
            fontSize: 120,
            color: 'oklch(var(--bc) / 0.1)',
          }}
        />
      </div>
      <Typography
        ref={textRef}
        sx={{
          color: 'oklch(var(--bc) / 0.4)',
          fontSize: '1.1rem',
          fontWeight: 500,
          fontFamily: 'Inter',
          mt: 2,
        }}
      >
        Notes you add appear here
      </Typography>
      <Typography
        sx={{
          color: 'oklch(var(--bc) / 0.25)',
          fontSize: '0.85rem',
          fontWeight: 400,
          fontFamily: 'Inter',
          mt: 0.5,
        }}
      >
        Click the form above to get started
      </Typography>
    </Container>
  );
};

export default EmptyNotes;