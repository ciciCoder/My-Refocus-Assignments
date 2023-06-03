import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from './components/shared/SearchBar';
import TodoList from './components/shared/TodoList';

function App() {
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    {id: 1, item: 'Brush my Teeth', isComplete: true},
    {id: 2, item: 'Meditate and Exercise', isComplete: false},
    {id: 3, item: 'Make a To Do List', isComplete: false},
  ]);

  return (
    <div className="App">
      <div className="search-bar">
        <SearchBar value={value} onChange={setValue}></SearchBar>
        <br />
        <TodoList items={items} updateList={setItems} />
      </div>
    </div>
  );
}

export default App;
