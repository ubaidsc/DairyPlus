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
import AddBreeding from "./Addbreeding";

interface Breeding {
  _id: string;
  cowId: string;
  cowName: string;
  heatDate: string;
  breedDate: string;
  pregnancyDate: string;
  expectedDateToCalve: string;
  dateCalved: string;
  cowAge: number;
  remarks: string;
}

function BreedingList() {
  const [breedings, setBreedings] = useState<Breeding[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBreedings, setSelectedBreedings] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [currentBreeding, setCurrentBreeding] = useState<Breeding | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBreedings();
  }, []);

  const fetchBreedings = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/breeding");
      setBreedings(response.data);
    } catch (error) {
      console.error("Error fetching breedings:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedBreedings(breedings.map((breeding: { _id: any }) => breeding._id));
    } else {
      setSelectedBreedings([]);
    }
  };

  const toggleSelectBreeding = (breedingId: any) => {
    const index = selectedBreedings.indexOf(breedingId);
    if (index === -1) {
      setSelectedBreedings([...selectedBreedings, breedingId]);
    } else {
      setSelectedBreedings(selectedBreedings.filter((id: any) => id !== breedingId));
    }
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenFormDialog = (breeding: Breeding | undefined = undefined) => {
    setCurrentBreeding(breeding);
    setOpenFormDialog(true);
  };

const handleConfirmDelete = async () => {
  setDeleting(true);
  try {
    for (const breedingId of selectedBreedings) {
      await axios.delete(`/api/breeding?id=${breedingId}`);
    }
    setSelectedBreedings([]);
    setSelectAll(false);
    setOpenDeleteDialog(false);
    fetchBreedings();
  } catch (error) {
    console.error('Error deleting breedings:', error);
  } finally {
    setDeleting(false);
  }
};

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setCurrentBreeding(undefined);
    fetchBreedings();
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
            Add Breeding
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
                  <Typography variant="h6" fontSize="14px">Heat Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Breed Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Pregnancy Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Expected Date to Calve</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Date Calved</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Cow Age</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Remarks</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontSize="14px">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {breedings.map((breeding: any) => (
                <TableRow key={breeding._id}>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{breeding.cowId}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{breeding.cowName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{new Date(breeding.heatDate).toLocaleDateString('en-US')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{new Date(breeding.breedDate).toLocaleDateString('en-US')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{new Date(breeding.pregnancyDate).toLocaleDateString('en-US')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{new Date(breeding.expectedDateToCalve).toLocaleDateString('en-US')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{new Date(breeding.dateCalved).toLocaleDateString('en-US')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{breeding.cowAge}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{breeding.remarks}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Breeding">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenFormDialog(breeding)}
                      >
                        <IconEdit width={22} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Breeding">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedBreedings([breeding._id]);
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
        <DialogContent>Are you sure you want to delete selected breedings?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" variant="outlined" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? <CircularProgress size={18} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <AddBreeding
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        breeding={currentBreeding}
      />
    </Box>
  );
}

export default BreedingList;
