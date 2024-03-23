import './App.css';
import { useState, useEffect } from 'react';

export default function App() {
  const [ authors , setAuthors ] = useState([]);
  const [ data, setData ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://jsonplaceholder.typicode.com/users');
      const body = await result.json();
      setData(body)
    }

    fetchData();
    console.log(data);
  }, [])

  const userList = data.map((user, index) => {
    return (
      <li key={index}>
        {user.name}
      </li>
    )
  });

  const nameList = authors.map((author, index) => {
    return (
      <li key={index}>
        {author}
      </li>
    )
  });

  return (
    <div className="App">
      <header className="App-header">
        <NameInput names={authors} setNames={setAuthors} />
        <ol>
          {nameList}
        </ol>
        <ol>
          {userList}
        </ol>
      </header>
    </div>
  );
}

function NameInput({ names , setNames }) {
  const [ input, setInput ] = useState("");
  const [ errorText, setErrorText ] = useState("");

  function handleChange(input) {
    setInput(input);
  }

  function handleSubmit() {
    if (input.length === 0) {
      setErrorText("Please enter a name");
      return;
    }
    console.log(input);
    let nextNames = names.slice();
    nextNames = [...nextNames, input];
    setNames(nextNames);
    setErrorText("");
    setInput("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleSubmit();
    }
  }

  return (
    <div>
      <div>
        <div> Author Name </div>
        <input 
          value={input}
          placeholder='Please enter name' 
          onChange={(event) => handleChange(event.target.value)}
          onKeyDown={(event) => handleKeyDown(event)}
          />
      </div>
      <button onClick={handleSubmit}>
        Submit 
      </button>
      <div> {errorText} </div>
    </div>
  )
}
