import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file

const words = ["java", "python", "swift", "go", "kotlin", "javascript", "ruby", "csharp", "php", "typescript", "perl", "scala", "rust", "r", "julia", "dart", "elixir", "haskell", "clojure", "erlang"];

function App() {
  const [correctWord, setCorrectWord] = useState('');
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCorrectWord(words[randomIndex]);
  }, []);

  const handleGuess = () => {
    if (guess.trim()) {
      if (guess.toLowerCase() === correctWord) {
        setMessage(`Congratulations! The correct word is "${correctWord}".`);
        setFeedback([]);
      } else {
        setFeedback([...feedback, evaluateGuess(guess)]);
        setGuess('');
      }
    }
  };

  const evaluateGuess = (guess) => {
    const result = [];
    for (let i = 0; i < correctWord.length; i++) {
      if (guess[i] === correctWord[i]) {
        result.push({ letter: guess[i], status: 'correct' });
      } else if (correctWord.includes(guess[i])) {
        result.push({ letter: guess[i], status: 'wrong-position' });
      } else {
        result.push({ letter: guess[i], status: 'incorrect' });
      }
    }
    return result;
  };

  return (
    <div className="App">
      <h1>Langdle</h1>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        maxLength={correctWord.length}
        placeholder="Type your guess..."
      />
      <button onClick={handleGuess}>Guess</button>
      <div className="feedback">
        {feedback.map((item, index) => (
          <div key={index} className="guess">
            {item.map((char, idx) => (
              <span key={idx} className={char.status}>
                {char.letter}
              </span>
            ))}
          </div>
        ))}
      </div>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
