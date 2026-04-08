import { useContext, useEffect, useRef } from 'react';

import { Box, Grid, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { DataContext } from '../../context/DataProvider';
import { reorder } from '../../utils/common-utils';

//components
import Form from './Form';
import Note from './Note';
import EmptyNotes from './EmptyNotes';

gsap.registerPlugin(ScrollTrigger);

const DrawerHeader = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Notes = () => {
  const { notes, setNotes, loading, dbConnected } = useContext(DataContext);
  const gridRef = useRef(null);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = reorder(notes, result.source.index, result.destination.index);
    setNotes(items);
  };

  useEffect(() => {
    if (gridRef.current && notes.length > 0) {
      const cards = gridRef.current.querySelectorAll('.note-grid-item');
      gsap.fromTo(
        cards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
        }
      );
    }
  }, [notes.length]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box sx={{ p: { xs: 1, sm: 3 }, width: '100%' }}>
        <DrawerHeader />
        <Form />

        {/* DB connection status indicator */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 0 }}>
          <div
            className={`badge badge-xs ${dbConnected ? 'badge-success' : 'badge-warning'}`}
            style={{ fontFamily: 'Inter', fontSize: '0.65rem', gap: 4 }}
          >
            <span style={{
              width: 5, height: 5, borderRadius: '50%',
              backgroundColor: dbConnected ? '#22c55e' : '#f59e0b',
              display: 'inline-block',
            }} />
            {dbConnected ? 'Synced with MongoDB' : 'Local mode'}
          </div>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20vh' }}>
            <CircularProgress sx={{ color: 'oklch(var(--p))' }} />
          </Box>
        ) : notes.length > 0 ? (
          <>
            {/* Section badge */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mt: 3,
                mb: 2,
                px: 1,
              }}
            >
              <div
                className="badge badge-primary badge-sm"
                style={{ fontFamily: 'Inter', fontWeight: 600 }}
              >
                {notes.length} {notes.length === 1 ? 'Note' : 'Notes'}
              </div>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: 'oklch(var(--bc) / 0.08)',
                }}
              />
            </Box>

            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <Grid
                    container
                    ref={(el) => {
                      provided.innerRef(el);
                      gridRef.current = el;
                    }}
                    {...provided.droppableProps}
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 0,
                    }}
                  >
                    {notes.map((note, index) => (
                      <Draggable key={note.id} draggableId={note.id} index={index}>
                        {(provided, snapshot) => (
                          <Grid
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            item
                            className="note-grid-item"
                            sx={{
                              transition: snapshot.isDragging
                                ? 'none'
                                : 'transform 0.3s ease',
                              ...(snapshot.isDragging && {
                                zIndex: 1000,
                                transform: 'rotate(3deg) scale(1.05)',
                              }),
                            }}
                          >
                            <Note note={note} />
                          </Grid>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Grid>
                )}
              </Droppable>
            </DragDropContext>
          </>
        ) : (
          <EmptyNotes />
        )}
      </Box>
    </Box>
  );
};

export default Notes;