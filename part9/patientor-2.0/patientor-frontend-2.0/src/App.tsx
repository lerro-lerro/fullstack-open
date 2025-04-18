import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import { getDiagnoses } from "./services/diagnoses";
import PatientListPage from "./components/PatientListPage";
import SinglePatientPage from "./components/SinglePatientPage";

import { useStateValue } from "./state";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [, dispatch] = useStateValue();

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patientsFromApi = await patientService.getAll();
      setPatients(patientsFromApi);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const diagnoses = await getDiagnoses();
        console.log("Fetched diagnoses:", diagnoses);
        dispatch({ type: "SET_DIAGNOSES_LIST", payload: diagnoses });
      } catch (e) {
        console.error("Error fetching diagnoses:", e);
        if (axios.isAxiosError(e)) {
          console.error("Response data:", e.response?.data);
          console.error("Request URL:", e.config?.url);
        }
      }
    };
    void fetchDiagnoses();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Patientor
          </Typography>

          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>

          <Divider sx={{ my: 2 }} />

          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route path="/patients/:id" element={<SinglePatientPage />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
