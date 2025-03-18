import React, { useEffect, useState } from "react";

const Line = (props) => {
    const WORD_LENGTH = 5;
    const [squares, setSquares] = useState(Array(WORD_LENGTH).fill(''));
    const [finals, setFinals] = useState(Array(WORD_LENGTH).fill(''));
    const [classes, setClasses] = useState(Array(WORD_LENGTH).fill(''));

    //typing in square
    useEffect(() => {
        const newSquares = [];
        for (let i = 0; i < WORD_LENGTH; i++) {
            newSquares[i] = props.guess?.[i] || '';
        }
        setSquares(newSquares);
    }, [props.guess, props.try]);

    //set attempt after enter
    useEffect(() => {
        props.finalLine 
        ? setFinals(props.finalLine.split(''))
        : setFinals(Array(WORD_LENGTH).fill(''));
    }, [props.finalLine]);

    //colors
    useEffect(() => {
        const checkSolution = () => {
            const newClasses = Array(WORD_LENGTH).fill('none');
            const solution = props.solution?.split('') || [];
            const solutionUsed = new Array(WORD_LENGTH).fill(false);

            if (props.finalLine) {
                //green class
                for (let i = 0; i < WORD_LENGTH; i++) {
                    if (props.finalLine[i] === solution[i]) {
                        newClasses[i] = 'green';
                        solutionUsed[i] = true;
                    }
                }

                //yellow class
                for (let i = 0; i < WORD_LENGTH; i++) {
                    if (newClasses[i] === 'green') continue;
                    
                    const currentChar = props.finalLine[i];
                    for (let j = 0; j < WORD_LENGTH; j++) {
                        if (!solutionUsed[j] && solution[j] === currentChar) {
                            newClasses[i] = 'yellow';
                            solutionUsed[j] = true;
                            break;
                        }
                    }
                }
            }
            setClasses(newClasses);
        };

        checkSolution();
    }, [props.finalLine, props.solution]);

    return (

        
        
        <div className="line">
            {props.customKey < props.try
                ? finals.map((char, index) => (
                    <div 
                        key={index} 
                        className={`square ${classes[index]}`}
                    >
                        <p className="text-square">{char}</p>
                    </div>
                ))
                : squares.map((char, index) => (
                    <div 
                        key={index} 
                        className="square"
                    >
                        <p className='text-square'>
                            {props.customKey === props.try ? char : ''}
                        </p>
                    </div>
                ))
            }
        </div>
    );
};

export default Line;