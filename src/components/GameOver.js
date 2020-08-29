import React from 'react'

const GameOver = ({score, onCloseClick}) => {
    return <section className="game-over-overlay" onClick={onCloseClick}>
        <div className="game-over-container">
            <div>
                <h3>Game Over!!!!</h3>
                <p className="score">Your Score is: {score}</p>
            </div>
            <button className="close" onClick={onCloseClick}>CLOSE</button>
        </div>
    </section>
}

export default GameOver