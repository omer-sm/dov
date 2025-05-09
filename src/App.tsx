import Box from '@mui/material/Box';
import TopBar from './Components/TopBar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './State/ThemeState/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ m: 0 }}>
        <TopBar />
      </Box>
    </ThemeProvider>
  );
}

export default App;
