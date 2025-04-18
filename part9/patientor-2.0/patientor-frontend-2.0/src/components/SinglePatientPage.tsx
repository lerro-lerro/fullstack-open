import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types/patient";
import { Entry } from "../types/entry";
import { useStateValue } from "../state";

import { Container, Typography, CircularProgress, Button } from "@mui/material";
import { Male, Female, Transgender } from "@mui/icons-material";
import AddEntryModal from "./AddEntryModal";
import { EntryWithoutId } from "../types/entry";
import EntryList from "./EntryList";

const SinglePatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [{ diagnoses }] = useStateValue();

  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const { data } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient({ ...data, entries: data.entries || [] });
      } catch (error) {
        console.error("Failed to fetch patient data:", error);
        setError("Failed to load patient data");
      }
    })();
  }, [id]);

  const validateEntryData = (values: EntryWithoutId): boolean => {
    if (
      !values.type ||
      !values.description ||
      !values.date ||
      !values.specialist
    ) {
      setError("Missing required fields");
      return false;
    }

    switch (values.type) {
      case "HealthCheck":
        if (values.healthCheckRating === undefined) {
          setError("Health check rating is required");
          return false;
        }
        break;
      case "Hospital":
        if (!values.discharge) {
          setError("Discharge information is required");
          return false;
        }
        break;
      case "OccupationalHealthcare":
        if (!values.employerName) {
          setError("Employer name is required");
          return false;
        }
        break;
    }

    return true;
  };

  const submitNewEntry = async (values: EntryWithoutId) => {
    if (!patient) return;
    if (!validateEntryData(values)) return;

    setIsSubmitting(true);
    try {
      console.log("Patient ID:", patient.id);
      console.log("Entry values:", JSON.stringify(values, null, 2));

      const { data: entry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );

      const currentEntries = patient.entries || [];
      setPatient({ ...patient, entries: currentEntries.concat(entry) });
      setModalOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data) {
        console.error("Server error details:", e.response.data);
        setError(String(e.response.data.error));
      } else {
        console.error("Unknown error:", e);
        setError("Failed to add entry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEntry = async (entryId: string) => {
    try {
      if (!patient) return;

      await axios.delete(
        `${apiBaseUrl}/patients/${patient.id}/entries/${entryId}`
      );

      setPatient({
        ...patient,
        entries: patient.entries.filter((e) => e.id !== entryId),
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error("Delete error:", e.response?.data);
        setError(e.response?.data?.error || "Failed to delete entry");
      } else {
        console.error("Unknown error:", e);
        setError("An unexpected error occurred");
      }
    }
  };

  if (!patient) return <CircularProgress />;

  const genderIcon =
    patient.gender === "male" ? (
      <Male />
    ) : patient.gender === "female" ? (
      <Female />
    ) : (
      <Transgender />
    );

  return (
    <Container>
      <Typography variant="h4" mt={2} gutterBottom>
        {patient.name} {genderIcon}
      </Typography>
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>

      <EntryList
        entries={patient.entries}
        diagnoses={diagnoses}
        onDeleteEntry={handleDeleteEntry}
      />

      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onClose={() => setModalOpen(false)}
        onSubmit={submitNewEntry}
        isSubmitting={isSubmitting}
      />
      <Button
        variant="contained"
        onClick={() => setModalOpen(true)}
        sx={{ mt: 2 }}
      >
        Add new entry
      </Button>
    </Container>
  );
};

export default SinglePatientPage;

export interface Patient {
  id: string;
  name: string;
  entries: Entry[];
}
