import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

//components
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import Archives from './archives/Archives';
import DeleteNotes from './delete/DeleteNotes';

const Home = ({ currentTheme, setCurrentTheme }) => {
  return (
    <Router>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'oklch(var(--b2))',
          color: 'oklch(var(--bc))',
          transition: 'background-color 0.4s ease',
        }}
      >
        <SwipeDrawer currentTheme={currentTheme} setCurrentTheme={setCurrentTheme}>
          <Routes>
            <Route path='/' element={<Notes />} />
            <Route path='/archive' element={<Archives />} />
            <Route path='/delete' element={<DeleteNotes />} />
          </Routes>
        </SwipeDrawer>
      </Box>
    </Router>
  );
};

export default Home;
