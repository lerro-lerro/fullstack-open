import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Alert } from "@mui/material";
import { EntryWithoutId } from "../../types/entry";
import AddEntryForm from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Dialog open={modalOpen} onClose={onClose} fullWidth>
    <DialogTitle>New entry</DialogTitle>
    <DialogContent dividers>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

export default AddEntryModal;