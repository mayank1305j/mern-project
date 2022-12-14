import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Button from "@mui/material/Button";

const initialForm = {
  amount: 0,
  description: "",
  date: new Date(),
};

export default function TransactionForm({
  fetchTransaction,
  editTransaction,
  setEditTransaction,
}) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      setForm(editTransaction);
    }
  }, [editTransaction]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    editTransaction.amount === undefined ? create() : update();

    async function create() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}transaction`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        fetchTransaction();
        setForm(initialForm);
      }
    }

    async function update() {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`,
        {
          method: "PATCH",
          body: JSON.stringify(form),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.ok) {
        fetchTransaction();
        setForm(initialForm);
        setEditTransaction({});
      }
    }
  }

  return (
    <Card sx={{ minWidth: 275, marginTop: 5 }}>
      <CardContent>
        <Typography variant="h6">Add New Transaction</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            size="small"
            onChange={handleChange}
            value={form.amount}
            name="amount"
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            size="small"
            onChange={handleChange}
            value={form.description}
            name="description"
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Transaction Date"
              inputFormat="MM/DD/YYYY"
              onChange={handleDate}
              value={form.date}
              name="date"
              renderInput={(params) => (
                <TextField sx={{ marginRight: 5 }} size="small" {...params} />
              )}
            />
          </LocalizationProvider>
          {editTransaction.amount !== undefined && (
            <Button type="submit" variant="secondary">
              Update
            </Button>
          )}
          {editTransaction.amount === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
