import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const initialData = [
    {
        id: "1",
        task: "Sleep",
        completed: false
    },
    {
        id: "2",
        task: "Start CS124 Lab3",
        completed: false
    },
    {
        id: "3",
        task: "Submit CS124 Lab2",
        completed: true,
    },
    {
        id: "4",
        task: "Enjoy Fall Break!",
        completed: false
    }
];

ReactDOM.render(
  <React.StrictMode>
       <App data={initialData}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
