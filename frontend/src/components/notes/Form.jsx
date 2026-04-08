import { useState, useRef, useContext, useEffect } from 'react';

import { Box, TextField, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import { v4 as uuid } from 'uuid';
import { gsap } from 'gsap';

import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 600px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  min-height: 30px;
  padding: 16px 20px;
  border-radius: 12px;
`;

const note = {
  id: '',
  heading: '',
  text: '',
};

const Form = () => {
  const [showTextField, setShowTextField] = useState(false);
  const [addNoteData, setAddNoteData] = useState({ ...note, id: uuid() });

  const { addNote } = useContext(DataContext);

  const containerRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 20, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out', delay: 0.2 }
      );
    }
  }, []);

  useEffect(() => {
    if (showTextField && containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { height: containerRef.current.offsetHeight },
        { height: 'auto', duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [showTextField]);

  const handleSave = (e) => {
    if (e) e.stopPropagation();
    setShowTextField(false);
    if (addNoteData.heading || addNoteData.text) {
      addNote(addNoteData);
    }
    setAddNoteData({ ...note, id: uuid() });
  };

  const handleClickAway = () => {
    setShowTextField(false);

    if (addNoteData.heading || addNoteData.text) {
      addNote(addNoteData);
    }

    setAddNoteData({ ...note, id: uuid() });
  };

  const onTextAreaClick = () => {
    setShowTextField(true);
  };

  const onTextChange = (e) => {
    let changedNote = { ...addNoteData, [e.target.name]: e.target.value };
    setAddNoteData(changedNote);
  };

  return (
    <div ref={formRef}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Container
          ref={containerRef}
          className="note-form"
          sx={{
            backgroundColor: 'oklch(var(--b1))',
            color: 'oklch(var(--bc))',
          }}
        >
          {showTextField && (
            <TextField
              placeholder="Title"
              variant="standard"
              InputProps={{
                disableUnderline: true,
                style: {
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: '1rem',
                  color: 'oklch(var(--bc))',
                },
              }}
              style={{ marginBottom: 10 }}
              onChange={(e) => onTextChange(e)}
              name="heading"
              value={addNoteData.heading}
            />
          )}
          <TextField
            placeholder="Take a note..."
            multiline
            maxRows={Infinity}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              style: {
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '0.95rem',
                color: 'oklch(var(--bc))',
              },
            }}
            onClick={onTextAreaClick}
            onChange={(e) => onTextChange(e)}
            name="text"
            value={addNoteData.text}
          />
          {showTextField && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1.5, gap: 1 }}>
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleClickAway}
                style={{ fontFamily: 'Inter' }}
              >
                Close
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={handleSave}
                style={{ fontFamily: 'Inter' }}
              >
                Save
              </button>
            </Box>
          )}
        </Container>
      </ClickAwayListener>
    </div>
  );
};

export default Form;