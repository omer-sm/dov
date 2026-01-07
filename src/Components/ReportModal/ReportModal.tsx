/* eslint-disable react-hooks/exhaustive-deps */
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { useEffect, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { formatReport } from '../../Utils/formatReport';
import { useSnapshot } from 'valtio';
import { reportState } from '../../State/ReportState/reportState';
import './copyButtonAnimations.css';
import { reportAnalytic, sendReport } from '../../Utils/analytics';

interface ReportModalProps {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ReportModal({ dialogOpen, setDialogOpen }: ReportModalProps) {
  const [copyButtonState, setCopyButtonState] = useState(0);
  const reportSnap = useSnapshot(reportState);
  const formattedReport = useMemo(() => formatReport(reportSnap), [dialogOpen]);
  const theme = useTheme();

  useEffect(() => {
    if (dialogOpen) {
      sendReport(reportSnap);
    }
  }, [dialogOpen]);

  const copyReport = () => {
    if (copyButtonState === 0) {
      setCopyButtonState(1);
      setTimeout(() => setCopyButtonState(2), 100);
      setTimeout(() => setCopyButtonState(3), 1100);
      setTimeout(() => setCopyButtonState(0), 1500);
    }

    navigator.clipboard.writeText(formattedReport);

    reportAnalytic('REPORT_COPIED');
  };

  return (
    <>
      <Dialog fullWidth={true} open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">הדוח מוכן !</Typography>
            <Button
              color="success"
              variant="contained"
              onClick={copyReport}
              sx={{
                position: 'relative',
                zIndex: 0,
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  zIndex: -10,
                  height: '100%',
                  width: '100%',
                  borderRadius: '16px',
                  backgroundColor: theme.palette.success.main,
                  transformOrigin: 'center',
                  transition: 'transform 0.5s, opacity 0.5s, background-color 0.3s',
                  transform:
                    copyButtonState === 1 || copyButtonState === 2
                      ? 'scaleX(1.4) scaleY(1.4)'
                      : '',
                  opacity: copyButtonState > 0 ? 0 : 0.5,
                },
                '&:hover:after': {
                  backgroundColor: theme.palette.success.dark,
                },
                '&:focus:after': {
                  backgroundColor: theme.palette.success.main,
                },
              }}
            >
              {copyButtonState !== 2 ? (
                <ContentCopyRoundedIcon
                  sx={{
                    animation:
                      copyButtonState === 1
                        ? 'shrink 1s ease'
                        : copyButtonState === 3
                        ? 'grow 800ms ease'
                        : undefined,
                  }}
                />
              ) : (
                <CheckRoundedIcon
                  sx={{
                    animation: copyButtonState === 2 ? 'grow 1s ease' : undefined,
                  }}
                />
              )}
            </Button>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <TextField
            sx={{ width: '100%', my: '0.5rem' }}
            contentEditable={undefined}
            slotProps={{ input: { sx: { fontSize: '1.4rem' } } }}
            multiline
            value={formattedReport}
          />
          <Button
            onClick={() => reportAnalytic('REPORT_SENT_ON_WHATSAPP')}
            target="_blank"
            href={encodeURI(
              `https://wa.me/${reportSnap.destinationPhone}?text=${formattedReport}`
            )}
            variant="contained"
            color="success"
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <SendRoundedIcon />
          </Button>
        </DialogContent>
      </Dialog>

      <Snackbar open={copyButtonState > 0 && copyButtonState !== 3}>
        <Alert
          slotProps={{ icon: { sx: { ml: 1, mr: 0 } } }}
          sx={{ width: '100%' }}
          severity="success"
          variant="filled"
        >
          הדוח הועתק בהצלחה !
        </Alert>
      </Snackbar>
    </>
  );
}
