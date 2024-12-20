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
import {
  IconSearch,
  IconTrash,
  IconEdit,
} from "@tabler/icons-react";
import axios from "axios";
import AddMilkSale from "./AddMilkSale";

interface MilkSale {
  _id: string;
  employeeId: string;
  date: string;
  price: number;
  clientName: string;
  clientPhone: string;
  quality: string;
  total: number;
}

function MilkSalesList() {
  const [milkSales, setMilkSales] = useState<MilkSale[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMilkSales, setSelectedMilkSales] = useState<any>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [currentMilkSale, setCurrentMilkSale] = useState<MilkSale | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchMilkSales();
  }, []);

  const fetchMilkSales = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/milk-sales");
      setMilkSales(response.data);
    } catch (error) {
      console.error("Error fetching milk sales:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSelectAll = () => {
    const selectAllValue = !selectAll;
    setSelectAll(selectAllValue);
    if (selectAllValue) {
      setSelectedMilkSales(milkSales.map((sale: { _id: any }) => sale._id));
    } else {
      setSelectedMilkSales([]);
    }
  };

  const toggleSelectMilkSale = (saleId: any) => {
    const index = selectedMilkSales.indexOf(saleId);
    if (index === -1) {
      setSelectedMilkSales([...selectedMilkSales, saleId]);
    } else {
      setSelectedMilkSales(selectedMilkSales.filter((id: any) => id !== saleId));
    }
  };

  const handleDelete = () => {
    setOpenDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    setDeleting(true);
    try {
      for (const saleId of selectedMilkSales) {
        await axios.delete(`/api/milk-sales?id=${saleId}`);
      }
      setSelectedMilkSales([]);
      setSelectAll(false);
      setOpenDeleteDialog(false);
      fetchMilkSales();
    } catch (error) {
      console.error('Error deleting milk sales:', error);
    } finally {
      setDeleting(false);
    }
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleOpenFormDialog = (milkSale: MilkSale | undefined = undefined) => {
    setCurrentMilkSale(milkSale);
    setOpenFormDialog(true);
  };

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    setCurrentMilkSale(undefined);
    fetchMilkSales();
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
            Add Milk Sale
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
                  <Typography variant="h6" fontSize="14px">Employee ID</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Date</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Price</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Client Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Client Phone</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Quality</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" fontSize="14px">Total</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6" fontSize="14px">Action</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {milkSales.map((milkSale: any) => (
                <TableRow key={milkSale._id}>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{milkSale.employeeId}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{new Date(milkSale.date).toLocaleDateString('en-US')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{milkSale.price}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{milkSale.clientName}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{milkSale.clientPhone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{milkSale.quality}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" fontSize="14px">{milkSale.total}</Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit Milk Sale">
                      <IconButton
                        color="primary"
                        onClick={() => handleOpenFormDialog(milkSale)}
                      >
                        <IconEdit width={22} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Milk Sale">
                      <IconButton
                        color="error"
                        onClick={() => {
                          setSelectedMilkSales([milkSale._id]);
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
        <DialogContent>Are you sure you want to delete selected milk sales?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button color="error" variant="outlined" onClick={handleConfirmDelete} disabled={deleting}>
            {deleting ? <CircularProgress size={18} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
      <AddMilkSale
        open={openFormDialog}
        onClose={handleCloseFormDialog}
        milkSale={currentMilkSale}
      />
    </Box>
  );
}

export default MilkSalesList;
