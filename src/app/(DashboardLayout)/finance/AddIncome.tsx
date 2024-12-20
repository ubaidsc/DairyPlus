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
  MenuItem,
} from "@mui/material";
import axios from "axios";

interface Income {
  _id?: string;
  date: string;
  type: string;
  amount: number;
}

interface AddIncomeProps {
  open: boolean;
  onClose: () => void;
  income?: Income;
}

const AddIncome: React.FC<AddIncomeProps> = ({ open, onClose, income }) => {
  const [formData, setFormData] = useState<Income>({
    date: "",
    type: "",
    amount: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (income) {
      setFormData(income);
    } else {
      setFormData({
        date: "",
        type: "",
        amount: 0,
      });
    }
  }, [income]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (income) {
        await axios.put("/api/incomes", { id: income._id, ...formData });
      } else {
        await axios.post("/api/incomes", formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving income:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{income ? "Edit Income" : "Add Income"}</DialogTitle>
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
          name="type"
          label="Type"
          select
          fullWidth
          variant="outlined"
          value={formData.type}
          onChange={handleChange}
        >
          <MenuItem value="Salary">Salary</MenuItem>
          <MenuItem value="Bonus">Bonus</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
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

export default AddIncome;
