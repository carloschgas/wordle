import { useEffect, useState } from 'react'
import Line from './Line';
import './App.css'
import About from './About';

const reg = /^[A-Za-z]$/;

function App() {

  const MAX_ATTEMPTS = 6

  const [solution, setSolution] = useState('');
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [letters, setLetters] = useState(0);

  //something to keep the user guess
  const [guesses, setGuesses] = useState([]);

  //gamecontrol
  const [gameIsOver, setGameIsOver] = useState(false);

  //keyboard events
  useEffect(() => {
    const handleType = (e) => {

      if (!gameIsOver) {

        const letter = e.key

        //delete
        if (letter === 'Backspace') {

          if (letters === 0) return

          setGuess((prevGuess) => prevGuess.slice(0, -1));
          setLetters((prevLetras) => prevLetras - 1);

        }

        //next line
        else if (letter === 'Enter') {
          if (guess.length !== 5) return;

          setAttempts((prev) => prev + 1);
          setGuesses((prevLine) => [...prevLine, guess]);
          setGuess('');
          setLetters(0);

        }

        //write
        else if (letters < 5 && reg.test(letter)) {
          setGuess((prevGuess) => prevGuess + letter);
          setLetters((prevLetras) => prevLetras + 1);
          console.log(letters)
        }

      }

    }
      window.addEventListener('keydown', handleType)

    return () => window.removeEventListener('keydown', handleType)
  }, [guess, attempts, guesses, gameIsOver])

  useEffect(() => {
    if (guesses.includes(solution) || attempts >= MAX_ATTEMPTS){
      setGameIsOver(true);
    }
  }, [attempts, guesses, solution])

  //get word
  useEffect(() => {
    async function getWord() {

      try {
        const res = await fetch('https://api.dicionario-aberto.net/random');
        const data = await res.json();
        const word = data.word;

        if (word.length === 5) {
          setSolution(word);
        } else {
          getWord();
        }
      } catch (error) {
        console.error('Erro ao buscar a palavra:', error);
      }
    }
    getWord();

  }, []);



  return (
    <>

      <div className="table">
        {Array.from({ length: MAX_ATTEMPTS }, (_, i) => (

          <Line
            key={i}
            customKey={i}
            guess={guess}
            try={attempts}
            finalLine={guesses[i]}
            solution={solution}
          />

        ))}

      </div>

      {gameIsOver? 
      <p>
        A palavra era: {solution}
      </p> : null}

        <About/>
    </>
  );
}



export default App;
