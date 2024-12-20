"use client";
import * as React from 'react';
import { 
  Button, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Box, 
  TextField,
  CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Autocomplete from '@mui/material/Autocomplete';

const validationSchema = Yup.object({
  cowId: Yup.string().required('Cow ID is required'),
  cowName: Yup.string().required('Cow Name is required'),
  event: Yup.string().required('Event is required'),
  diagnosis: Yup.string().required('Diagnosis is required'),
  treatment: Yup.string().required('Treatment is required'),
  costOfTreatment: Yup.number().required('Cost of Treatment is required'),
  vetName: Yup.string().required('Vet Name is required'),
});

interface HealthRecord {
  _id?: string;
  cowId: string;
  cowName: string;
  event: string;
  diagnosis: string;
  treatment: string;
  costOfTreatment: number;
  vetName: string;
}

interface AddHealthReportProps {
  open: boolean;
  onClose: () => void;
  healthRecord?: HealthRecord;
}

function AddHealthReport({ open, onClose, healthRecord }: AddHealthReportProps) {
  const [submitting, setSubmitting] = React.useState(false);
  const [cows, setCows] = React.useState<{ label: string, id: string }[]>([]);

  const formik = useFormik({
    initialValues: {
      cowId: '',
      cowName: '',
      event: '',
      diagnosis: '',
      treatment: '',
      costOfTreatment: 0,
      vetName: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        console.log('Submitting form data:', values);
        if (healthRecord) {
          await axios.put('/api/health', { id: healthRecord._id, ...values });
        } else {
          await axios.post('/api/health', values);
        }
        formik.resetForm();
        onClose();
      } catch (error) {
        console.error('Error saving health record:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  React.useEffect(() => {
    if (healthRecord) {
      formik.setValues({
        cowId: healthRecord.cowId,
        cowName: healthRecord.cowName,
        event: healthRecord.event,
        diagnosis: healthRecord.diagnosis,
        treatment: healthRecord.treatment,
        costOfTreatment: healthRecord.costOfTreatment,
        vetName: healthRecord.vetName,
      });
    } else {
      formik.resetForm();
    }
  }, [healthRecord]);

  React.useEffect(() => {
    const fetchCows = async () => {
      try {
        const response = await axios.get('/api/cows');
        setCows(response.data.map((cow: any) => ({ label: cow.cowName, id: cow.cowId })));
      } catch (error) {
        console.error('Error fetching cows:', error);
      }
    };
    fetchCows();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{healthRecord ? 'Update Health Record' : 'Add Health Record'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} mt={2}>
          <Autocomplete
            options={cows}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => {
              formik.setFieldValue('cowId', value?.id || '');
              formik.setFieldValue('cowName', value?.label || '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                id="cowName"
                name="cowName"
                label="Cow Name"
                value={formik.values.cowName}
                onChange={formik.handleChange}
                error={formik.touched.cowName && Boolean(formik.errors.cowName)}
                helperText={formik.touched.cowName && typeof formik.errors.cowName === 'string' ? formik.errors.cowName : undefined}
                margin="dense"
              />
            )}
          />
          {/* <TextField
            fullWidth
            id="cowId"
            name="cowId"
            label="Cow ID"
            value={formik.values.cowId}
            onChange={formik.handleChange}
            error={formik.touched.cowId && Boolean(formik.errors.cowId)}
            helperText={formik.touched.cowId && typeof formik.errors.cowId === 'string' ? formik.errors.cowId : undefined}
            margin="dense"
          /> */}
          <TextField
            fullWidth
            id="event"
            name="event"
            label="Event"
            value={formik.values.event}
            onChange={formik.handleChange}
            error={formik.touched.event && Boolean(formik.errors.event)}
            helperText={formik.touched.event && typeof formik.errors.event === 'string' ? formik.errors.event : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="diagnosis"
            name="diagnosis"
            label="Diagnosis"
            value={formik.values.diagnosis}
            onChange={formik.handleChange}
            error={formik.touched.diagnosis && Boolean(formik.errors.diagnosis)}
            helperText={formik.touched.diagnosis && typeof formik.errors.diagnosis === 'string' ? formik.errors.diagnosis : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="treatment"
            name="treatment"
            label="Treatment"
            value={formik.values.treatment}
            onChange={formik.handleChange}
            error={formik.touched.treatment && Boolean(formik.errors.treatment)}
            helperText={formik.touched.treatment && typeof formik.errors.treatment === 'string' ? formik.errors.treatment : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="costOfTreatment"
            name="costOfTreatment"
            label="Cost of Treatment"
            type="number"
            value={formik.values.costOfTreatment}
            onChange={formik.handleChange}
            error={formik.touched.costOfTreatment && Boolean(formik.errors.costOfTreatment)}
            helperText={formik.touched.costOfTreatment && typeof formik.errors.costOfTreatment === 'string' ? formik.errors.costOfTreatment : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="vetName"
            name="vetName"
            label="Vet Name"
            value={formik.values.vetName}
            onChange={formik.handleChange}
            error={formik.touched.vetName && Boolean(formik.errors.vetName)}
            helperText={formik.touched.vetName && typeof formik.errors.vetName === 'string' ? formik.errors.vetName : undefined}
            margin="dense"
          />
          <DialogActions>
            <Button color="error" onClick={onClose} disabled={submitting}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <CircularProgress size={18} /> : healthRecord ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddHealthReport;