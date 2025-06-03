// import { useState } from "react";

// const Dashboard = () => {
//   const [salary, setSalary] = useState(0);
//   const [balance, setBalance] = useState(0);

//   const [salaryInput, setSalaryInput] = useState("");
//   const [expenseAmount, setExpenseAmount] = useState("");
//   const [expenseName, setExpenseName] = useState("");

//   const [expenses, setExpenses] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);

//   const handleSalarySubmit = (e) => {
//   e.preventDefault();
//   const newSalary = parseFloat(salaryInput);
//   if (!isNaN(newSalary)) {
//     setSalary(newSalary); // salary reassign ho gayi
//     setBalance((prev) => prev + newSalary); // purane balance me plus
//     setSalaryInput("");
//   }
// };

//   const handleExpenseSubmit = (e) => {
//     e.preventDefault();
//     const value = parseFloat(expenseAmount);
//     if (!expenseName || isNaN(value)) return;

//     if (editIndex !== null) {
//       const updated = [...expenses];
//       const oldAmount = updated[editIndex].amount;
//       updated[editIndex] = { name: expenseName, amount: value };
//       setExpenses(updated);
//       setBalance((prev) => prev + oldAmount - value);
//       setEditIndex(null);
//     } else {
//       setExpenses([...expenses, { name: expenseName, amount: value }]);
//       setBalance((prev) => prev - value);
//     }

//     setExpenseName("");
//     setExpenseAmount("");
//   };

//   const handleDelete = (index) => {
//     const removed = expenses[index];
//     setBalance((prev) => prev + removed.amount);
//     setExpenses(expenses.filter((_, i) => i !== index));
//   };

//   const handleEdit = (index) => {
//     const exp = expenses[index];
//     setExpenseName(exp.name);
//     setExpenseAmount(exp.amount);
//     setEditIndex(index);
//   };

//   return (
//     <div className="p-4 sm:p-6 max-w-6xl mx-auto w-full">
//       <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Dashboard</h1>

//       {/* Tabs */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//         <div className="bg-yellow-300 p-4 rounded shadow text-center">
//           <h2 className="text-lg font-semibold">Total Salary</h2>
//           <p className="text-2xl font-bold break-words">Rs {salary}</p>
//         </div>
//         <div className="bg-green-300 p-4 rounded shadow text-center">
//           <h2 className="text-lg font-semibold">Current Balance</h2>
//           <p className="text-2xl font-bold break-words">Rs {balance}</p>
//         </div>
//       </div>

//       {/* Add Salary */}
//       <form onSubmit={handleSalarySubmit} className="mb-4 flex flex-col sm:flex-row gap-2">
//         <input
//           type="number"
//           value={salaryInput}
//           onChange={(e) => setSalaryInput(e.target.value)}
//           placeholder="Enter Salary"
//           className="p-2 border rounded w-full"
//         />
//         <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded w-full sm:w-auto">
//           Set Salary
//         </button>
//       </form>

//       {/* Add Expense */}
//       <form onSubmit={handleExpenseSubmit} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
//         <input
//           type="text"
//           value={expenseName}
//           onChange={(e) => setExpenseName(e.target.value)}
//           placeholder="Expense Name"
//           className="p-2 border rounded w-full"
//         />
//         <input
//           type="number"
//           value={expenseAmount}
//           onChange={(e) => setExpenseAmount(e.target.value)}
//           placeholder="Amount"
//           className="p-2 border rounded w-full"
//         />
//         <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto">
//           {editIndex !== null ? "Update" : "Add"} Expense
//         </button>
//       </form>

//       {/* Expense List */}
//       <h2 className="text-lg sm:text-xl font-semibold mb-3">Your Expenses</h2>
//       <ul className="space-y-2">
//         {expenses.map((exp, index) => (
//           <li
//             key={index}
//             className="bg-white shadow p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center rounded"
//           >
//             <div>
//               <p className="font-medium">{exp.name}</p>
//               <p className="text-sm text-gray-600">Rs {exp.amount}</p>
//             </div>
//             <div className="flex gap-2 mt-2 sm:mt-0">
//               <button
//                 onClick={() => handleEdit(index)}
//                 className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(index)}
//                 className="bg-red-500 text-white px-3 py-1 rounded text-sm"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Dashboard;


// first commeted///////////////////////////////////////////////////////




import { useState, useEffect } from "react";
import { db, auth,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp
} from "../firebase/firebaseconfig.js";


const Dashboard = () => {
  const [salary, setSalary] = useState(0);
  const [balance, setBalance] = useState(0);
  const [salaryId, setSalaryId] = useState(null); // 👈 For update purpose

  const [salaryInput, setSalaryInput] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseName, setExpenseName] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const uid = auth.currentUser?.uid;

  // 🔁 Real-time data fetch
  useEffect(() => {
    if (!uid) return;

    const salaryRef = query(collection(db, "salary"), where("uid", "==", uid));
    const unsubscribeSalary = onSnapshot(salaryRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (data.length) {
        setSalary(data[0].amount);
        setSalaryId(data[0].id); // 👈 Save document ID
      }
    });

    const expenseRef = query(collection(db, "expenses"), where("uid", "==", uid));
    const unsubscribeExpenses = onSnapshot(expenseRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(data);

      const totalExpense = data.reduce((sum, exp) => sum + exp.amount, 0);
      setBalance(salary - totalExpense);
    });

    return () => {
      unsubscribeSalary();
      unsubscribeExpenses();
    };
  }, [uid, salary]);

  // 💰 Salary Set or Update
  const handleSalarySubmit = async (e) => {
    e.preventDefault();
    const newSalary = parseFloat(salaryInput);
    if (isNaN(newSalary)) return;

    try {
      if (salaryId) {
        // update salary
        const ref = doc(db, "salary", salaryId);
        await updateDoc(ref, {
          amount: newSalary,
          updatedAt: serverTimestamp(),
        });
      } else {
        // add salary
        await addDoc(collection(db, "salary"), {
          uid: uid,
          amount: newSalary,
          createdAt: serverTimestamp(),
        });
      }
      setSalaryInput("");
    } catch (err) {
      console.error("Error saving salary:", err);
    }
  };

  // 💸 Add / Update Expense
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const value = parseFloat(expenseAmount);
    if (!expenseName || isNaN(value)) return;

    try {
      if (editIndex !== null) {
        const exp = expenses[editIndex];
        const ref = doc(db, "expenses", exp.id);
        await updateDoc(ref, {
          name: expenseName,
          amount: value,
        });
        setEditIndex(null);
      } else {
        await addDoc(collection(db, "expenses"), {
          uid: uid,
          name: expenseName,
          amount: value,
          createdAt: serverTimestamp(),
        });
      }
    } catch (err) {
      console.error("Error saving expense:", err);
    }

    setExpenseName("");
    setExpenseAmount("");
  };

  // ❌ Delete
  const handleDelete = async (index) => {
    try {
      const exp = expenses[index];
      await deleteDoc(doc(db, "expenses", exp.id));
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const handleEdit = (index) => {
    const exp = expenses[index];
    setExpenseName(exp.name);
    setExpenseAmount(exp.amount);
    setEditIndex(index);
  };

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto w-full">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Dashboard</h1>

      {/* Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-yellow-300 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Total Salary</h2>
          <p className="text-2xl font-bold break-words">Rs {salary}</p>
        </div>
        <div className="bg-green-300 p-4 rounded shadow text-center">
          <h2 className="text-lg font-semibold">Current Balance</h2>
          <p className="text-2xl font-bold break-words">Rs {balance}</p>
        </div>
      </div>

      {/* Add Salary */}
      <form onSubmit={handleSalarySubmit} className="mb-4 flex flex-col sm:flex-row gap-2">
        <input
          type="number"
          value={salaryInput}
          onChange={(e) => setSalaryInput(e.target.value)}
          placeholder="Enter Salary"
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded w-full sm:w-auto">
          {salaryId ? "Update Salary" : "Set Salary"}
        </button>
      </form>

      {/* Add Expense */}
      <form onSubmit={handleExpenseSubmit} className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          placeholder="Expense Name"
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
          placeholder="Amount"
          className="p-2 border rounded w-full"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-auto">
          {editIndex !== null ? "Update" : "Add"} Expense
        </button>
      </form>

      {/* Expense List */}
      <h2 className="text-lg sm:text-xl font-semibold mb-3">Your Expenses</h2>
      <ul className="space-y-2">
        {expenses.map((exp, index) => (
          <li
            key={index}
            className="bg-white shadow p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center rounded"
          >
            <div>
              <p className="font-medium">{exp.name}</p>
              <p className="text-sm text-gray-600">Rs {exp.amount}</p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
              <button
                onClick={() => handleEdit(index)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;












