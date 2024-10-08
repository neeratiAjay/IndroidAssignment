import {useState, useEffect} from 'react'
import {QRCodeSVG} from 'qrcode.react'
import Player from './components/Player'
import questions from './components/Questions'
import './App.css'

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const [playerNames, setPlayerName] = useState([])

  const [displayScoreBoard, setScoreBoard] = useState(false)

  const [message, setMessage] = useState('')

  const isValid = currentQuestion < questions.length

  const joinPlayer = name => {
    if (!playerNames.includes(name)) {
      setPlayerName([...playerNames, {name, score: 0}])
    }
  }

  const handleAnswer = (player, answer) => {
    if (answer === questions[currentQuestion].answer) {
      setMessage(`Congratulations ${player}!`)
      console.log(`player Name ${player}`)
      const findPlayer = playerNames.find(obj => obj.name === player)
      setTimeout(() => {
        if (findPlayer !== undefined) {
          setPlayerName(prevPlayer => [
            ...prevPlayer.map(eachPlayer => {
              if (player === eachPlayer.name) {
                return {name: eachPlayer.name, score: eachPlayer.score + 1}
              }
              return eachPlayer
            }),
          ])
        }

        if (currentQuestion < questions.length) {
          setCurrentQuestion(currentQuestion + 1)

          setMessage('')
        }
      }, 2000)
    } else {
      setMessage(`Incorrect answer, ${player}. Try again!`)
      setTimeout(() => {
        if (currentQuestion < questions.length) {
          setCurrentQuestion(currentQuestion + 1)
          setMessage('')
        }
      }, 2000)
    }
  }

  useEffect(() => {
    if (currentQuestion >= parseInt(questions.length)) {
      setMessage(`Game Over! Thanks for playing!`)
      setScoreBoard(true)
    }
  }, [currentQuestion, playerNames])

  return (
    <div className="app-container">
      <div className="qr-container">
        <QRCodeSVG size={180} value={window.location.href} />
      </div>
      {isValid ? (
        <div className="q-container-lg">
          <h1 className="q-heading">{questions[currentQuestion].question}</h1>
          <ul className="ul-container">
            {questions[currentQuestion].options.map(option => (
              <li key={option} className="option-lg">
                {option}
              </li>
            ))}
          </ul>
          <p className="message-text-lg">{message}</p>
        </div>
      ) : (
        <p className="message-text-lg">{message}</p>
      )}
      <Player
        currentQuestion={currentQuestion}
        joinPlayerName={joinPlayer}
        handleJoin={handleAnswer}
        message={message}
        showScoreBoard={displayScoreBoard}
        playersData={playerNames}
      />
    </div>
  )
}

export default App

/*
 <ul className="ul-container">
          {questions[currentQuestion].options.map(option => (
            <li key={option} className="option-lg">
              {option}
            </li>
          ))}
        </ul>
 */
