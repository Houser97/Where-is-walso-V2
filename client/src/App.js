import { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import Characters from './components/Characters';
import Header from './components/Header';
import Message from './components/Message';
import Form from './components/Form';
import Board from './components/Board';
/*import Ladderboard from './components/Ladderboard';*/

export const gameContext = createContext();
export const userContext = createContext();

function App() {

  /*const OFFSET_Y = 140; // Corresponde a la altura del Header*/


  const [toggleMessage, setToggleMessage] = useState(false);


  const [isGameOver, setIsGameOver] = useState(false);
  const [numberOfCharacters, setNumberOfCharacters] = useState(3);

  const [characterHit, setCharacterHit] = useState(null); // Estado que cambia en SCOPE y pasa nombre de personaje a Message.

  const [finalTimeUser, setFinalTimeUser] = useState(0);
  const [username, setUsername] = useState(0);

  const[isGame, setIsGame] = useState(false); //Ayudará a iniciar COUNTER al presionar START en CHARACTERS

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setToggleMessage(false);
      clearTimeout(intervalId);
    }, 2000);

    return () => {
      clearTimeout(intervalId);
    }
  }, [toggleMessage])

  useEffect(() => {
    if(numberOfCharacters === 0){
      setIsGameOver(true);
    }
  }, [numberOfCharacters])

  useEffect(() => {
    // Hace aparecer Message solo cuando se halla un personaje.
    if(characterHit){
      setToggleMessage(true);
      setNumberOfCharacters(number => number - 1);
    } 
  }, [characterHit])


  const getUserName = (e) => {
    e.preventDefault();
    const popUpForm = e.target.parentNode;
    popUpForm.style.display = "none";
    let name = [...e.target];
    let userName = name[0].value;
    setUsername(userName);
    /*console.log(name[0].value);*/
    e.target.reset();
  }

  const getTime = (seconds) => {
    if(isGameOver){
      setFinalTimeUser(previousTime => previousTime + seconds);
    }
  }

  const gameProvider = {isGameOver, getTime, isGame, setIsGame , setCharacterHit, setToggleMessage}

  return (
    <gameContext.Provider value={gameProvider}>
      <userContext.Provider value={[username, finalTimeUser]}>
        <div className="App">
          <Header />
          <Form getUserName={getUserName} gameOver = {isGameOver} />
          {/*<Ladderboard />*/}
          <Characters />
          <Message toggleMessage={toggleMessage} characterHit = {characterHit} />
          <Board />
        </div>
        </userContext.Provider>
    </gameContext.Provider>
  );
}

export default App;