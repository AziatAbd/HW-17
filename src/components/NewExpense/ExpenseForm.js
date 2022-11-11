import React, { useState } from "react";
import "./ExpenseForm.css";

const defaultValues = {
  enteredTitle: "",
  enteredDate: "",
  enteredAmount: "",
};

const ExpenseForm = (props) => {
  const [userInput, setUserInput] = useState(defaultValues);

  const changeValuesHandler = (key) => {
    return (e) => {
      setUserInput((prevState) => {
        return {
          ...prevState,
          [key]: e.target.value,
        };
      });
    };
  };

  const postData = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-bf130-default-rtdb.firebaseio.com/file.json",
        {
          method: "POST",
          body: JSON.stringify({
            title: userInput.enteredTitle,
            date: userInput.enteredDate,
            amount: userInput.enteredAmount,
          }),
          header: {
            "Content-type": "application/json",
          },
        }
      );
	  getData()
      console.log(response);
    } catch (error) {}
  };

  const getData = async () => {
	try{
		const response = await fetch("https://expense-tracker-bf130-default-rtdb.firebaseio.com/file.json", {
		})
		const data = response.json
		const dataFromFireBase = []

		for (const key in data) {
			dataFromFireBase.push({
				id: key,
				title: data[key].title,
				date: data[key].date,
				amount: data[key].amount
			})
		}
		setUserInput(dataFromFireBase)
	} catch (error) {}
  }

  const submitHandler = (event) => {
    event.preventDefault(); //

    const expenseData = {
      title: userInput.enteredTitle,
      amount: userInput.enteredAmount,
      date: new Date(userInput.enteredDate),
    };
    const isFormNotFilled = Object.values(userInput).some((value) => !value);
    if (isFormNotFilled) {
      return alert("Please, fill all fields!");
    }
    props.onSaveExpenseData(expenseData);
    setUserInput(defaultValues);
    postData();
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={userInput.enteredTitle}
            onChange={changeValuesHandler("enteredTitle")}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={userInput.enteredAmount}
            onChange={changeValuesHandler("enteredAmount")}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2025-12-31"
            value={userInput.enteredDate}
            onChange={changeValuesHandler("enteredDate")}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
