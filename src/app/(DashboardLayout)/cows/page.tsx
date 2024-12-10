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
import AddCow from "./AddCow";

interface Cow {
  _id: string;
  cowid: string;
  cowname: string;
  amMilk: number;
  noonMilk: number;
  pmMilk: number;
  totalMilk: number;
  date: string;
}

function CowList() {
  const [cows, setCows] = useState<Cow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCows, setSelectedCows] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [currentCow, setCurrentCow] = useState<Cow | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCows();
  }, []);

  const fetchCows = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/cows");
      setCows(response.data);
    } catch (error) {
      console.error("Error fetching cows:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedCows(cows.map((cow: { _id: any }) => cow._id));
    } else {
      setSelectedCows([]);
    }
  };

  const toggleSelectCow = (cowId: any) => {
    const index = selectedCows.indexOf(cowId);
    if (index === -1) {
      setSelectedCows([...selectedCows, cowId]);
    } else {
      setSelectedCows(selectedCows.filter((id: any) => id !== cowId));
    }
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      for (const cowId of selectedCows) {
        console.log('Deleting cow with ID:', cowId);
        await axios.delete(`/api/cows?id=${cowId}`);
      }
      setSelectedCows([]);
      setSelectAll(false);
      setOpenDeleteDialog(false);
      fetchCows();
    } catch (error) {
      console.error('Error deleting cows:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenFormDialog = (cow: Cow | undefined = undefined) => {
    setCurrentCow(cow);
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setCurrentCow(undefined);
    fetchCows();
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
            Add Cow
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
                  <Typography variant="h6" fontSize="14px">Cow ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Cow Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">AM Milk</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Noon Milk</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">PM Milk</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Total Milk</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Date</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontSize="14px">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cows.map((cow: any) => (
                <TableRow key={cow._id}>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{cow.cowid}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{cow.cowname}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{cow.amMilk}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{cow.noonMilk}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{cow.pmMilk}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{cow.totalMilk}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {new Date(cow.date).toLocaleDateString('en-US')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Cow">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenFormDialog(cow)}
                      >
                        <IconEdit width={22} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Cow">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedCows([cow._id]);
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
        <DialogContent>Are you sure you want to delete selected cows?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" variant="outlined" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? <CircularProgress size={18} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <AddCow
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        cow={currentCow}
      />
    </Box>
  );
}

export default CowList;
