import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded';
import { useSnapshot } from 'valtio';
import { reportSavedState } from '../../State/ReportSavedState/reportSavedState';
import './loadingDots.css';
import { Stack } from '@mui/material';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import type { Dispatch, SetStateAction } from 'react'

interface TopBarProps {
  themeMode: 'light' | 'dark';
  setThemeMode: Dispatch<SetStateAction<'light' | 'dark'>>;
}

export default function TopBar({themeMode, setThemeMode}: TopBarProps) {
  const reportSavedSnap = useSnapshot(reportSavedState);

  return (
    <AppBar position="fixed" sx={{ py: 0.25, px: 2 }}>
      <Toolbar sx={{px: 0.2}}>
        <Typography component="div" sx={{ flexGrow: 0.95 }} variant="h4">
          דוב 🐻
        </Typography>
        <Stack
          sx={{ flexGrow: 0.05 }}
          gap={1}
          direction="row-reverse"
          justifyContent="end"
          alignItems="center"
        >
          {reportSavedSnap.reportSaved ? (
            <CloudDoneRoundedIcon sx={{width: '40px'}} />
          ) : (
            <div className="typing" style={{width: '40px'}}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <IconButton
            onClick={() =>
              (setThemeMode((currMode) => currMode === 'dark' ? 'light' : 'dark'))
            }
          >
            {themeMode === 'light' ? (
              <LightModeRoundedIcon sx={{color: 'white'}} />
            ) : (
              <DarkModeRoundedIcon />
            )}
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
