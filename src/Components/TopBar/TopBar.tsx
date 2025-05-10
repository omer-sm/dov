import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import CloudDoneRoundedIcon from '@mui/icons-material/CloudDoneRounded';
import { useSnapshot } from 'valtio';
import { reportSavedState } from '../../State/ReportSavedState/reportSavedState';
import './loadingDots.css';

export default function TopBar() {
  const reportSavedSnap = useSnapshot(reportSavedState);

  return (
    <AppBar position="fixed" sx={{ py: 0.25, px: 2 }}>
      <Toolbar>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h4">
          דוב 🐻
        </Typography>
        {reportSavedSnap.reportSaved ? (
          <CloudDoneRoundedIcon />
        ) : (
          <div className="typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        {/* <IconButton edge="start">
          <LightModeRoundedIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
}
