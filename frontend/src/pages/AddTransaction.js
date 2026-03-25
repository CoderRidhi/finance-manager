import { useState } from "react";
import axios from "axios";

export default function AddTransaction() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [data, setData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: ""
  });

  const handleSubmit = async () => {
    await axios.post(
      "http://localhost:5000/api/transactions/add",
      {
        ...data,
        user_id: user.id
      }
    );

    alert("Transaction Added");
  };

  return (
    <div>
      <h2>Add Transaction</h2>

      <select
        onChange={(e) =>
          setData({ ...data, type: e.target.value })
        }
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <input
        placeholder="Amount"
        onChange={(e) =>
          setData({ ...data, amount: e.target.value })
        }
      />

      <input
        placeholder="Category"
        onChange={(e) =>
          setData({ ...data, category: e.target.value })
        }
      />

      <input
        placeholder="Description"
        onChange={(e) =>
          setData({ ...data, description: e.target.value })
        }
      />

      <input
        type="date"
        onChange={(e) =>
          setData({ ...data, date: e.target.value })
        }
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}