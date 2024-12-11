"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Stack,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import {
  IconSearch,
  IconTrash,
  IconEdit,
} from "@tabler/icons-react";
import CustomCheckbox from "@/app/components/forms/theme-elements/CustomCheckbox";
import axios from "axios";
import AddEmployee from "./AddEmployee";

interface Employee {
  _id: string;
  userName: string;
  name: string;
  phone: string;
  gender: string;
  address: string;
  dob: string;
  password: string;
}

function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedEmployees(employees.map((employee: { _id: any }) => employee._id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const toggleSelectEmployee = (employeeId: any) => {
    const index = selectedEmployees.indexOf(employeeId);
    if (index === -1) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter((id: any) => id !== employeeId));
    }
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      for (const employeeId of selectedEmployees) {
        await axios.delete(`/api/employees?id=${employeeId}`);
      }
      setSelectedEmployees([]);
      setSelectAll(false);
      setOpenDeleteDialog(false);
      fetchEmployees();
    } catch (error) {
      console.error('Error deleting employees:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenFormDialog = (employee: Employee | undefined = undefined) => {
    setCurrentEmployee(employee);
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setCurrentEmployee(undefined);
    fetchEmployees();
  };

  return (
    <Box>
      <Stack
        mt={3}
        justifyContent="end"
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Box display="flex" gap={1}>
          {selectAll && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              startIcon={deleting ? <CircularProgress size={18} /> : <IconTrash width={18} />}
              disabled={deleting}
            >
              Delete All
            </Button>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpenFormDialog()}
          >
            Add Employee
          </Button>
        </Box>
      </Stack>

      <Box sx={{ overflowX: "auto" }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress />
          </Box>
        ) : (
          <Table sx={{ whiteSpace: { xs: "nowrap", md: "unset" } }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">User Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Phone</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Gender</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Address</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">DOB</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Password</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontSize="14px">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee: any) => (
                <TableRow key={employee._id}>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{employee.userName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{employee.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{employee.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{employee.gender}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{employee.address}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {new Date(employee.dob).toLocaleDateString('en-US')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{employee.password}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Employee">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenFormDialog(employee)}
                      >
                        <IconEdit width={22} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Employee">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedEmployees([employee._id]);
                          handleDelete();
                        }}
                      >
                        <IconTrash width={22} />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete selected employees?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" variant="outlined" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? <CircularProgress size={18} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <AddEmployee
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        employee={currentEmployee}
      />
    </Box>
  );
}

export default EmployeeList;
