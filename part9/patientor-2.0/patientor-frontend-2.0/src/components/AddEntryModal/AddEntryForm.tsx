import { useStateValue } from "../../state";
import { EntryWithoutId, HealthCheckRating } from "../../types/entry";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Formik, Form } from "formik";

type EntryFormValues = Omit<EntryWithoutId, "type"> & {
  type: "HealthCheck";
};

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
  error?: string;
}

const ratingOptions = Object.values(HealthCheckRating).filter(
  (v) => typeof v === "number"
) as number[];

const isValidDate = (dateStr: string): boolean => {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
};

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const diagnosisArray = Object.values(diagnoses);

  console.log("Diagnoses from state:", diagnoses);
  console.log("Diagnosis array:", diagnosisArray);

  return (
    <Formik<EntryFormValues>
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [] as string[],
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        } else if (values.description.length < 3) {
          errors.description = "Description must be at least 3 characters";
        }

        if (!values.date) {
          errors.date = requiredError;
        } else if (!isValidDate(values.date)) {
          errors.date = "Invalid date format";
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (values.healthCheckRating === undefined) {
          errors.healthCheckRating = requiredError;
        }

        return errors;
      }}
    >
      {({ isValid, dirty, getFieldProps, setFieldValue, touched, errors }) => (
        <Form className="form ui">
          <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  {...getFieldProps("description")}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  {...getFieldProps("date")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Specialist"
                  {...getFieldProps("specialist")}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="diag-label">Diagnosis codes</InputLabel>
                  <Select
                    labelId="diag-label"
                    label="Diagnosis codes"
                    multiple
                    value={getFieldProps("diagnosisCodes").value}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFieldValue(
                        "diagnosisCodes",
                        typeof value === "string" ? value.split(",") : value
                      );
                    }}
                    renderValue={(selected) =>
                      (selected as string[]).join(", ")
                    }
                  >
                    {diagnosisArray.map((diagnosis) => (
                      <MenuItem key={diagnosis.code} value={diagnosis.code}>
                        <Checkbox
                          checked={getFieldProps(
                            "diagnosisCodes"
                          ).value.includes(diagnosis.code)}
                        />
                        <ListItemText
                          primary={`${diagnosis.code} - ${diagnosis.name}`}
                          secondary={diagnosis.latin}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="rating-label">Health rating</InputLabel>
                  <Select
                    labelId="rating-label"
                    fullWidth
                    {...getFieldProps("healthCheckRating")}
                  >
                    {ratingOptions.map((n) => (
                      <MenuItem key={n} value={n}>
                        {HealthCheckRating[n]}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} textAlign="right">
                <Button onClick={onCancel} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AddEntryForm;
