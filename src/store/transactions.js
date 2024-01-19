import { defineStore } from 'pinia';

export const useTransactionStore = defineStore('transactions', {
	state: () => ({
		transactions: [],
	}),
	getters: {
		total: (state) =>
			state.transactions.reduce((acc, transaction) => {
				const amount = parseFloat(transaction.amount);
				return acc + (isNaN(amount) ? 0 : amount);
			}, 0),
		income: (state) =>
			state.transactions
				.filter((transaction) => transaction.amount > 0)
				.reduce((acc, transaction) => acc + transaction.amount, 0),
		expenses: (state) =>
			state.transactions
				.filter((transaction) => transaction.amount < 0)
				.reduce((acc, transaction) => acc + transaction.amount, 0),
	},
	actions: {
		loadTransactions() {
			const savedTransactions = JSON.parse(
				localStorage.getItem('transactions'),
			);
			if (savedTransactions) {
				this.transactions = savedTransactions;
			}
		},
		addTransaction(transactionData, toast) {
			this.transactions.push({
				id: crypto.randomUUID(),
				item: transactionData.item,
				amount: transactionData.amount,
			});

			this.saveTransactions();

			if (toast) {
				toast.success('Transaction added!');
			}
		},
		removeTransaction(id, toast) {
			this.transactions = this.transactions.filter(
				(transaction) => transaction.id !== id,
			);
			this.saveTransactions();

			if (toast) {
				toast.fail('Transaction removed!');
			}
		},
		saveTransactions() {
			localStorage.setItem('transactions', JSON.stringify(this.transactions));
		},
	},
});
