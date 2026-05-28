import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Cards from "../components/Cards";
import AddExpenseModal from "../components/Modals/addExpense";
import AddIncomeModal from "../components/Modals/addIncome";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment/moment";
import TransactionsTable from "../components/TransactoinsTable";
import ChartComponent from "../components/Charts";
import NoTransactions from "../components/NoTransactions";
function Dashboard() {
  // const transaction = [
  //   {
  //     type: "income",
  //     amount: 1200,
  //     tag: "salary",
  //     name: "income 1",
  //     date: "2026-05-23",
  //   },
  //   {
  //     type: "expense",
  //     amount: 8900,
  //     tag: "food",
  //     name: "expense 1",
  //     date: "2026-05-217",
  //   },
  // ];

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction, many) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction,
      );

      console.log("Document written with ID:", docRef.id);

      if (!many) toast.success("Transaction Added!");

      fetchTransactions(); // refresh data
    } catch (e) {
      console.log("Error adding document:", e);
      if (!many) toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    if (user) {
      fetchTransactions();
    }
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
  let incomeTotal = 0;
  let expenseTotal = 0;

  transactions.forEach((transaction) => {
    const amount = parseFloat(transaction.amount) || 0;

    if (transaction.type === "income") {
      incomeTotal += amount;
    } else if (transaction.type === "expense") {
      expenseTotal += amount;
    }
  });

  setIncome(incomeTotal);
  setExpense(expenseTotal);
  setTotalBalance(incomeTotal - expenseTotal);
};

  async function fetchTransactions() {
    setLoading(true);

    try {
      if (user) {
        const q = query(collection(db, `users/${user.uid}/transactions`));

        const querySnapshot = await getDocs(q);

        let transactionsArray = [];

        querySnapshot.forEach((doc) => {
          transactionsArray.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setTransactions(transactionsArray);

        console.log("transactions", transactionsArray);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch transactions");
    }

    setLoading(false);
  }

  let sortedTransactions=transactions.sort((a,b) =>{
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            totalBalance={totalBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          {transactions.length!=0?<ChartComponent sortedTransactions={sortedTransactions}/>:<NoTransactions/>}
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />

          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          <TransactionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
