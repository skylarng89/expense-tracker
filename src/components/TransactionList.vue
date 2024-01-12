<template>
  <div>
    <h3>History</h3>
    <ul id="list" class="list">
      <li
        v-for="transaction in transactions"
        :key="transaction.id"
        :class="transaction.amount < 0 ? 'minus' : 'plus'"
      >
        {{ transaction.item }} <span>₦{{ transaction.amount }}</span
        ><button @click="deleteTransaction(transaction.id)" class="delete-btn">
          x
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Create transactions as prop and pass to main component
import { defineProps } from "vue";

// Emit deleteTransaction to App.vue
const emit = defineEmits(["transactionDeleted"]);

const props = defineProps({
  transactions: {
    type: Array,
    required: true,
  },
});

// Delete transaction
const deleteTransaction = (id) => {
  emit("transactionDeleted", id);
};
</script>
