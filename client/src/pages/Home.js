import React from "react";
import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Container from "@mui/material/Container";

const Home = () => {
  const [transactions, setTrasactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});

  useEffect(() => {
    fetchTransaction();
  }, []);

  async function fetchTransaction() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTrasactions(data);
  }

  return (
    <div>
      <Container>
        <TransactionForm
          fetchTransaction={fetchTransaction}
          editTransaction={editTransaction}
          setEditTransaction={setEditTransaction}
        />
        <TransactionList
          transactions={transactions}
          fetchTransaction={fetchTransaction}
          setEditTransaction={setEditTransaction}
        />
      </Container>
    </div>
  );
};

export default Home;
