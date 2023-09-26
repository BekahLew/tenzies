import "./App.css";
import Die from "./Die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
    const [dice, setDice] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    let [rollCount, setRollCount] = useState(0);

    useEffect(() => {
        const allHeld = dice.every((die) => die.isHeld);
        const allSameValue = dice.every((die) => {
            if (die.value === dice[0].value) {
                return true;
            }
            return null;
        });
        if (allHeld && allSameValue) {
            setTenzies(true);
        }
    }, [dice]);

    function generateNewDice() {
        return {
            value: Math.ceil(Math.random() * 6),
            id: nanoid(),
            isHeld: false,
        };
    }

    function allNewDice() {
        const newDice = [];
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDice());
        }
        return newDice;
    }

    function holdDice(id) {
        setDice((prevDice) =>
            prevDice.map((die) => {
                return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
            })
        );
    }

    const diceElements = dice.map((die) => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />
    ));

    function rollDice() {
        if (!tenzies) {
            setRollCount((prevCount) => prevCount + 1);
        }
        if (tenzies) {
            setRollCount(0);
        }
        setDice((prevDice) =>
            prevDice.map((die) => {
                if (!tenzies) {
                    return die.isHeld ? die : generateNewDice();
                }
                if (tenzies) {
                    setTenzies(false);
                    return generateNewDice();
                }
                return null;
            })
        );
    }

    return (
        <div className="game-wrapper">
            {tenzies && <Confetti />}
            <h1>Tenzies</h1>
            <p>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dice-container">{diceElements}</div>
            <button className="roll-button" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
            {tenzies && <h2>Rolls taken to win: {rollCount}</h2>}
        </div>
    );
}

export default App;
