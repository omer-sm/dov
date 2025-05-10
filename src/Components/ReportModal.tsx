import { Button, Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import type { Dispatch, SetStateAction } from 'react';
import ContentPasteRoundedIcon from '@mui/icons-material/ContentPasteRounded';
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';

interface ReportModalProps {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ReportModal({ dialogOpen, setDialogOpen }: ReportModalProps) {
  return (
    <Dialog fullWidth={true} open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <DialogTitle>הדוח מוכן !</DialogTitle>
      <DialogContent>
        <Button color='success' variant='contained'><ContentPasteRoundedIcon /></Button>
        <TextField
          sx={{ width: '100%', my: '0.5rem' }}
          contentEditable={undefined}
          slotProps={{ input: { sx: { fontSize: '1.4rem' } } }}
          value="דוח בטיחות שדפןגחןםשחדןםגחשכחןםדגדגדגדגדגדגדגדגדדדדדדדדדדדדדדדדןםשחדגשדןגןשחן"
          multiline
        />
      </DialogContent>
    </Dialog>
  );
}
