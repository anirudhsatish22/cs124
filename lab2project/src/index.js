import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import InMemoryApp from "./InMemoryApp";
import reportWebVitals from './reportWebVitals';
const initialData = [
    {
        id: "1",
        task: "Buy Lunch"
    },
    {
        id: "2",
        task: "Finish CS124 Lab"
    }
];

ReactDOM.render(
  <React.StrictMode>
       <InMemoryApp initialData={initialData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
