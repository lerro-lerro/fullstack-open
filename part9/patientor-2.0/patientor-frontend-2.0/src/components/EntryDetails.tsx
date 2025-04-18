import { Entry, HealthCheckRating } from "../types/entry";
import { Diagnosis } from "../types/diagnosis";
import { Typography, Paper, IconButton } from "@mui/material";
import { LocalHospital, Work, Favorite } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import HealthRatingBar from "./HealthRatingBar";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { useState } from "react";

const assertNever = (value: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(value)}`);
};

const DiagnosisList = ({
  codes,
  diagnoses,
}: {
  codes?: string[];
  diagnoses: Record<string, Diagnosis>;
}) => (
  <ul>
    {codes?.map((c) => (
      <li key={c}>
        {c} {diagnoses[c]?.name}
      </li>
    ))}
  </ul>
);

interface Props {
  entry: Entry;
  diagnoses: Record<string, Diagnosis>;
  onDelete: (entryId: string) => void;
}

const EntryDetails: React.FC<Props> = ({ entry, diagnoses, onDelete }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const renderDeleteButton = () => (
    <>
      <IconButton
        onClick={() => setConfirmOpen(true)}
        color="error"
        aria-label="delete entry"
      >
        <DeleteIcon />
      </IconButton>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Are you sure you want to delete this entry?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              onDelete(entry.id);
              setConfirmOpen(false);
            }}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  switch (entry.type) {
    case "Hospital":
      return (
        <Paper sx={{ p: 2, mb: 1 }}>
          <Typography>
            {entry.date} <LocalHospital />
          </Typography>
          <i>{entry.description}</i>
          <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          <Typography variant="body2">
            Discharged {entry.discharge.date}: {entry.discharge.criteria}
          </Typography>
          {renderDeleteButton()}
        </Paper>
      );
    case "OccupationalHealthcare":
      return (
        <Paper sx={{ p: 2, mb: 1 }}>
          <Typography>
            {entry.date} <Work /> {entry.employerName}
          </Typography>
          <i>{entry.description}</i>
          <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          {entry.sickLeave && (
            <Typography variant="body2">
              Sick leave {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
            </Typography>
          )}
          {renderDeleteButton()}
        </Paper>
      );
    case "HealthCheck":
      return (
        <Paper sx={{ p: 2, mb: 1 }}>
          <Typography>
            {entry.date} <Favorite />
          </Typography>
          <i>{entry.description}</i>
          <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          <HealthRatingBar
            showText
            rating={entry.healthCheckRating as HealthCheckRating}
          />
          {renderDeleteButton()}
        </Paper>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
