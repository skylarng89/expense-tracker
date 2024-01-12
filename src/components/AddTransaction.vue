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
// Import Toastification
import { useToast } from "vue-toastification";

const item = ref("");
const amount = ref("");

// Emit event to main component
const emit = defineEmits(["addedTransaction"]);

// Initialize Toastification
const toast = useToast();
// Validate input fields
const onSubmit = () => {
  if (!item.value || !amount.value) {
    toast.error("Please fill all fields");
    return;
  }

  const transactionData = {
    item: item.value,
    amount: parseFloat(amount.value),
  };

  emit("addedTransaction", transactionData);

  item.value = "";
  amount.value = "";
};
</script>