<template>
  <div>
    <Header />
    <div class="container">
      <Balance :total="total" />
      <IncomeExpenses :income="income" :expenses="expenses" />
      <TransactionList :transactions="transactions" @transactionDeleted="removeTransaction" />
      <AddTransaction @addedTransaction="submitTransaction" />
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Balance from "./components/Balance.vue";
import IncomeExpenses from "./components/IncomeExpenses.vue";
import TransactionList from "./components/TransactionList.vue";
import AddTransaction from "./components/AddTransaction.vue";
import { onMounted } from "vue";
import { useTransactionStore } from "./store/transactions";

const transactionStore = useTransactionStore();



onMounted(() => {
  transactionStore.loadTransactions();
});

// Directly expose to the template, no return statement needed
const transactions = transactionStore.transactions;
const total = transactionStore.total;
const income = transactionStore.income;
const expenses = transactionStore.expenses;
const submitTransaction = (transactionData) => {
  transactionStore.addTransaction(transactionData, toast);
};
const removeTransaction = transactionStore.removeTransaction;
</script>