const data = [
  {
    month: 'April 2026',
    expenses: {
      'O/s food': 4892,
      'Vegetable grocery': 8056,
      Personal: 8215,
      Travel: 0,
      Room: 12500,
      Family: 18000,
      Medical: 2745,
    },
    totalExpenses: 57528,
    salary: { Litu: 127000, Jhuma: 43000 },
    totalSalary: 170000,
    notes: ['Investment: Chitfund ₹20,000, FD ₹80,000'],
    extra: { investment: 100000 },
  },
  {
    month: 'March 2026',
    expenses: {
      'O/s food': 3117,
      'Vegetable grocery': 9084,
      Personal: 10435,
      Travel: 3000,
      Room: 12180,
      Family: 18667,
      Medical: 800,
    },
    salary: { Litu: 109000, 'Litu FNF': 93000, Jhuma: 43000 },
    totalSalary: 245000,
    notes: ['Plot: ₹1,00,000 and plot wall: ₹80,000', 'Taken from Rima: ₹2,000'],
    extra: { investment: 180000, borrowed: 2000 },
  },
  {
    month: 'February 2026',
    expenses: {
      'O/s food': 4192,
      Vegetable: 827,
      Personal: 8455,
      Travel: 1830,
      Room: 11740,
      Family: 18500,
      Medical: 0,
    },
    totalExpenses: 45504,
    salary: { 'Litu + Jhuma': 43000 },
    totalSalary: 43000,
    notes: ['Plot: ₹1,00,000 from fix', 'Taken from Rima: ₹3,000'],
    extra: { investment: 100000, borrowed: 3000 },
  },
  {
    month: 'January 2026',
    expenses: {
      'O/s food': 5766,
      Vegetable: 1467,
      Personal: 2340,
      Travel: 2248,
      Room: 11740,
      Family: 17800,
      Suddenly: 163520,
      Medical: 0,
    },
    salary: { Litu: 84000, Jhuma: 43000 },
    totalSalary: 127000,
    notes: ['Liabilities: ₹93,000 (loan ₹60,000, Amma ₹25,000, money bank ₹8,000)'],
    extra: { liability: 93000 },
  },
];

const fmt = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

const totals = data.reduce(
  (acc, month) => {
    const monthIncome = month.totalSalary || Object.values(month.salary || {}).reduce((a, b) => a + b, 0);
    const monthExpense = month.totalExpenses || Object.values(month.expenses || {}).reduce((a, b) => a + b, 0);

    acc.income += monthIncome;
    acc.expense += monthExpense;
    acc.investment += month.extra?.investment || 0;
    acc.liability += month.extra?.liability || 0;

    return acc;
  },
  { income: 0, expense: 0, investment: 0, liability: 0 }
);

document.getElementById('totalIncome').textContent = fmt(totals.income);
document.getElementById('totalExpense').textContent = fmt(totals.expense);
document.getElementById('totalInvestment').textContent = `${fmt(totals.investment)} / ${fmt(totals.liability)}`;

const months = document.getElementById('months');
for (const month of data) {
  const expenseTotal = month.totalExpenses || Object.values(month.expenses).reduce((a, b) => a + b, 0);
  const incomeTotal = month.totalSalary || Object.values(month.salary || {}).reduce((a, b) => a + b, 0);

  const block = document.createElement('article');
  block.className = 'month';
  block.innerHTML = `
    <h4>${month.month}</h4>
    <div class="grid">
      ${Object.entries(month.expenses)
        .map(([k, v]) => `<div class="item"><strong>${k}</strong>${fmt(v)}</div>`)
        .join('')}
    </div>
    <p class="meta"><b>Total Expenses:</b> ${fmt(expenseTotal)} | <b>Total Income:</b> ${fmt(incomeTotal)}</p>
    <p class="meta">${(month.notes || []).join(' • ')}</p>
  `;
  months.appendChild(block);
}
