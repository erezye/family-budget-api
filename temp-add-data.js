const axios = require('axios');

async function addItemsToBudget() {
  try { 
    const budgetId = '67c9567384b0e5ad670caa83';
    
    // Add Child Education expense
    const educationExpense = {
      name: 'Child Education',
      amount: 2500,
      category: 'Education',
      isIncome: false,
      date: new Date().toISOString()
    };
    await axios.post(`http://localhost:3000/budgets/${budgetId}/items`, educationExpense);
    console.log('Added Education expense');
    
    // Add Gym Membership
    const gymExpense = {
      name: 'Gym Membership',
      amount: 300,
      category: 'Health',
      isIncome: false,
      date: new Date().toISOString()
    };
    await axios.post(`http://localhost:3000/budgets/${budgetId}/items`, gymExpense);
    console.log('Added Gym expense');
    
    // Add Online Shopping expense
    const shoppingExpense = {
      name: 'Online Shopping',
      amount: 1200,
      category: 'Shopping',
      isIncome: false,
      date: new Date().toISOString()
    };
    await axios.post(`http://localhost:3000/budgets/${budgetId}/items`, shoppingExpense);
    console.log('Added Shopping expense');
    
    // Add Family Dinner expense
    const dinnerExpense = {
      name: 'Family Dinner',
      amount: 800,
      category: 'Food',
      isIncome: false,
      date: new Date().toISOString()
    };
    await axios.post(`http://localhost:3000/budgets/${budgetId}/items`, dinnerExpense);
    console.log('Added Dinner expense');
    
    // Add Investment Income
    const investmentIncome = {
      name: 'Investment Returns',
      amount: 1500,
      category: 'Investment',
      isIncome: true,
      date: new Date().toISOString()
    };
    await axios.post(`http://localhost:3000/budgets/${budgetId}/items`, investmentIncome);
    console.log('Added Investment income');
    
    // Get updated budget to confirm
    const response = await axios.get(`http://localhost:3000/budgets/${budgetId}`);
    console.log('Updated budget with new items:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) { 
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  } 
}

addItemsToBudget();