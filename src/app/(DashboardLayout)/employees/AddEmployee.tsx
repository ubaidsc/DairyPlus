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
  userName: Yup.string().required('User Name is required'),
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required'),
  gender: Yup.string().required('Gender is required'),
  address: Yup.string().required('Address is required'),
  dob: Yup.date().required('Date of Birth is required'),
  password: Yup.string().required('Password is required'),
});

interface Employee {
  _id?: string;
  userName: string;
  name: string;
  phone: string;
  gender: string;
  address: string;
  dob: string;
  password: string;
}

interface AddEmployeeProps {
  open: boolean;
  onClose: () => void;
  employee?: Employee;
}

function AddEmployee({ open, onClose, employee }: AddEmployeeProps) {
  const [submitting, setSubmitting] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      userName: '',
      name: '',
      phone: '',
      gender: '',
      address: '',
      dob: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        console.log('Submitting form data:', values);
        if (employee) {
          await axios.put('/api/employees', { id: employee._id, ...values });
        } else {
          await axios.post('/api/employees', values);
        }
        formik.resetForm();
        onClose();
      } catch (error) {
        console.error('Error saving employee:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  React.useEffect(() => {
    if (employee) {
      formik.setValues({
        userName: employee.userName,
        name: employee.name,
        phone: employee.phone,
        gender: employee.gender,
        address: employee.address,
        dob: employee.dob,
        password: employee.password,
      });
    } else {
      formik.resetForm();
    }
  }, [employee]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{employee ? 'Update Employee' : 'Add Employee'}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={formik.handleSubmit} mt={2}>
          <TextField
            fullWidth
            id="userName"
            name="userName"
            label="User Name"
            value={formik.values.userName}
            onChange={formik.handleChange}
            error={formik.touched.userName && Boolean(formik.errors.userName)}
            helperText={formik.touched.userName && typeof formik.errors.userName === 'string' ? formik.errors.userName : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && typeof formik.errors.name === 'string' ? formik.errors.name : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="phone"
            name="phone"
            label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && typeof formik.errors.phone === 'string' ? formik.errors.phone : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="gender"
            name="gender"
            label="Gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            helperText={formik.touched.gender && typeof formik.errors.gender === 'string' ? formik.errors.gender : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="address"
            name="address"
            label="Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && typeof formik.errors.address === 'string' ? formik.errors.address : undefined}
            margin="dense"
          />
          <TextField
            fullWidth
            id="dob"
            name="dob"
            label="Date of Birth"
            type="date"
            value={formik.values.dob}
            onChange={formik.handleChange}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && typeof formik.errors.dob === 'string' ? formik.errors.dob : undefined}
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && typeof formik.errors.password === 'string' ? formik.errors.password : undefined}
            margin="dense"
          />
          <DialogActions>
            <Button color="error" onClick={onClose} disabled={submitting}>Cancel</Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <CircularProgress size={18} /> : employee ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default AddEmployee;