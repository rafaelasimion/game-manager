"use client";

import Character from "./components/Character";
import { useGameManager } from "./hooks/gameManager";

export default function Page() {

    // Inicializa os estados e funções do jogo
    const game = useGameManager();

    return (

        // Área principal da interface
        <main className="game">

            {/* Título do jogo */}
            <h1 className="title">
                ⚔️ Mini RPG Battle
            </h1>

            {/* Exibe mensagens de ações e eventos */}
            <p className="message">
                {game.message}
            </p>

            {/* Tela exibida após vitória ou derrota */}
            {game.gameOver && (

                <div className="game-over">

                    {/* Define mensagem dependendo do resultado */}
                    <h1>
                        {game.hero.life <= 0
                            ? "💀 Você perdeu!"
                            : "🎉 Você venceu!"
                        }
                    </h1>

                    {/* Reinicia a partida recarregando a página */}
                    <button
                        className="restart-btn"
                        onClick={() => location.reload()}
                    >
                        🔄 Jogar novamente
                    </button>

                </div>
            )}

            {/* Área onde os personagens são exibidos */}
            <div className="arena">

                {/* Componente do herói */}
                <Character
                    data={game.hero}
                    isHero={true}

                    // Executa a ação escolhida pelo jogador
                    onAction={(action) => {

                        if (action === "attack")
                            game.attack();

                        if (action === "defense")
                            game.defense();

                        if (action === "usePotion")
                            game.usePotion();

                        if (action === "flee")
                            game.flee();
                    }}

                    // Controla disponibilidade dos botões
                    isHeroTurn={game.isHeroTurn}
                />

                {/* Componente do inimigo */}
                <Character
                    data={game.enemy}
                    isHero={false}
                />

            </div>

        </main>
    );
}