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
  cowname: Yup.string().required('Cow Name is required'),
  amMilk: Yup.number().required('AM Milk is required'),
  noonMilk: Yup.number().required('Noon Milk is required'),
  pmMilk: Yup.number().required('PM Milk is required'),
  totalMilk: Yup.number().required('Total Milk is required'),
  date: Yup.date().required('Date is required'),
});

interface MilkProduction {
  _id?: string;
  cowid?: string;
  cowname: string;
  amMilk: number;
  noonMilk: number;
  pmMilk: number;
  totalMilk: number;
  date: string;
}

interface AddMilkProductionProps {
  open: boolean;
  onClose: () => void;
  milkProduction?: MilkProduction;
}

function AddMilkProduction({ open, onClose, milkProduction }: AddMilkProductionProps) {
  const [submitting, setSubmitting] = React.useState(false);
  const [cows, setCows] = React.useState<{ label: string, id: string }[]>([]);

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
        if (milkProduction) {
          await axios.put('/api/milk-productions', { id: milkProduction._id, ...values });
        } else {
          await axios.post('/api/milk-productions', values);
        }
        formik.resetForm();
        onClose();
      } catch (error) {
        console.error('Error saving milk production:', error);
      } finally {
        setSubmitting(false);
      }
    },
    validate: (values) => {
      const errors: any = {};
      if (values.amMilk + values.noonMilk + values.pmMilk !== values.totalMilk) {
        errors.totalMilk = 'Total Milk should be the sum of AM, Noon, and PM Milk';
      }
      return errors;
    },
  });

  const handleMilkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value);
    formik.setFieldValue(name, numericValue);
    const amMilk = name === 'amMilk' ? numericValue : formik.values.amMilk;
    const noonMilk = name === 'noonMilk' ? numericValue : formik.values.noonMilk;
    const pmMilk = name === 'pmMilk' ? numericValue : formik.values.pmMilk;
    formik.setFieldValue('totalMilk', amMilk + noonMilk + pmMilk);
  };

  React.useEffect(() => {
    if (milkProduction) {
      formik.setValues({
        cowname: milkProduction.cowname,
        amMilk: milkProduction.amMilk,
        noonMilk: milkProduction.noonMilk,
        pmMilk: milkProduction.pmMilk,
        totalMilk: milkProduction.totalMilk,
        date: milkProduction.date,
      });
    } else {
      formik.resetForm();
    }
  }, [milkProduction]);

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
      <DialogTitle>{milkProduction ? 'Update Milk Production' : 'Add Milk Production'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} mt={2}>
          <Autocomplete
            disablePortal
            id="cow-select"
            options={cows}
            fullWidth
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => {
              formik.setFieldValue('cowname', value?.label || '');
              formik.setFieldValue('cowid', value?.id || '');
            }}
            renderInput={(params) => (
              <TextField 
                {...params} 
                label="Select Cow" 
                placeholder="Select Cow" 
                aria-label="Select Cow"
                margin="dense"
              />
            )}
          />
          <TextField
            fullWidth
            id="amMilk"
            name="amMilk"
            label="AM Milk"
            type="number"
            value={formik.values.amMilk}
            onChange={handleMilkChange}
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
            onChange={handleMilkChange}
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
            onChange={handleMilkChange}
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
            disabled
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
              {submitting ? <CircularProgress size={18} /> : milkProduction ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddMilkProduction;