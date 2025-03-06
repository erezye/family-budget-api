const axios = require('axios');

async function createAprilBudget() {
  try {
    // Use a fixed userId since we know it from previous data
    const userId = "67c9567384b0e5ad670caa81";
    
    // Create April 2025 budget
    const aprilBudget = {
      userId: userId,
      month: 4,
      year: 2025,
      income: 30000,
      expenses: 0,
      items: [
        {
          name: 'Salary',
          amount: 30000,
          category: 'Income',
          isIncome: true,
          date: new Date('2025-04-01').toISOString()
        }
      ]
    };
    
    const createResponse = await axios.post('http://localhost:3000/budgets', aprilBudget);
    console.log('April 2025 budget created:');
    console.log(JSON.stringify(createResponse.data, null, 2));
    
    // Add some initial expenses
    const budgetId = createResponse.data.id;
    
    // Add Rent expense
    await axios.post(`http://localhost:3000/budgets/${budgetId}/items`, {
      name: 'Rent',
      amount: 6000,
      category: 'Housing',
      isIncome: false,
      date: new Date('2025-04-02').toISOString()
    });
    
    // Add Groceries expense
    await axios.post(`http://localhost:3000/budgets/${budgetId}/items`, {
      name: 'Groceries',
      amount: 2800,
      category: 'Food',
      isIncome: false,
      date: new Date('2025-04-03').toISOString()
    });
    
    // Add Utilities expense
    await axios.post(`http://localhost:3000/budgets/${budgetId}/items`, {
      name: 'Utilities',
      amount: 950,
      category: 'Housing',
      isIncome: false,
      date: new Date('2025-04-05').toISOString()
    });
    
    // Get final budget with all items
    const finalResponse = await axios.get(`http://localhost:3000/budgets/${budgetId}`);
    console.log('Final April 2025 budget with expenses:');
    console.log(JSON.stringify(finalResponse.data, null, 2));
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

createAprilBudget();