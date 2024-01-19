<template>
  <div>
    <h3>Add new transaction</h3>
    <form id="form" @submit.prevent="onSubmit">
      <div class="form-control">
        <label for="text">Item</label>
        <input
          type="text"
          id="text"
          v-model="item"
          placeholder="Enter text..."
        />
      </div>
      <div class="form-control">
        <label for="amount"
          >Amount <br />
          (negative - expense, positive - income)</label
        >
        <input
          type="text"
          id="amount"
          v-model="amount"
          placeholder="Enter amount..."
        />
      </div>
      <button class="btn">Add transaction</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useTransactionStore } from "../store/transactions";

const item = ref("");
const amount = ref("");
const toast = useToast();
const transactionStore = useTransactionStore();

const onSubmit = () => {
  if (!item.value || !amount.value) {
    toast.error("Please fill all fields");
    return;
  }

  const transactionData = {
    item: item.value,
    amount: parseFloat(amount.value),
  };

  transactionStore.addTransaction(transactionData); // Directly calling store action

  item.value = "";
  amount.value = "";
};
</script>