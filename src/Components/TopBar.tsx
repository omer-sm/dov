import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

export default function TopBar() {
  return (
    <AppBar sx={{ py: 0.25, px: 2 }}>
      <Toolbar>
        <Typography component="div" sx={{ flexGrow: 1 }} variant="h4">
          דוב 🐻
        </Typography>
        <IconButton edge="start">
          <LightModeRoundedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
