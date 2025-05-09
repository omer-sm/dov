import { createTheme } from '@mui/material';
import { heIL } from '@mui/x-date-pickers/locales';

export const theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: 'Assistant',
    fontSize: 16,
  },
}, heIL);
