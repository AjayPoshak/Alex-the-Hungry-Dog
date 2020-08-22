import React from 'react'

const Score = ({score, text}) => {
    return <section className="score-container"><p>{text}</p><span className="score">{score}</span></section>
}

export default Score