import Box from '@mui/material/Box';
import TopBar from './Components/TopBar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './State/ThemeState/theme';
import ReportForm from './Components/ReportForm'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ m: 0, pt: '70px' }}>
        <TopBar />
        <ReportForm />
      </Box>
    </ThemeProvider>
  );
}

export default App;
