import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnapshot } from 'valtio';
import { reportState } from '../State/ReportState/reportState';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/he';

export default function ReportForm() {
  const reportSnap = useSnapshot(reportState);

  return (
    <Stack gap={2} sx={{ minWidth: '20rem', width: '75%', margin: '1rem auto' }}>
      <FormControl>
        <FormLabel htmlFor="platoon-input">
          <Typography variant="h6">פלוגה</Typography>
        </FormLabel>
        <TextField
          id="platoon-input"
          placeholder="למשל: וייפר.."
          value={reportSnap.platoon}
          onChange={(event) => (reportState.platoon = event.target.value)}
        />
      </FormControl>

      <LocalizationProvider adapterLocale="he" dateAdapter={AdapterDayjs}>
        <FormControl>
          <FormLabel htmlFor="date-input">
            <Typography variant="h6">תאריך</Typography>
          </FormLabel>
          <MobileDatePicker
            slotProps={{
              dialog: { dir: 'rtl' },
              calendarHeader: { sx: { direction: 'ltr' } },
              toolbar: { toolbarFormat: 'ddd, D [ב]MMM' },
            }}
            sx={{ direction: 'ltr' }}
            value={reportSnap.date}
            onChange={(value) => {
              if (value?.isValid()) {
                reportState.date = dayjs(value);
              }
            }}
          />
        </FormControl>
      </LocalizationProvider>
    </Stack>
  );
}
