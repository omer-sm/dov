import Box from '@mui/material/Box';
import TopBar from './Components/TopBar/TopBar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './State/ThemeState/theme';
import ReportForm from './Components/ReportForm/ReportForm';
import { useEffect, useState } from 'react';
import ReportModal from './Components/ReportModal/ReportModal';
import { loadReport } from './State/ReportState/storageHandler';
import { ConfirmProvider } from 'material-ui-confirm';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    loadReport();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ConfirmProvider>
        <CssBaseline />
        <Box sx={{ m: 0, pt: '70px' }}>
          <TopBar />
          <ReportForm {...{ setDialogOpen }} />
          <ReportModal {...{ dialogOpen, setDialogOpen }} />
        </Box>
      </ConfirmProvider>
    </ThemeProvider>
  );
}

export default App;
