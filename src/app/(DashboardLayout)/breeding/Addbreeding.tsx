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
  heatDate: Yup.date().required('Heat Date is required'),
  breedDate: Yup.date().required('Breed Date is required'),
  pregnancyDate: Yup.date().required('Pregnancy Date is required'),
  expectedDateToCalve: Yup.date().required('Expected Date to Calve is required'),
  dateCalved: Yup.date().required('Date Calved is required'),
  cowAge: Yup.number().required('Cow Age is required'),
  remarks: Yup.string().required('Remarks are required'),
});

interface Breeding {
  _id?: string;
  cowId: string;
  cowName: string;
  heatDate: string;
  breedDate: string;
  pregnancyDate: string;
  expectedDateToCalve: string;
  dateCalved: string;
  cowAge: number;
  remarks: string;
}

interface AddBreedingProps {
  open: boolean;
  onClose: () => void;
  breeding?: Breeding;
}

function AddBreeding({ open, onClose, breeding }: AddBreedingProps) {
  const [submitting, setSubmitting] = React.useState(false);
  const [cows, setCows] = React.useState<{ label: string, id: string }[]>([]);

  const formik = useFormik({
    initialValues: {
      cowId: '',
      cowName: '',
      heatDate: '',
      breedDate: '',
      pregnancyDate: '',
      expectedDateToCalve: '',
      dateCalved: '',
      cowAge: 0,
      remarks: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        console.log('Submitting form data:', values);
        if (breeding) {
          await axios.put('/api/breeding', { id: breeding._id, ...values });
        } else {
          await axios.post('/api/breeding', values);
        }
        formik.resetForm();
        onClose();
      } catch (error) {
        console.error('Error saving breeding:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  React.useEffect(() => {
    if (breeding) {
      formik.setValues({
        cowId: breeding.cowId,
        cowName: breeding.cowName,
        heatDate: breeding.heatDate,
        breedDate: breeding.breedDate,
        pregnancyDate: breeding.pregnancyDate,
        expectedDateToCalve: breeding.expectedDateToCalve,
        dateCalved: breeding.dateCalved,
        cowAge: breeding.cowAge,
        remarks: breeding.remarks,
      });
    } else {
      formik.resetForm();
    }
  }, [breeding]);

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
      <DialogTitle>{breeding ? 'Update Breeding' : 'Add Breeding'}</DialogTitle>
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
          <TextField
            fullWidth
            id="heatDate"
            name="heatDate"
            label="Heat Date"
            type="date"
            value={formik.values.heatDate}
            onChange={formik.handleChange}
            error={formik.touched.heatDate && Boolean(formik.errors.heatDate)}
            helperText={formik.touched.heatDate && typeof formik.errors.heatDate === 'string' ? formik.errors.heatDate : undefined}
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="breedDate"
            name="breedDate"
            label="Breed Date"
            type="date"
            value={formik.values.breedDate}
            onChange={formik.handleChange}
            error={formik.touched.breedDate && Boolean(formik.errors.breedDate)}
            helperText={formik.touched.breedDate && typeof formik.errors.breedDate === 'string' ? formik.errors.breedDate : undefined}
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="pregnancyDate"
            name="pregnancyDate"
            label="Pregnancy Date"
            type="date"
            value={formik.values.pregnancyDate}
            onChange={formik.handleChange}
            error={formik.touched.pregnancyDate && Boolean(formik.errors.pregnancyDate)}
            helperText={formik.touched.pregnancyDate && typeof formik.errors.pregnancyDate === 'string' ? formik.errors.pregnancyDate : undefined}
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="expectedDateToCalve"
            name="expectedDateToCalve"
            label="Expected Date to Calve"
            type="date"
            value={formik.values.expectedDateToCalve}
            onChange={formik.handleChange}
            error={formik.touched.expectedDateToCalve && Boolean(formik.errors.expectedDateToCalve)}
            helperText={formik.touched.expectedDateToCalve && typeof formik.errors.expectedDateToCalve === 'string' ? formik.errors.expectedDateToCalve : undefined}
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="dateCalved"
            name="dateCalved"
            label="Date Calved"
            type="date"
            value={formik.values.dateCalved}
            onChange={formik.handleChange}
            error={formik.touched.dateCalved && Boolean(formik.errors.dateCalved)}
            helperText={formik.touched.dateCalved && typeof formik.errors.dateCalved === 'string' ? formik.errors.dateCalved : undefined}
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="cowAge"
            name="cowAge"
            label="Cow Age"
            type="number"
            value={formik.values.cowAge}
            onChange={formik.handleChange}
            error={formik.touched.cowAge && Boolean(formik.errors.cowAge)}
            helperText={formik.touched.cowAge && typeof formik.errors.cowAge === 'string' ? formik.errors.cowAge : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="remarks"
            name="remarks"
            label="Remarks"
            value={formik.values.remarks}
            onChange={formik.handleChange}
            error={formik.touched.remarks && Boolean(formik.errors.remarks)}
            helperText={formik.touched.remarks && typeof formik.errors.remarks === 'string' ? formik.errors.remarks : undefined}
            margin="dense"
          />
          <DialogActions>
            <Button color="error" onClick={onClose} disabled={submitting}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <CircularProgress size={18} /> : breeding ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddBreeding;