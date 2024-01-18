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
import { ref, computed, onMounted } from "vue";

// Initialise Toastification
const toast = useToast();

// Init onMounted and check localStorage
onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem("transactions"));

  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
});

// Set transactions array
const transactions = ref([]);

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
  return crypto.randomUUID();
};

// Add to transaction array
const submitTransaction = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    item: transactionData.item,
    amount: transactionData.amount,
  });

  saveToLocalStorage();
  
  toast.success("Transaction Added");
};

// Delete transactions from array
const removeTransaction = (id) => {
  transactions.value = transactions.value.filter(
    (transaction) => transaction.id !== id
  );

  saveToLocalStorage();

  toast.success("Transaction deleted");
};

// Save to localStorage
const saveToLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions.value));
};
</script>
