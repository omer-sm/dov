import Box from '@mui/material/Box';
import TopBar from './Components/TopBar/TopBar';
import { CssBaseline, ThemeProvider } from '@mui/material';
import ReportForm from './Components/ReportForm/ReportForm';
import { useEffect, useState } from 'react';
import ReportModal from './Components/ReportModal/ReportModal';
import { loadReport } from './State/ReportState/storageHandler';
import { ConfirmProvider } from 'material-ui-confirm';
import { darkTheme, lightTheme } from './State/ThemeState/theme';
import Footer from './Components/Footer';

export const ANALYTICS_URL = 'https://dov-analytics.omersm.workers.dev';

function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(
    new Date().getHours() >= 20 || new Date().getHours() <= 6 ? 'dark' : 'light'
  );

  useEffect(() => {
    loadReport();

    fetch(`${ANALYTICS_URL}/statistics`, {
      method: 'POST',
      body: JSON.stringify({ statistic: 'VISIT' }),
    });
  }, []);

  return (
    <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
      <ConfirmProvider>
        <CssBaseline />
        <Box sx={{ m: 0, pt: '70px' }}>
          <TopBar {...{ themeMode, setThemeMode }} />
          <ReportForm {...{ setDialogOpen }} />
          <ReportModal {...{ dialogOpen, setDialogOpen }} />
          <Footer />
        </Box>
      </ConfirmProvider>
    </ThemeProvider>
  );
}

export default App;
