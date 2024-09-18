import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ width: 800 }}>
          <p>Меня зовут Аля Загацкая, я джуниор фронтенд разработчик, работаю с NextJs, React Native.</p>
          <p>
            С помощью этого курса хочу повысить свой уровень, больше узнать про сборку, архитектуру проекта, best
            practicies в React.
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
