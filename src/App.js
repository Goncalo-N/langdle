import React, { useState, useEffect } from 'react';
import './App.css'; // Import your CSS file
import Popup from './Popup'; // Import the Popup component

const words = [
  "java", "python", "swift", "go", "kotlin", 
  "javascript", "ruby", "csharp", "php", 
  "typescript", "perl", "scala", "rust", 
  "r", "julia", "dart", "elixir", "haskell", 
  "clojure", "erlang"
];

function App() {
  const [correctWord, setCorrectWord] = useState('');
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to manage the popup visibility

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCorrectWord(words[randomIndex]);
    setGuess('');
    setFeedback([]);
    setMessage('');
    setGameOver(false);
    setShowPopup(false); // Hide the popup when resetting the game
  };

  const handleGuess = () => {
    if (guess.trim()) {
      if (guess.toLowerCase() === correctWord) {
        setMessage(`Congratulations! The correct word is "${correctWord}".`);
        setFeedback([]);
        setGameOver(true);
        setShowPopup(true); // Show the popup when winning
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleGuess();
    }
  };

  const giveUp = () => {
    setMessage(`The correct word was "${correctWord}".`);
    setGameOver(true);
    setShowPopup(true); // Show the popup when giving up
  };

  const closePopup = () => {
    setShowPopup(false); // Close the popup
  };

  return (
    <div className="App">
      <h1>Langdle</h1>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={correctWord.length}
        placeholder="Type your guess..."
        disabled={gameOver}
      />
      <button onClick={handleGuess} disabled={gameOver}>Guess</button>
      <button className="give-up-button" onClick={giveUp} disabled={gameOver}>Give Up</button>
      <button className="restart-button" onClick={resetGame}>Restart</button>
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
      {showPopup && (
        <Popup 
          message={message} 
          onRetry={resetGame} 
          onClose={closePopup} 
        />
      )}
    </div>
  );
}

export default App;
