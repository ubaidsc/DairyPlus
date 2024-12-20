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
  employeeId: Yup.string().required('Employee ID is required'),
  date: Yup.date().required('Date is required'),
  price: Yup.number().required('Price is required'),
  clientName: Yup.string().required('Client Name is required'),
  clientPhone: Yup.string().required('Client Phone is required'),
  quality: Yup.string().required('Quality is required'),
  total: Yup.number().required('Total is required'),
});

interface MilkSale {
  _id?: string;
  employeeId: string;
  date: string;
  price: number;
  clientName: string;
  clientPhone: string;
  quality: string;
  total: number;
}

interface AddMilkSaleProps {
  open: boolean;
  onClose: () => void;
  milkSale?: MilkSale;
}

function AddMilkSale({ open, onClose, milkSale }: AddMilkSaleProps) {
  const [submitting, setSubmitting] = React.useState(false);
  const [employees, setEmployees] = React.useState<{ label: string, id: string }[]>([]);

  const formik = useFormik({
    initialValues: {
      employeeId: '',
      date: '',
      price: 0,
      clientName: '',
      clientPhone: '',
      quality: '',
      total: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        console.log('Submitting form data:', values);
        if (milkSale) {
          await axios.put('/api/milk-sales', { id: milkSale._id, ...values });
        } else {
          await axios.post('/api/milk-sales', values);
        }
        formik.resetForm();
        onClose();
      } catch (error) {
        console.error('Error saving milk sale:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  React.useEffect(() => {
    if (milkSale) {
      formik.setValues({
        employeeId: milkSale.employeeId,
        date: milkSale.date,
        price: milkSale.price,
        clientName: milkSale.clientName,
        clientPhone: milkSale.clientPhone,
        quality: milkSale.quality,
        total: milkSale.total,
      });
    } else {
      formik.resetForm();
    }
  }, [milkSale]);

  React.useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        setEmployees(response.data.map((employee: any) => ({ label: employee.name, id: employee._id })));
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{milkSale ? 'Update Milk Sale' : 'Add Milk Sale'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} mt={2}>
          <Autocomplete
            options={employees}
            getOptionLabel={(option) => option.label}
            onChange={(event, value) => {
              formik.setFieldValue('employeeId', value?.id || '');
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                id="employeeId"
                name="employeeId"
                label="Employee"
                value={formik.values.employeeId}
                onChange={formik.handleChange}
                error={formik.touched.employeeId && Boolean(formik.errors.employeeId)}
                helperText={formik.touched.employeeId && typeof formik.errors.employeeId === 'string' ? formik.errors.employeeId : undefined}
                margin="dense"
              />
            )}
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
          <TextField
            fullWidth
            id="price"
            name="price"
            label="Price"
            type="number"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && typeof formik.errors.price === 'string' ? formik.errors.price : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="clientName"
            name="clientName"
            label="Client Name"
            value={formik.values.clientName}
            onChange={formik.handleChange}
            error={formik.touched.clientName && Boolean(formik.errors.clientName)}
            helperText={formik.touched.clientName && typeof formik.errors.clientName === 'string' ? formik.errors.clientName : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="clientPhone"
            name="clientPhone"
            label="Client Phone"
            value={formik.values.clientPhone}
            onChange={formik.handleChange}
            error={formik.touched.clientPhone && Boolean(formik.errors.clientPhone)}
            helperText={formik.touched.clientPhone && typeof formik.errors.clientPhone === 'string' ? formik.errors.clientPhone : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="quality"
            name="quality"
            label="Quality"
            value={formik.values.quality}
            onChange={formik.handleChange}
            error={formik.touched.quality && Boolean(formik.errors.quality)}
            helperText={formik.touched.quality && typeof formik.errors.quality === 'string' ? formik.errors.quality : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="total"
            name="total"
            label="Total"
            type="number"
            value={formik.values.total}
            onChange={formik.handleChange}
            error={formik.touched.total && Boolean(formik.errors.total)}
            helperText={formik.touched.total && typeof formik.errors.total === 'string' ? formik.errors.total : undefined}
            margin="dense"
          />
          <DialogActions>
            <Button color="error" onClick={onClose} disabled={submitting}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <CircularProgress size={18} /> : milkSale ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddMilkSale;