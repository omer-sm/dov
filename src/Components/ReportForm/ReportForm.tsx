import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import ToggleButton from '@mui/material/ToggleButton';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
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
import { useDebouncedCallback } from 'use-debounce';
import { useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { formatDate, formatTime } from '../../Utils/formatReport';
import { saveReport } from '../../State/ReportState/storageHandler';
import { clearReport } from '../../State/ReportState/utils';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import { useConfirm } from 'material-ui-confirm';

interface ReportFormProps {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ReportForm({ setDialogOpen }: ReportFormProps) {
  const reportSnap = useSnapshot(reportState);
  const situationSnap = useSnapshot(situationState);
  const descriptionInputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
  const confirm = useConfirm();
  const [clearToastOpen, setClearToastOpen] = useState(false);
  const debounce = useDebouncedCallback((callback) => {
    callback();
  }, 500);

  const updateDescriptionInput = () => {
    if (descriptionInputRef.current) {
      descriptionInputRef.current.value = reportState.description;
    }
  };

  const addTimeToDescription = () => {
    debounce.flush();

    if (reportSnap.description.trim().startsWith('בתאריך')) {
      const splitDesc = reportState.description.split(',', 2);
      splitDesc[0] = `בתאריך ${formatDate(reportSnap.date)} בשעה ${formatTime(
        reportSnap.date
      )}`;

      reportState.description = splitDesc.join();
    } else {
      reportState.description = `בתאריך ${formatDate(reportSnap.date)} בשעה ${formatTime(
        reportSnap.date
      )}, ${reportSnap.description}`;
    }

    updateDescriptionInput();
  };

  return (
    <Stack gap={2} sx={{ minWidth: '20rem', width: '75%', margin: '1rem auto' }}>
      <FormControl>
        <FormLabel htmlFor="platoon-input">
          <Typography variant="h6">פלוגה</Typography>
        </FormLabel>
        <TextField
          autoComplete="off"
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
          onChange={(_event, newValue) =>
            debounce(() => (reportState.location = newValue as string))
          }
          onInputChange={(_event, newValue) =>
            debounce(() => (reportState.location = newValue))
          }
          value={reportSnap.location}
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
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <FormLabel htmlFor="description-input">
            <Typography variant="h6">תיאור האירוע</Typography>
          </FormLabel>
          <IconButton onClick={addTimeToDescription}>
            <AutoAwesomeRoundedIcon />
          </IconButton>
        </Stack>

        <TextField
          id="description-input"
          inputRef={descriptionInputRef}
          multiline
          maxRows={4}
          slotProps={{ input: { sx: { fontSize: '1.4rem' } } }}
          defaultValue={reportSnap.description}
          onChange={(event) =>
            debounce(() => (reportState.description = event.target.value))
          }
        />
      </FormControl>

      <Stack direction="row" justifyContent="space-between">
        <Button
          sx={{ width: '9rem', px: 0 }}
          variant="contained"
          color="success"
          onClick={() => {
            debounce.flush();
            setDialogOpen(true);
            saveReport(reportSnap);
          }}
          focusRipple={false}
        >
          <Typography variant="h6" sx={{ ml: 0.5 }}>
            יצירת דוח
          </Typography>
          <AssignmentRoundedIcon />
        </Button>

        <Button
          sx={{ width: '9rem', px: 0 }}
          variant="contained"
          color="error"
          onClick={async () => {
            const { confirmed } = await confirm({
              title: 'לאפס את הדוח ?',
              description: 'זה לא ניתן לביטול!',
              confirmationText: 'איפוס',
              confirmationButtonProps: { color: 'error' },
              cancellationText: 'חזרה',
            });

            if (confirmed) {
              debounce.flush();
              clearReport();
              updateDescriptionInput();
              setClearToastOpen(true);
              saveReport(reportState);
            }
          }}
        >
          <Typography variant="h6">איפוס</Typography>
          <ClearRoundedIcon />
        </Button>
      </Stack>

      <Snackbar
        open={clearToastOpen}
        onClose={() => setClearToastOpen(false)}
        autoHideDuration={1500}
      >
        <Alert
          slotProps={{ icon: { sx: { ml: 1, mr: 0 } } }}
          sx={{ width: '100%' }}
          severity="success"
          variant="filled"
        >
          הדוח אופס בהצלחה !
        </Alert>
      </Snackbar>
    </Stack>
  );
}
