"use client";

export default function Character({
    data,
    isHero,
    onAction,
    isHeroTurn
}) {

    // Calcula a porcentagem da vida atual
    // para preencher a barra dinamicamente
    const lifePercent =
        (data.life / data.maxLife) * 100;

    return (

        // Define classes diferentes para herói e inimigo
        <div className={`character ${isHero ? "hero" : "enemy"}`}>

            <div className="character-header">

                {/* Exibe ícone diferente dependendo do personagem */}
                <div className="icon">
                    {isHero ? "🧙‍♂️" : "👹"}
                </div>

                <h2>
                    {data.name}
                </h2>
            </div>

            {/* Barra de vida */}
            <div className="life-bar">

                {/* Parte preenchida da barra */}
                <div
                    className="life-fill"
                    style={{
                        width: `${lifePercent}%`
                    }}
                />

                {/* Texto com vida atual e máxima */}
                <span className="life-text">
                    ❤️ {data.life} / {data.maxLife}
                </span>
            </div>

            {/* Área visual do personagem */}
            <div className="sprite">
                {isHero ? "⚔️" : "🔥"}
            </div>

            {/* Apenas o herói possui ações jogáveis */}
            {isHero && (

                <div className="actions">

                    {/* Botão de ataque */}
                    <button
                        disabled={!isHeroTurn}
                        onClick={() => onAction("attack")}
                    >
                        ⚔️ Atacar
                    </button>

                    {/* Botão de defesa */}
                    <button
                        disabled={!isHeroTurn}
                        onClick={() => onAction("defense")}
                    >
                        🛡 Defender
                    </button>

                    {/* Botão para recuperar vida */}
                    <button
                        disabled={!isHeroTurn}
                        onClick={() => onAction("usePotion")}
                    >
                        🧪 Poção
                    </button>

                    {/* Botão para sair da batalha */}
                    <button
                        disabled={!isHeroTurn}
                        onClick={() => onAction("flee")}
                    >
                        🏃 Fugir
                    </button>

                </div>
            )}

        </div>
    );
}