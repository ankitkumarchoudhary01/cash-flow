let salary = 0;

let expenses = [];

const form = document.getElementById("form");

const salaryInput = document.getElementById("salary");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");

const salaryDisplay = document.getElementById("salaryDisplay");
const expenseDisplay = document.getElementById("expenseDisplay");
const balanceDisplay = document.getElementById("balanceDisplay");

const expenseList = document.getElementById("expenseList");

const errorMessage = document.getElementById("errorMessage");

const resetButton = document.getElementById("resetButton");

form.addEventListener("submit", handleSubmit);

resetButton.addEventListener("click", resetDashboard);

function handleSubmit(event) {
  event.preventDefault();

  const salaryValue = Number(salaryInput.value);
  const expenseName = expenseNameInput.value.trim();
  const expenseAmount = Number(expenseAmountInput.value);

  const validationError = validateForm(salaryValue, expenseName, expenseAmount);

  if (validationError) {
    showError(validationError);
    return;
  }

  clearError();

  salary = salaryValue;
  salaryInput.disabled = true;

  addExpense(expenseName, expenseAmount);

  renderDashboard();

  clearExpenseInputs();
}

function validateForm(salary, name, amount) {
  if (!salary || salary <= 0) {
    return "Salary must be greater than 0.";
  }

  if (name === "") {
    return "Expense name is required.";
  }

  if (!amount || amount <= 0) {
    return "Expense amount must be greater than 0.";
  }

  return "";
}

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

function addExpense(name, amount) {
  expenses.push({
    id: Date.now(),
    name,
    amount,
  });
}

function calculateTotalExpenses() {
  return expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);
}

function calculateBalance() {
  return salary - calculateTotalExpenses();
}

function renderSalary() {
  salaryDisplay.textContent = `₹${salary}`;
}

function renderExpenseList() {
  expenseList.innerHTML = "";

  if (expenses.length === 0) {
    expenseList.innerHTML =
      '<li class="empty-state">No expenses added yet.</li>';
    return;
  }

  expenses.forEach((expense) => {
    const item = document.createElement("li");

    // Expense Details
    const expenseText = document.createElement("span");
    expenseText.textContent = `${expense.name} - ₹${expense.amount}`;

    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", () => {
      deleteExpense(expense.id);
    });

    item.appendChild(expenseText);
    item.appendChild(deleteButton);

    expenseList.appendChild(item);
  });
}

function deleteExpense(id) {
  expenses = expenses.filter((expense) => expense.id !== id);

  renderDashboard();
}

function renderSummary() {
  const totalExpenses = calculateTotalExpenses();

  expenseDisplay.textContent = `₹${totalExpenses}`;

  balanceDisplay.textContent = `₹${calculateBalance()}`;
}

function renderDashboard() {
  renderSalary();

  renderExpenseList();

  renderSummary();
}

function clearExpenseInputs() {
  expenseNameInput.value = "";

  expenseAmountInput.value = "";

  expenseNameInput.focus();
}

function resetDashboard() {
  salary = 0;

  expenses = [];

  form.reset();
  salaryInput.disabled = false;

  renderDashboard();

  clearError();
}
