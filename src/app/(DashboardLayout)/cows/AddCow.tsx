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

const validationSchema = Yup.object({
  cowname: Yup.string().required('Cow Name is required'),
  amMilk: Yup.number().required('AM Milk is required'),
  noonMilk: Yup.number().required('Noon Milk is required'),
  pmMilk: Yup.number().required('PM Milk is required'),
  totalMilk: Yup.number().required('Total Milk is required'),
  date: Yup.date().required('Date is required'),
});

interface Cow {
  _id?: string;
  cowid?: string;
  cowname: string;
  amMilk: number;
  noonMilk: number;
  pmMilk: number;
  totalMilk: number;
  date: string;
}

interface AddCowProps {
  open: boolean;
  onClose: () => void;
  cow?: Cow;
}

function AddCow({ open, onClose, cow }: AddCowProps) {
  const [submitting, setSubmitting] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      cowname: '',
      amMilk: 0,
      noonMilk: 0,
      pmMilk: 0,
      totalMilk: 0,
      date: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        console.log('Submitting form data:', values);
        if (cow) {
          await axios.put('/api/cows', { id: cow._id, ...values });
        } else {
          await axios.post('/api/cows', values);
        }
        formik.resetForm();
        onClose();
      } catch (error) {
        console.error('Error saving cow:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  React.useEffect(() => {
    if (cow) {
      formik.setValues({
        cowname: cow.cowname,
        amMilk: cow.amMilk,
        noonMilk: cow.noonMilk,
        pmMilk: cow.pmMilk,
        totalMilk: cow.totalMilk,
        date: cow.date,
      });
    } else {
      formik.resetForm();
    }
  }, [cow]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{cow ? 'Update Cow' : 'Add Cow'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} mt={2}>
          <TextField
            fullWidth
            id="cowname"
            name="cowname"
            label="Cow Name"
            value={formik.values.cowname}
            onChange={formik.handleChange}
            error={formik.touched.cowname && Boolean(formik.errors.cowname)}
            helperText={formik.touched.cowname && typeof formik.errors.cowname === 'string' ? formik.errors.cowname : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="amMilk"
            name="amMilk"
            label="AM Milk"
            type="number"
            value={formik.values.amMilk}
            onChange={formik.handleChange}
            error={formik.touched.amMilk && Boolean(formik.errors.amMilk)}
            helperText={formik.touched.amMilk && typeof formik.errors.amMilk === 'string' ? formik.errors.amMilk : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="noonMilk"
            name="noonMilk"
            label="Noon Milk"
            type="number"
            value={formik.values.noonMilk}
            onChange={formik.handleChange}
            error={formik.touched.noonMilk && Boolean(formik.errors.noonMilk)}
            helperText={formik.touched.noonMilk && typeof formik.errors.noonMilk === 'string' ? formik.errors.noonMilk : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="pmMilk"
            name="pmMilk"
            label="PM Milk"
            type="number"
            value={formik.values.pmMilk}
            onChange={formik.handleChange}
            error={formik.touched.pmMilk && Boolean(formik.errors.pmMilk)}
            helperText={formik.touched.pmMilk && typeof formik.errors.pmMilk === 'string' ? formik.errors.pmMilk : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="totalMilk"
            name="totalMilk"
            label="Total Milk"
            type="number"
            value={formik.values.totalMilk}
            onChange={formik.handleChange}
            error={formik.touched.totalMilk && Boolean(formik.errors.totalMilk)}
            helperText={formik.touched.totalMilk && typeof formik.errors.totalMilk === 'string' ? formik.errors.totalMilk : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="date"
            name="date"
            label="Date"
            type="date"
            value={formik.values.date}
            onChange={formik.handleChange}
            error={formik.touched.date && Boolean(formik.errors.date)}
            helperText={formik.touched.date && typeof formik.errors.date === 'string' ? formik.errors.date : undefined}
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DialogActions>
            <Button color="error" onClick={onClose} disabled={submitting}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <CircularProgress size={18} /> : cow ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddCow;