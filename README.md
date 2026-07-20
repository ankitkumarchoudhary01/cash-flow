# Expense Tracker

## Overview

Expense Tracker is a responsive web application built using HTML, CSS, and Vanilla JavaScript that helps users manage their personal finances. Users can enter their salary, add multiple expenses, monitor their remaining balance, visualize spending through a pie chart, generate PDF reports, and switch between multiple currencies using a live exchange rate API.

This project was developed as part of Sprint 02, which focuses on JavaScript fundamentals including DOM manipulation, event handling, state management, localStorage, and third-party library integration.

---

## Features

### Phase 1 – Base MVP

- Add total salary
- Add multiple expenses
- Display salary dynamically
- Display expense list
- Calculate total expenses
- Calculate remaining balance
- Input validation
- Prevent empty submissions
- Prevent negative values
- Salary field locks after first successful submission
- Reset functionality

### Phase 2 – Data Persistence & Visualization

- Save salary and expenses using LocalStorage
- Restore data after page refresh
- Delete individual expenses
- Automatic balance recalculation
- Interactive pie chart using Chart.js
- Dynamic chart updates

### Phase 3 – Advanced Features

- Generate downloadable PDF report using jsPDF
- Low balance warning when balance falls below 10% of salary
- Currency conversion using Exchange Rate API
- Support for multiple currencies
  - INR
  - USD
  - EUR
  - GBP
  - JPY

---

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript (ES6)
- LocalStorage API
- Chart.js
- jsPDF
- Frankfurter API

---

## Project Structure

```
Expense-Tracker/
│
├── index.html
├── styles.css
├── script.js
└── README.md
```

---

## Application Workflow

1. Enter your salary.
2. Add an expense name and amount.
3. The application validates the input.
4. The expense is added to the list.
5. Salary, total expenses, and remaining balance are updated.
6. Data is automatically stored in LocalStorage.
7. The pie chart updates in real time.
8. Users can delete expenses.
9. Users can download a PDF report.
10. Users can change the display currency.

---

## Validation Rules

- Salary must be greater than zero.
- Expense name cannot be empty.
- Expense amount must be greater than zero.
- Invalid inputs display an error message.
- Salary cannot be modified after it is initially submitted.
- Reset restores the application to its initial state.

---

## LocalStorage

The application stores the following information in the browser:

- Salary
- Expense List

Data is serialized using `JSON.stringify()` before saving and deserialized using `JSON.parse()` when loading the application.

---

## PDF Report

The generated report contains:

- Generation Date
- Salary
- Total Expenses
- Remaining Balance
- Complete Expense List

---

## Currency Conversion

The application fetches live exchange rates from an Exchange Rate API.

Supported currencies include:

- INR
- USD
- EUR
- GBP
- JPY

Changing the currency updates:

- Salary
- Expense List
- Total Expenses
- Remaining Balance

The internal data always remains stored in INR to ensure accurate calculations.

---

## Low Balance Alert

If the remaining balance falls below 10% of the total salary, the dashboard displays a warning message and highlights the remaining balance.

---

## Installation

Clone the repository

```bash
git clone <repository-url>
```

Navigate to the project directory

```bash
cd cash-flow
```

Open the project using Live Server or any local development server.

---

## Future Enhancements

- Expense categories
- Monthly reports
- Dark mode
- User authentication
- Income history
- Budget goals
- Expense search and filters
- Data export to CSV

---

## Learning Outcomes

This project demonstrates understanding of:

- DOM Manipulation
- Event Listeners
- Form Validation
- JavaScript Arrays and Objects
- CRUD Operations
- LocalStorage
- JSON Serialization
- Chart.js Integration
- API Integration
- PDF Generation
- Responsive Web Design

---

## Author

Ankit Kumar Choudhary

---

## License

This project is intended for educational and internship learning purposes.
