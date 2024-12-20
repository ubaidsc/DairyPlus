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
  cowName: Yup.string().required('Cow Name is required'),
  earTag: Yup.string().required('Ear Tag is required'),
  color: Yup.string().required('Color is required'),
  breed: Yup.string().required('Breed is required'),
  dateOfBirth: Yup.date().required('Date of Birth is required'),
  age: Yup.number().required('Age is required'),
  weightAtBirth: Yup.number().required('Weight at Birth is required'),
  pasture: Yup.string().required('Pasture is required'),
});

interface Cow {
  _id?: string;
  cowId: string;
  cowName: string;
  earTag: string;
  color: string;
  breed: string;
  dateOfBirth: string;
  age: number;
  weightAtBirth: number;
  pasture: string;
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
      cowName: '',
      earTag: '',
      color: '',
      breed: '',
      dateOfBirth: '',
      age: 0,
      weightAtBirth: 0,
      pasture: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
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
        cowName: cow.cowName,
        earTag: cow.earTag,
        color: cow.color,
        breed: cow.breed,
        dateOfBirth: cow.dateOfBirth,
        age: cow.age,
        weightAtBirth: cow.weightAtBirth,
        pasture: cow.pasture,
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
            id="cowName"
            name="cowName"
            label="Cow Name"
            value={formik.values.cowName}
            onChange={formik.handleChange}
            error={formik.touched.cowName && Boolean(formik.errors.cowName)}
            helperText={formik.touched.cowName && typeof formik.errors.cowName === 'string' ? formik.errors.cowName : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="earTag"
            name="earTag"
            label="Ear Tag"
            value={formik.values.earTag}
            onChange={formik.handleChange}
            error={formik.touched.earTag && Boolean(formik.errors.earTag)}
            helperText={formik.touched.earTag && typeof formik.errors.earTag === 'string' ? formik.errors.earTag : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="color"
            name="color"
            label="Color"
            value={formik.values.color}
            onChange={formik.handleChange}
            error={formik.touched.color && Boolean(formik.errors.color)}
            helperText={formik.touched.color && typeof formik.errors.color === 'string' ? formik.errors.color : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="breed"
            name="breed"
            label="Breed"
            value={formik.values.breed}
            onChange={formik.handleChange}
            error={formik.touched.breed && Boolean(formik.errors.breed)}
            helperText={formik.touched.breed && typeof formik.errors.breed === 'string' ? formik.errors.breed : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
            helperText={formik.touched.dateOfBirth && typeof formik.errors.dateOfBirth === 'string' ? formik.errors.dateOfBirth : undefined}
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="age"
            name="age"
            label="Age"
            type="number"
            value={formik.values.age}
            onChange={formik.handleChange}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && typeof formik.errors.age === 'string' ? formik.errors.age : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="weightAtBirth"
            name="weightAtBirth"
            label="Weight at Birth"
            type="number"
            value={formik.values.weightAtBirth}
            onChange={formik.handleChange}
            error={formik.touched.weightAtBirth && Boolean(formik.errors.weightAtBirth)}
            helperText={formik.touched.weightAtBirth && typeof formik.errors.weightAtBirth === 'string' ? formik.errors.weightAtBirth : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="pasture"
            name="pasture"
            label="Pasture"
            value={formik.values.pasture}
            onChange={formik.handleChange}
            error={formik.touched.pasture && Boolean(formik.errors.pasture)}
            helperText={formik.touched.pasture && typeof formik.errors.pasture === 'string' ? formik.errors.pasture : undefined}
            margin="dense"
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
