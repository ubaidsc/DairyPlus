"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
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
  CircularProgress,
} from "@mui/material";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import AddIncome from "./AddIncome";

interface Income {
  _id: string;
  date: string;
  type: string;
  amount: number;
}

function IncomeList() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [selectedIncomes, setSelectedIncomes] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [currentIncome, setCurrentIncome] = useState<Income | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchIncomes();
  }, []);

  const fetchIncomes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/incomes");
      setIncomes(response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedIncomes(incomes.map((income) => income._id));
    } else {
      setSelectedIncomes([]);
    }
  };

  const toggleSelectIncome = (incomeId: string) => {
    const index = selectedIncomes.indexOf(incomeId);
    if (index === -1) {
      setSelectedIncomes([...selectedIncomes, incomeId]);
    } else {
      setSelectedIncomes(selectedIncomes.filter((id) => id !== incomeId));
    }
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      for (const incomeId of selectedIncomes) {
        await axios.delete(`/api/incomes?id=${incomeId}`);
      }
      setSelectedIncomes([]);
      setSelectAll(false);
      setOpenDeleteDialog(false);
      fetchIncomes();
    } catch (error) {
      console.error('Error deleting incomes:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenFormDialog = (income: Income | undefined = undefined) => {
    setCurrentIncome(income);
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setCurrentIncome(undefined);
    fetchIncomes();
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
            Add Income
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
                  <Typography variant="h6" fontSize="14px">Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Type</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Amount</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontSize="14px">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {incomes?.map((income) => (
                <TableRow key={income._id}>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {new Date(income.date).toLocaleDateString('en-US')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{income.type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{income.amount}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Income">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenFormDialog(income)}
                      >
                        <IconEdit width={22} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Income">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedIncomes([income._id]);
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
        <DialogContent>Are you sure you want to delete selected incomes?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" variant="outlined" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? <CircularProgress size={18} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <AddIncome
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        income={currentIncome}
      />
    </Box>
  );
}

export default IncomeList;
