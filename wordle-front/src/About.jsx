import React, { useState } from "react";

function About() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {isOpen ? (
                <div className="about">
                    <p>
                        Esse site foi criado com base no jogo{" "}
                        <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a> de maneira sem existir fins lucrativos.
                    </p>
                    <p>Criado por Carlos Chagas apenas com a intenção de estudar a lógica por trás do jogo original.</p>
                    <button onClick={() => setIsOpen((prev) => !prev)}>Fechar</button>
                </div>
            ) : (
                <button className="circle" onClick={() => setIsOpen((prev) => !prev)}>
                    SOBRE
                </button>
            )}
        </>
    );
}

export default About;
