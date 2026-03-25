import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/transactions/${user.id}`)
      .then((res) => setTransactions(res.data));
  }, []);

  const total = transactions.reduce((acc, t) => {
    return t.type === "income"
      ? acc + t.amount
      : acc - t.amount;
  }, 0);

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Total Balance: ₹{total}</h3>

      <button onClick={() => navigate("/add")}>
        Add Transaction
      </button>

      <div>
  {transactions.map((t) => (
    <div
      key={t.id}
      className={`transaction ${t.type === "income" ? "income" : "expense"}`}
    >
      <span>{t.category}</span>
      <span>₹{t.amount}</span>
    </div>
  ))}
</div>
    </div>
  );
}