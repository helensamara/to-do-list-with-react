import React, {useState, useRef, useEffect} from 'react';
import ToDoList from './ToDoList';
//import uuidv4 from 'uuid/v4';
import { v4 as uuidv4 } from 'uuid';

const localStorageKey = 'toDosApp.toDos';

function App() {
  const [toDos, setToDos] = useState([]);
  const toDoNameref = useRef();

  useEffect( () => {
    const storedToDos = JSON.parse(localStorage.getItem(localStorageKey));
    if(storedToDos) setToDos(storedToDos);
  }, []);

  useEffect( () => {
    localStorage.setItem(localStorageKey, JSON.stringify(toDos));
  }, [toDos]);

  function toggleToDo(id) {
  // Function to toggle the completed property of a to-do item
    const newToDos = [...toDos];
    const toDo = newToDos.find( toDo => toDo.id === id);
    toDo.completed = !toDo.completed;
    setToDos(newToDos);
  }

  function addToDo(e) {
  // Function to add a new to-do item
    const names = toDoNameref.current.value;
    if (names === '') return;
    setToDos( prevToDos => {
      return [...prevToDos, {id: uuidv4(), name: names, completed: false} ]
    });
    toDoNameref.current.value = null;
  } 

  function handleClearToDos() {
  // Function to clear completed to-do items
    const newToDos = toDos.filter( toDo => !toDo.completed);
    setToDos(newToDos);
  }

  return (
    <>
      <ToDoList toDos = {toDos} toggleToDo={toggleToDo} />
      <input ref={toDoNameref} type="text" placeholder="Add a new task" />
      <button onClick={addToDo}>Add Task</button>
      <button onClick={handleClearToDos}>Clear Completed </button>
      <div> {toDos.filter(toDo => !toDo.completed).lenght} Left To Do </div>
    </>
  );
}

export default App;
