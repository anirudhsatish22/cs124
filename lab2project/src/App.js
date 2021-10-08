import logo from './logo.svg';
import './App.css';
import ToDoList from "./To-DoList";
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


function App(props) {
  return (
    <div className="App">
      <ToDoList list={props.data}></ToDoList>
    </div>
  );
}

export default App;

// ASk on monday about inmemoryapp, and then also think about why the css not working on mobile view. app.test