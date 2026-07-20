

let salary = 0;

let expenses = [];

let expenseChart;

let currentCurrency = "INR";

let exchangeRate = 1;

const currencySymbols = {

    INR: "₹",

    USD: "$",

    EUR: "€",

    GBP: "£",

    JPY: "¥"

};

function init() {

    loadData();

}

window.addEventListener("DOMContentLoaded", init);
const currencySelect = document.getElementById("currency");
const warningBanner = document.getElementById("warningBanner");
const form = document.getElementById("form");

const salaryInput = document.getElementById("salary");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");

const salaryDisplay = document.getElementById("salaryDisplay");
const expenseDisplay = document.getElementById("expenseDisplay");
const balanceDisplay = document.getElementById("balanceDisplay");

const expenseList = document.getElementById("expenseList");

const errorMessage = document.getElementById("errorMessage");
const downloadReportButton = document.getElementById("downloadReport");

const resetButton = document.getElementById("resetButton");

currencySelect.addEventListener("change", changeCurrency);
form.addEventListener("submit", handleSubmit);
downloadReportButton.addEventListener("click",downloadReport);
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

  saveData();

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
  salaryDisplay.textContent = formatCurrency(salary);
}

function formatCurrency(amount) {

    const value = (amount * exchangeRate).toFixed(2);

    if (currentCurrency === "INR") {
        return `Rs. ${value}`;
    }

    return `${currencySymbols[currentCurrency]} ${value}`;
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
    expenseText.textContent = `${expense.name} - ${formatCurrency(expense.amount)}`;
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
    saveData();
  renderDashboard();
}

function renderSummary() {
  const totalExpenses = calculateTotalExpenses();

  expenseDisplay.textContent = formatCurrency(totalExpenses);

  balanceDisplay.textContent = formatCurrency(calculateBalance());
}


function renderDashboard() {
  renderSalary();

  renderExpenseList();

  renderSummary();

  updateChart();

  checkThreshold();

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
  saveData();

  currentCurrency = "INR";
    exchangeRate = 1;

    currencySelect.value = "INR";
    
  salaryInput.disabled = false;

  renderDashboard();

  clearError();
}

function saveData() {

    localStorage.setItem("salary", JSON.stringify(salary));

    localStorage.setItem("expenses", JSON.stringify(expenses));

}

function loadData() {

    const storedSalary = JSON.parse(localStorage.getItem("salary"));

    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));

    if (storedSalary) {
        salary = storedSalary;

        salaryInput.value = salary;

        salaryInput.disabled = true;
    }

    if (storedExpenses) {
        expenses = storedExpenses;
    }

    renderDashboard();

}

function updateChart() {
    const chartCanvas = document.getElementById("expenseChart");
    const chartMessage = document.getElementById("chartMessage");

    if (salary === 0) {

        if (expenseChart) {
            expenseChart.destroy();
            expenseChart = null;
        }

        chartCanvas.style.display = "none";
        chartMessage.style.display = "block";

        return;
    }

    chartCanvas.style.display = "block";
    chartMessage.style.display = "none";

    const totalExpenses = calculateTotalExpenses();

    const balance = calculateBalance();

    const data = [balance, totalExpenses];

    if (expenseChart) {
        expenseChart.destroy();
    }

    const ctx = document
        .getElementById("expenseChart")
        .getContext("2d");

    expenseChart = new Chart(ctx, {

    type: "pie",

    data: {

        labels: [
            "Remaining Balance",
            "Expenses"
        ],

        datasets: [{
            data: data,

            backgroundColor: [
                "#1f2937",   // Dark Gray
                "#9ca3af"    // Light Gray
            ],

            borderColor: "#ffffff",
            borderWidth: 4,

            hoverOffset: 8
        }]
    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                position: "bottom",

                labels: {

                    padding: 20,

                    usePointStyle: true,

                    pointStyle: "circle",

                    font: {
                        size: 14,
                        family: "Inter"
                    }

                }

            },

            title: {
                display: false
            },

            tooltip: {

                backgroundColor: "#111",

                titleColor: "#fff",

                bodyColor: "#fff",

                padding: 12,

                cornerRadius: 8

            }

        },

        animation: {

            animateRotate: true,

            duration: 1200,

            easing: "easeOutQuart"

        }

    }

});

}

function checkThreshold() {

    if (salary === 0) {
        warningBanner.style.display = "none";
        return;
    }

    const balance = calculateBalance();

    if (balance < salary * 0.1) {

        warningBanner.style.display = "block";

        balanceDisplay.style.color = "#d32f2f";

    } else {

        warningBanner.style.display = "none";

        balanceDisplay.style.color = "#1a1a1a";

    }

}
function downloadReport() {

    if (salary === 0) {
        alert("Please enter your salary first.");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const totalExpenses = calculateTotalExpenses();
    const balance = calculateBalance();

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Expense Tracker Report", 105, 20, { align: "center" });

    doc.setLineWidth(0.5);
    doc.line(20, 28, 190, 28);

    // Date
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 38);

    // Summary
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Summary", 20, 55);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`Salary`, 25, 65);
    doc.text(`${formatCurrency(salary)}`, 160, 65);

    doc.text(`Total Expenses`, 25, 75);
    doc.text(`${formatCurrency(totalExpenses)}`, 160, 75);

    doc.text(`Remaining Balance`, 25, 85);
    doc.text(`${formatCurrency(calculateBalance())}`, 160, 85);

    // Divider
    doc.line(20, 95, 190, 95);

    // Expense Table
    doc.setFont("helvetica", "bold");
    doc.text("Expense List", 20, 108);

    doc.line(20, 112, 190, 112);

    doc.text("No.", 20, 120);
    doc.text("Expense", 40, 120);
    doc.text("Amount", 160, 120);

    doc.line(20, 124, 190, 124);

    doc.setFont("helvetica", "normal");

    let y = 134;

    expenses.forEach((expense, index) => {

        doc.text(String(index + 1), 20, y);

        doc.text(expense.name, 40, y);

        doc.text(formatCurrency(expense.amount), 160, y);

        y += 10;

        if (y > 270) {
            doc.addPage();
            y = 20;
        }

    });

    doc.line(20, y + 5, 190, y + 5);

    doc.setFont("helvetica", "bold");

    doc.text(`Total Expenses : ${formatCurrency(totalExpenses)}`, 20, y + 18);

    doc.save("Expense_Report.pdf");

}

async function changeCurrency() {

    const selectedCurrency = currencySelect.value;

    if (selectedCurrency === "INR") {

        exchangeRate = 1;
        currentCurrency = "INR";

        renderDashboard();

        return;
    }

    try {

        const response = await fetch(
            `https://api.frankfurter.dev/v1/latest?base=INR&symbols=${selectedCurrency}`
        );

        const data = await response.json();

        exchangeRate = data.rates[selectedCurrency];

        currentCurrency = selectedCurrency;

        renderDashboard();

    } catch (error) {

        console.error(error);

        alert("Unable to fetch exchange rates.");

    }

}