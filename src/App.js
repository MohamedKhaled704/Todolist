import React,{useState} from 'react';
import './App.css';
import Head from './components/Head';
import MyButton from './components/MyButton';
import TodoInput from './components/TodoInput';
import TodoItem from './components/TodoItem'
import TodoItemFav from './components/TodoItemFav';


function App() {
  const [inputValue, getInputValue] =useState({});
  const [todos,setTodos] =useState([]); 

  const setValue=(obj)=>{
    getInputValue(obj);
  }

  const addTodo=(obj)=>{
    obj.key=Math.floor(Math.random()*10000+1000);
    setTodos([...todos,obj]);
  }

  const deleteTodo = (id)=>{
    let updateTodos=[...todos].filter((todo)=>todo.key !==id);
    setTodos(updateTodos);
  }

  const doneTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if(todo.key === id) {
        todo.isDone = !todo.isDone
      }
      return todo;
    })
    setTodos(updatedTodos)
  }

  const favTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if(todo.key === id) {
        todo.isFav = !todo.isFav
      }
      return todo;
    })
    setTodos(updatedTodos)
  }

  
  return (
    <div>
    <Head mystyle="header" text="Todo App"/>
    <nav></nav>
    <main className="todo-app">
      <section className='left-container'>
        <h2>Todo list</h2>
    {todos.map((todo,index) => {
        return (
          <TodoItem  todo={todo} key={index} deleteTodo={deleteTodo} doneTodo={doneTodo} favTodo={favTodo} />
        );
      })}
      </section>
      <section className='rigth-container'>
      <TodoInput 
      getValue={(obj)=>setValue(obj)}
      myStyle="input" 
      hint1="enter todo name" 
      text="Add a task"
      />
      <MyButton text="Add" myStyle="btn" handleClick={() => addTodo(inputValue)} />
      <hr/>
      <h4>Favourite list</h4>
      {todos.filter((value)=>value.isFav).map((todo,index) => {
        return (
          <TodoItemFav  todo={todo} key={index}  deleteTodo={deleteTodo} doneTodo={doneTodo} favTodo={favTodo}   />
        );
      })}
      </section>
    </main>
    </div>
  );
}

export default App;
