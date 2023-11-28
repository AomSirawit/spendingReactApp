import Transaction from "./components/Transaction";
import FormComponent from "./components/Form";
import "./App.css";
import { useState, useEffect } from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const design = { color: "red", textAlign: "center", fontSize: "25px" };
  const [Items, setItems] = useState([]); //ค่าเริ่มต้นเป็น Array ที่เก็บข้อมูลไว้
  const [reportIncome, setReportIncome] = useState(0);
  const [reportExpense, setReportExpense] = useState(0);
  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem];
    });
  };
  useEffect(() => {
    const amounts = Items.map((Items) => Items.amount); //เอาแค่ amount มา
    const income = amounts
      .filter((element) => element > 0)
      .reduce((total, element) => (total += element), 0); //เอาแค่ + มา
    const expense =
      amounts
        .filter((element) => element < 0)
        .reduce((total, element) => (total += element), 0) * -1; //เอาแค่ + มา

    setReportIncome(income.toFixed(2));
    setReportExpense(expense.toFixed(2));
  }, [Items, reportIncome, reportExpense]);

  // reducer state
  // const [showReport, setShowReport] = useState(false);
  // const reducer = (state, action) => {
  //   switch (action.type) {
  //     case "SHOW":
  //       return setShowReport(true)
  //     case "HIDE":
  //       return setShowReport(false)
  //     default:
  //       return setShowReport(false)
  //   }
  // };
  return (
    <DataContext.Provider
      value={{
        income: reportIncome,
        expense: reportExpense,
      }}
    >
      <div className="container">
        <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
         <Router>
        <div>
          <ul className="horizontal-menu">
            <li>
              <Link to = "/">ข้อมูลบัญชี</Link>
            </li>
            <li>
              <Link to = "/insert">บันทึกข้อมูล</Link>
            </li>
          </ul>
          <Routes>
            <Route path='/' element={<ReportComponent/>}></Route>
            <Route path='/insert' element={<><FormComponent onAddItem={onAddNewItem}/>
             <Transaction items={Items}/> </>}></Route>
          </Routes>

        </div>
        </Router> 
      
       
      </div>
    </DataContext.Provider>
  );
}

export default App;
