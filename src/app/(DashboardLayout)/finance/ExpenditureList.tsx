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
import AddExpenditure from "./AddExpenditure";

interface Expenditure {
  _id: string;
  date: string;
  purpose: string;
  amount: number;
}

function ExpenditureList() {
  const [expenditures, setExpenditures] = useState<Expenditure[]>([]);
  const [selectedExpenditures, setSelectedExpenditures] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [currentExpenditure, setCurrentExpenditure] = useState<Expenditure | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchExpenditures();
  }, []);

  const fetchExpenditures = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/expenditures");
      setExpenditures(response.data);
    } catch (error) {
      console.error("Error fetching expenditures:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedExpenditures(expenditures.map((expenditure) => expenditure._id));
    } else {
      setSelectedExpenditures([]);
    }
  };

  const toggleSelectExpenditure = (expenditureId: string) => {
    const index = selectedExpenditures.indexOf(expenditureId);
    if (index === -1) {
      setSelectedExpenditures([...selectedExpenditures, expenditureId]);
    } else {
      setSelectedExpenditures(selectedExpenditures.filter((id) => id !== expenditureId));
    }
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      for (const expenditureId of selectedExpenditures) {
        await axios.delete(`/api/expenditures?id=${expenditureId}`);
      }
      setSelectedExpenditures([]);
      setSelectAll(false);
      setOpenDeleteDialog(false);
      fetchExpenditures();
    } catch (error) {
      console.error('Error deleting expenditures:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenFormDialog = (expenditure: Expenditure | undefined = undefined) => {
    setCurrentExpenditure(expenditure);
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setCurrentExpenditure(undefined);
    fetchExpenditures();
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
            Add Expenditure
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
                  <Typography variant="h6" fontSize="14px">Purpose</Typography>
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
              {expenditures?.map((expenditure) => (
                <TableRow key={expenditure._id}>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {new Date(expenditure.date).toLocaleDateString('en-US')}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{expenditure.purpose}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{expenditure.amount}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Expenditure">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenFormDialog(expenditure)}
                      >
                        <IconEdit width={22} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Expenditure">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedExpenditures([expenditure._id]);
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
        <DialogContent>Are you sure you want to delete selected expenditures?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" variant="outlined" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? <CircularProgress size={18} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <AddExpenditure
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        expenditure={currentExpenditure}
      />
    </Box>
  );
}

export default ExpenditureList;
