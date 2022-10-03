import { useEffect, useState } from "react";
// import Button from "@mui/material/Button";
import AppBar from "./components/AppBar";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Container from "@mui/material/Container";

function App() {
  const [transactions, setTrasactions] = useState([]);

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
      <AppBar />
      <Container>
        <TransactionForm fetchTransaction={fetchTransaction} />
        <TransactionList
          transactions={transactions}
          fetchTransaction={fetchTransaction}
        />
      </Container>
    </div>
  );
}

export default App;
