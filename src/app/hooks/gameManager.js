"use client";

import { useState } from "react";

export function useGameManager() {

    // Controla se a partida terminou
    const [gameOver, setGameOver] = useState(false);

    // Estado do herói
    const [hero, setHero] = useState({
        name: "Mago",
        life: 100,
        maxLife: 100
    });

    // Estado do inimigo
    const [enemy, setEnemy] = useState({
        name: "Demônio",
        life: 100,
        maxLife: 100
    });

    // Define de quem é o turno atual
    const [isHeroTurn, setIsHeroTurn] = useState(true);

    // Mensagem exibida durante a batalha
    const [message, setMessage] =
        useState("Seu turno!");

    // Reduz a vida do inimigo
    function attackEnemy(damage) {

        setEnemy(prev => ({
            ...prev,
            life: Math.max(0, prev.life - damage)
        }));
    }

    // Reduz a vida do herói
    function attackHero(damage) {

        setHero(prev => ({
            ...prev,
            life: Math.max(0, prev.life - damage)
        }));
    }

    // Ação de ataque do jogador
    function attack() {

        // Impede ações fora do turno ou após o fim da partida
        if (!isHeroTurn || gameOver) return;

        const damage = 15;

        // Calcula a nova vida do inimigo
        const newEnemyLife =
            Math.max(0, enemy.life - damage);

        // Atualiza a vida do inimigo
        setEnemy(prev => ({
            ...prev,
            life: newEnemyLife
        }));

        setMessage("🧙‍♂️ Você atacou!");

        // Verifica condição de vitória
        if (newEnemyLife <= 0) {

            setMessage("💥 Golpe final!");

            // Aguarda a animação da barra antes de finalizar
            setTimeout(() => {

                setMessage("🎉 Você venceu!");

                setGameOver(true);

            }, 1200);

            return;
        }

        // Passa o turno para o inimigo
        setIsHeroTurn(false);

        // Executa a ação do inimigo após um tempo
        setTimeout(() => {
            enemyTurn();
        }, 1000);
    }

    // Ação de defesa do jogador
    function defense() {

        if (!isHeroTurn || gameOver) return;

        setMessage("🛡 Você se defendeu!");

        // Recupera pequena quantidade de vida
        setHero(prev => ({
            ...prev,
            life: Math.min(
                prev.maxLife,
                prev.life + 5
            )
        }));

        setIsHeroTurn(false);

        setTimeout(enemyTurn, 1000);
    }

    // Ação de usar poção
    function usePotion() {

        if (!isHeroTurn || gameOver) return;

        setMessage("🧪 Você usou poção!");

        // Recupera uma quantidade maior de vida
        setHero(prev => ({
            ...prev,
            life: Math.min(
                prev.maxLife,
                prev.life + 20
            )
        }));

        setIsHeroTurn(false);

        setTimeout(enemyTurn, 1000);
    }

    // Reinicia a página ao fugir da batalha
    function flee() {

        if (!isHeroTurn || gameOver) return;

        location.reload();
    }

    // Inteligência artificial do inimigo
    function enemyTurn() {

        // Impede ações caso o jogo tenha acabado
        if (gameOver) return;

        // Gera ação aleatória
        const random = Math.random();

        // Chance do inimigo atacar
        if (random < 0.8) {

            const damage = 12;

            // Calcula nova vida do herói
            const newHeroLife =
                Math.max(0, hero.life - damage);

            // Atualiza vida do herói
            setHero(prev => ({
                ...prev,
                life: newHeroLife
            }));

            setMessage("👹 O vilão atacou!");

            // Verifica condição de derrota
            if (newHeroLife <= 0) {

                setMessage("💥 O golpe foi fatal!");

                // Aguarda animação antes de finalizar
                setTimeout(() => {

                    setMessage("💀 Você perdeu!");

                    setGameOver(true);

                }, 1200);

                return;
            }

        } else {

            // Chance do inimigo recuperar vida
            setEnemy(prev => ({
                ...prev,
                life: Math.min(
                    prev.maxLife,
                    prev.life + 10
                )
            }));

            setMessage("👹 O vilão se curou!");
        }

        // Devolve o turno ao jogador
        setIsHeroTurn(true);
    }

    // Retorna estados e funções para uso no jogo
    return {
        hero,
        enemy,
        isHeroTurn,
        gameOver,
        message,
        attack,
        defense,
        usePotion,
        flee
    };
}