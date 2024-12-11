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
import AddHealthReport from "./AddHealthReport";

interface HealthRecord {
  _id: string;
  cowId: string;
  cowName: string;
  event: string;
  diagnosis: string;
  treatment: string;
  costOfTreatment: number;
  vetName: string;
}

function HealthList() {
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRecords, setSelectedRecords] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<HealthRecord | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchHealthRecords();
  }, []);

  const fetchHealthRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/health");
      setHealthRecords(response.data);
    } catch (error) {
      console.error("Error fetching health records:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedRecords(healthRecords.map((record: { _id: any }) => record._id));
    } else {
      setSelectedRecords([]);
    }
  };

  const toggleSelectRecord = (recordId: any) => {
    const index = selectedRecords.indexOf(recordId);
    if (index === -1) {
      setSelectedRecords([...selectedRecords, recordId]);
    } else {
      setSelectedRecords(selectedRecords.filter((id: any) => id !== recordId));
    }
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      for (const recordId of selectedRecords) {
        console.log('Deleting health record with ID:', recordId);
        await axios.delete(`/api/health?id=${recordId}`);
      }
      setSelectedRecords([]);
      setSelectAll(false);
      setOpenDeleteDialog(false);
      fetchHealthRecords();
    } catch (error) {
      console.error('Error deleting health records:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenFormDialog = (record: HealthRecord | undefined = undefined) => {
    setCurrentRecord(record);
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setCurrentRecord(undefined);
    fetchHealthRecords();
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
            Add Health Record
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
                  <Typography variant="h6" fontSize="14px">Event</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Diagnosis</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Treatment</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Cost of Treatment</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Vet Name</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontSize="14px">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {healthRecords.map((record: HealthRecord) => (
                <TableRow key={record._id}>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{record.cowId}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{record.cowName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{record.event}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{record.diagnosis}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{record.treatment}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{record.costOfTreatment}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{record.vetName}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Health Record">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenFormDialog(record)}
                      >
                        <IconEdit width={22} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Health Record">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedRecords([record._id]);
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
        <DialogContent>Are you sure you want to delete selected health records?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" variant="outlined" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? <CircularProgress size={18} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <AddHealthReport
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        healthRecord={currentRecord}
      />
    </Box>
  );
}

export default HealthList;
