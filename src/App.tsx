import Box from '@mui/material/Box';
import TopBar from './Components/TopBar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './State/ThemeState/theme';
import ReportForm from './Components/ReportForm/ReportForm'
import { useState } from 'react'
import ReportModal from './Components/ReportModal'

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ m: 0, pt: '70px' }}>
        <TopBar />
        <ReportForm {...{setDialogOpen}} />
        <ReportModal {...{dialogOpen, setDialogOpen}} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
