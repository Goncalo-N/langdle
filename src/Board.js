import React from 'react';
import './Board.css';

const Board = ({ results, guesses }) => {
    return (
        <div className="board">
            {guesses.map((guess, index) => (
                <div key={index} className="guess-row">
                    {guess.split('').map((letter, i) => (
                        <span key={i} className={`letter ${results[index][i]}`}>
                            {letter}
                        </span>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Board;
