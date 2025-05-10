import { createTheme } from '@mui/material';
import { heIL } from '@mui/x-date-pickers/locales';

const theme = {
  typography: {
    fontFamily: 'Assistant',
    fontSize: 16,
  },
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  },
  ...theme
}, heIL);

export const lightTheme = createTheme({
  palette: {
    mode: 'light'
  },
  ...theme
}, heIL);
