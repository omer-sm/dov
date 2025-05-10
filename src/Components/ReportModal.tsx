import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useMemo, type Dispatch, type SetStateAction } from 'react';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import { formatReport } from '../Utils/formatReport'
import { useSnapshot } from 'valtio'
import { reportState } from '../State/ReportState/reportState'

interface ReportModalProps {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ReportModal({ dialogOpen, setDialogOpen }: ReportModalProps) {
  const reportSnap = useSnapshot(reportState);
  const formattedReport = useMemo(() => formatReport(reportSnap), [dialogOpen]);

  return (
    <Dialog fullWidth={true} open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>הדוח מוכן !</DialogTitle>
      <DialogContent>
        <Button color='success' variant='contained'><ContentPasteRoundedIcon /></Button>
        <TextField
          sx={{ width: '100%', my: '0.5rem' }}
          contentEditable={undefined}
          slotProps={{ input: { sx: { fontSize: '1.4rem' } } }}
          multiline
          value={formattedReport}
        />
      </DialogContent>
    </Dialog>
  );
}
