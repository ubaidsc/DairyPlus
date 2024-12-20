"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
  Stack,
} from "@mui/material";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import axios from "axios";
import AddCow from "./AddCow";

interface Cow {
  _id: string;
  cowId: string;
  cowName: string;
  earTag: string;
  color: string;
  breed: string;
  dateOfBirth: string;
  age: number;
  weightAtBirth: number;
  pasture: string;
}

const CowList: React.FC = () => {
  const [cows, setCows] = useState<Cow[]>([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [currentCow, setCurrentCow] = useState<Cow | undefined>(undefined);
  const [selectedCows, setSelectedCows] = useState<string[]>([]);
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

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      for (const cowId of selectedCows) {
        await axios.delete(`/api/cows?id=${cowId}`);
      }
      setSelectedCows([]);
      setOpenDeleteDialog(false);
      fetchCows();
    } catch (error) {
      console.error("Error deleting cows:", error);
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
                  <Typography variant="h6" fontSize="14px">
                    Cow ID
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Cow Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Ear Tag
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Color
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Breed
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    DOB
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Age
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Weight at Birth
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">
                    Pasture
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontSize="14px">
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cows.map((cow) => (
                <TableRow key={cow._id}>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {cow.cowId}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {cow.cowName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {cow.earTag}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {cow.color}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {cow.breed}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {new Date(cow.dateOfBirth).toLocaleDateString("en-US")}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {cow.age}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {cow.weightAtBirth}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">
                      {cow.pasture}
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
        <DialogContent>
          Are you sure you want to delete selected cows?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>
            Cancel
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={handleConfirmDelete}
            disabled={deleting}
          >
            {deleting ? <CircularProgress size={18} /> : "Delete"}
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
};

export default CowList;
