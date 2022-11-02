import React from "react";
import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import Container from "@mui/material/Container";
import Cookies from "js-cookie";

const Home = () => {
  const [transactions, setTrasactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState({});
  const token = Cookies.get("token");

  useEffect(() => {
    fetchTransaction();
  }, []);

  async function fetchTransaction() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
