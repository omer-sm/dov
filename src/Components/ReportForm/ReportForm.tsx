import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import { useSnapshot } from 'valtio';
import { reportState } from '../../State/ReportState/reportState';
import {
  LocalizationProvider,
  MobileDatePicker,
  renderDigitalClockTimeView,
  TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/he';
import MultiStateButton from './MultiStateButton';
import { situationState } from '../../State/SituationState/situationState'
import { incrementSituationIndex } from '../../State/SituationState/utils'

export default function ReportForm() {
  const reportSnap = useSnapshot(reportState);
  const situationSnap = useSnapshot(situationState);

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
              field: { id: 'date-input' },
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
        <FormControl>
          <FormLabel htmlFor="time-input">
            <Typography variant="h6">שעה</Typography>
          </FormLabel>
          <TimePicker
            slotProps={{
              field: { id: 'time-input' },
              nextIconButton: { style: { visibility: 'hidden' } },
              previousIconButton: { style: { visibility: 'hidden' } },
              toolbar: { sx: { direction: 'rtl' } },
            }}
            sx={{ direction: 'ltr' }}
            viewRenderers={{
              hours: renderDigitalClockTimeView,
              minutes: renderDigitalClockTimeView,
            }}
            value={reportSnap.date}
            onChange={(value) => {
              if (value?.isValid()) {
                reportState.date = dayjs(value);
              }
            }}
          />
        </FormControl>
      </LocalizationProvider>

      <FormControl>
        <FormLabel htmlFor="location-input">
          <Typography variant="h6">מיקום</Typography>
        </FormLabel>
        <Autocomplete
          freeSolo
          id="location-input"
          options={['חד"א', 'מגורים', 'שק"מ', 'מטווחים']}
          value={reportSnap.location}
          onChange={(_event, newValue) => (reportState.location = newValue as string)}
          renderInput={(params) => <TextField {...params} placeholder='למשל: חד"א..' />}
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="situation-input">
          <Typography variant="h6">מאפיין תחומי</Typography>
        </FormLabel>
        <MultiStateButton
          currentState={situationSnap.currentSituation}
          handleClick={incrementSituationIndex}
        />
      </FormControl>
    </Stack>
  );
}
