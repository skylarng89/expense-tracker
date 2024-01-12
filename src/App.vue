<template>
  <div>
    <Header />
    <div class="container">
      <!-- Pass total as prop -->
      <Balance :total="+total" />
      <!-- Pass Income Expenses as prop -->
      <IncomeExpenses :income="+income" :expenses="+expenses" />
      <!-- Pass transactions as prop -->
      <TransactionList
        :transactions="transactions"
        @transactionDeleted="removeTransaction"
      />
      <!-- Add new transactions -->
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

import { useToast } from "vue-toastification";
import { ref, computed } from "vue";

// Initialise Toastification
const toast = useToast();

// Set transactions array
const transactions = ref([]);
// const transactions = ref([
//   { id: 1, item: "Flower", amount: -5.99 },
//   { id: 2, item: "Salary", amount: 1250.0 },
//   { id: 3, item: "Xbox Gamepass", amount: -9.0 },
//   { id: 4, item: "Cable TV", amount: -300 },
// ]);

// Get total balance using Vue computed function
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
});

// Get total income using Vue computed function
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
});

// Get total expense using Vue computed function
const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0)
    .toFixed(2);
});

// Generate unique transaction ID
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
};

// Add to transaction array
const submitTransaction = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    item: transactionData.item,
    amount: transactionData.amount,
  });
  toast.success("Transaction Added");
};

// Delete transactions
const removeTransaction = (id) => {
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id
  );

  toast.success("Transaction deleted");
};
</script>
