import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
import { situationState } from '../../State/SituationState/situationState';
import { incrementSituationIndex } from '../../State/SituationState/utils';
import { Checkbox, Divider, FormControlLabel, Paper, ToggleButton } from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';

export default function ReportForm() {
  const reportSnap = useSnapshot(reportState);
  const situationSnap = useSnapshot(situationState);
  const debounce = useDebouncedCallback((callback) => {
    callback();
  }, 1000);

  return (
    <Stack gap={2} sx={{ minWidth: '20rem', width: '75%', margin: '1rem auto' }}>
      <FormControl>
        <FormLabel htmlFor="platoon-input">
          <Typography variant="h6">פלוגה</Typography>
        </FormLabel>
        <TextField
          id="platoon-input"
          placeholder="למשל: וייפר.."
          defaultValue={reportSnap.platoon}
          onChange={(event) => debounce(() => (reportState.platoon = event.target.value))}
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
          defaultValue={reportSnap.location}
          onChange={(_event, newValue) => debounce(() => (reportState.location = newValue as string))}
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

      <FormControl>
        <FormLabel htmlFor="severity-input">
          <Typography variant="h6">חומרת פגיעה</Typography>
        </FormLabel>
        <ToggleButtonGroup
          id="severity-input"
          value={reportSnap.severity}
          exclusive
          onChange={(_event, newSeverity) => (reportState.severity = newSeverity)}
          dir="ltr"
        >
          {[
            { value: 'Severe', text: 'קשה', color: 'error' },
            { value: 'Medium', text: 'בינוני', color: 'warning' },
            { value: 'Light', text: 'קל', color: 'info' },
          ].map((values) => (
            <ToggleButton
              value={values.value}
              color={values.color as 'info' | 'warning' | 'error'}
              key={values.value}
              sx={{
                width: '100%',
                padding: '0.25rem 0',
                fontWeight: '600',
                fontSize: '1.4rem',
                transitionProperty: 'background-color, color',
                transitionDuration: '300ms',
                transitionTimingFunction: 'cubic-bezier(.53,.49,.61,1.02)',
              }}
            >
              {values.text}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </FormControl>

      <FormControl>
        <FormLabel>
          <Typography color="textSecondary" variant="h6">
            נפגעים / נזק
          </Typography>
        </FormLabel>
        <Paper sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <FormControlLabel
            sx={{ margin: 0, width: '100%', justifyContent: 'flex-start' }}
            label={<Typography variant="h6">נפגעים</Typography>}
            control={
              <Checkbox
                checked={reportSnap.outcome.peopleDamaged}
                onChange={(event) =>
                  (reportState.outcome.peopleDamaged = event.target.checked)
                }
              />
            }
          />
          <Divider orientation="vertical" sx={{ height: '2rem', margin: '0.5rem' }} />
          <FormControlLabel
            sx={{ margin: 0, width: '100%', justifyContent: 'flex-start' }}
            label={<Typography variant="h6">נזק</Typography>}
            control={
              <Checkbox
                checked={reportSnap.outcome.propertyDamaged}
                onChange={(event) =>
                  (reportState.outcome.propertyDamaged = event.target.checked)
                }
              />
            }
          />
        </Paper>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="description-input">
          <Typography variant="h6">תיאור האירוע</Typography>
        </FormLabel>

        <TextField
          id="description-input"
          multiline
          maxRows={4}
          slotProps={{ input: { sx: { fontSize: '1.4rem' } } }}
          defaultValue={reportSnap.description}
          onChange={(event) =>
            debounce(() => (reportState.description = event.target.value))
          }
        />
      </FormControl>
    </Stack>
  );
}
