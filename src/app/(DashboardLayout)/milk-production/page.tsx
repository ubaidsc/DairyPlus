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
import AddMilkProduction from "./AddMilkProduction";

interface MilkProduction {
  _id: string;
  cowid: string;
  cowname: string;
  amMilk: number;
  noonMilk: number;
  pmMilk: number;
  totalMilk: number;
  date: string;
}

function MilkProductionList() {
  const [milkProductions, setMilkProductions] = useState<MilkProduction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMilkProductions, setSelectedMilkProductions] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [currentMilkProduction, setCurrentMilkProduction] = useState<MilkProduction | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchMilkProductions();
  }, []);

  const fetchMilkProductions = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/milk-productions");
      setMilkProductions(response.data);
    } catch (error) {
      console.error("Error fetching milk productions:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedMilkProductions(milkProductions.map((milkProduction: { _id: any }) => milkProduction._id));
    } else {
      setSelectedMilkProductions([]);
    }
  };

  const toggleSelectMilkProduction = (milkProductionId: any) => {
    const index = selectedMilkProductions.indexOf(milkProductionId);
    if (index === -1) {
      setSelectedMilkProductions([...selectedMilkProductions, milkProductionId]);
    } else {
      setSelectedMilkProductions(selectedMilkProductions.filter((id: any) => id !== milkProductionId));
    }
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      for (const milkProductionId of selectedMilkProductions) {
        console.log('Deleting milk production with ID:', milkProductionId);
        await axios.delete(`/api/milk-productions?id=${milkProductionId}`);
      }
      setSelectedMilkProductions([]);
      setSelectAll(false);
      setOpenDeleteDialog(false);
      fetchMilkProductions();
    } catch (error) {
      console.error('Error deleting milk productions:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenFormDialog = (milkProduction: MilkProduction | undefined = undefined) => {
    setCurrentMilkProduction(milkProduction);
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setCurrentMilkProduction(undefined);
    fetchMilkProductions();
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
            Add Milk Production
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
              {milkProductions.map((milkProduction: any) => (
                <TableRow key={milkProduction._id}>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{milkProduction.cowid}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{milkProduction.cowname}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{milkProduction.amMilk}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{milkProduction.noonMilk}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{milkProduction.pmMilk}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{milkProduction.totalMilk}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {new Date(milkProduction.date).toLocaleDateString('en-US')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Milk Production">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenFormDialog(milkProduction)}
                      >
                        <IconEdit width={22} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Milk Production">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedMilkProductions([milkProduction._id]);
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
        <DialogContent>Are you sure you want to delete selected milk productions?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" variant="outlined" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? <CircularProgress size={18} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <AddMilkProduction
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        milkProduction={currentMilkProduction}
      />
    </Box>
  );
}

export default MilkProductionList;
