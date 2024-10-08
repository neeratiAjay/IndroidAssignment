import {useState} from 'react'
import questions from '../Questions'
import './index.css'

const Player = props => {
  const {
    currentQuestion,
    joinPlayerName,
    handleJoin,
    message,
    showScoreBoard,
    playersData,
  } = props
  const [showNameContainer, setNameContainer] = useState(false)
  const [selectedOption, setOption] = useState('')
  const [player, setPlayer] = useState('')

  const isValid = currentQuestion < questions.length

  const sortPlayersData = playersData.sort((a, b) => b.score - a.score)

  const submitNameContainer = event => {
    event.preventDefault()
    setNameContainer(true)
    joinPlayerName(player)
  }
  const submitAnswer = event => {
    event.preventDefault()
    handleJoin(player, selectedOption)
    setOption('')
  }

  return (
    <div className="player-container">
      {!showNameContainer && (
        <form className="input-container" onSubmit={submitNameContainer}>
          <input
            type="text"
            placeholder="Enter your name"
            className="input"
            onChange={event => setPlayer(event.target.value)}
            required
          />
          <button type="submit" className="sbmit-btn">
            Submit
          </button>
        </form>
      )}
      {isValid && (
        <form onSubmit={submitAnswer}>
          <h1 className="sm-qestion">{questions[currentQuestion].question}</h1>
          <ul className="ul-container-player">
            {questions[currentQuestion].options.map(option => (
              <li key={option} className="list-item">
                <input
                  type="radio"
                  name="option"
                  id={option}
                  className="radio"
                  onChange={() => setOption(option[0])}
                  value={player}
                />
                <label htmlFor={option} className="option-text">
                  {option}
                </label>
              </li>
            ))}
          </ul>
          <button type="submit" className="submit-btn-sm">
            Submit
          </button>
        </form>
      )}
      <p className="message-sm">{message}</p>

      {showScoreBoard && (
        <div className="score-container">
          <h1 className="result-heading">Results:-</h1>
          <ul className="results-ul-container">
            <li className="name-text" key="name">
              Name
            </li>
            <li className="name-text" key="score">
              Score
            </li>
          </ul>
          <ul className="ul-column-container">
            {sortPlayersData.map(eachObj => (
              <li key={eachObj.name} className="results-ul-container">
                <p className="result-text">{eachObj.name}</p>
                <p className="result-text">{eachObj.score}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
export default Player
