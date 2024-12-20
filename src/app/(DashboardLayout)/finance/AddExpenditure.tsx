"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

interface Expenditure {
  _id?: string;
  date: string;
  purpose: string;
  amount: number;
}

interface AddExpenditureProps {
  open: boolean;
  onClose: () => void;
  expenditure?: Expenditure;
}

const AddExpenditure: React.FC<AddExpenditureProps> = ({ open, onClose, expenditure }) => {
  const [formData, setFormData] = useState<Expenditure>({
    date: "",
    purpose: "",
    amount: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (expenditure) {
      setFormData(expenditure);
    } else {
      setFormData({
        date: "",
        purpose: "",
        amount: 0,
      });
    }
  }, [expenditure]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (expenditure) {
        await axios.put("/api/expenditures", { id: expenditure._id, ...formData });
      } else {
        await axios.post("/api/expenditures", formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving expenditure:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{expenditure ? "Edit Expenditure" : "Add Expenditure"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="date"
          label="Date"
          type="date"
          fullWidth
          variant="outlined"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          margin="dense"
          name="purpose"
          label="Purpose"
          fullWidth
          variant="outlined"
          value={formData.purpose}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="amount"
          label="Amount"
          type="number"
          fullWidth
          variant="outlined"
          value={formData.amount}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenditure;
