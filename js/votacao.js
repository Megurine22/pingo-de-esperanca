/* =========================================================
   VOTACAO.JS
   Responsável pela votação das campanhas.
   Pingo de Esperança
   ========================================================= */

import {
    dadosVotacao
} from "./dados.js";

import {
    salvarVotos,
    obterVotos,
    salvarVotoUsuario,
    obterVotoUsuario
} from "./storage.js";


/* =========================================================
   VOTOS INICIAIS
   ========================================================= */

const votosIniciais =
    Object.fromEntries(

        dadosVotacao.map(
            function (
                item
            ) {

                return [

                    item.id,

                    item.votos

                ];

            }
        )

    );


/* =========================================================
   VOTOS PERSISTIDOS
   ========================================================= */

const votos =
    obterVotos(
        votosIniciais
    );


/* =========================================================
   INICIALIZAR VOTAÇÃO
   ========================================================= */

export function inicializarVotacao() {

    const botoes =
        document.querySelectorAll(
            ".opcao-votacao"
        );


    const mensagem =
        document.querySelector(
            ".mensagem-votacao"
        );


    if (
        botoes.length ===
        0
    ) {

        return;

    }


    const votoUsuario =
        obterVotoUsuario();


    /* =====================================================
       RESTAURAR VOTO DO USUÁRIO
       ===================================================== */

    if (
        votoUsuario
    ) {

        botoes.forEach(
            function (
                botao
            ) {

                botao.disabled =
                    true;


                botao.setAttribute(
                    "aria-pressed",
                    botao.dataset.campanha ===
                    votoUsuario
                        ? "true"
                        : "false"
                );


                if (
                    botao.dataset.campanha ===
                    votoUsuario
                ) {

                    botao.classList.add(
                        "voto-selecionado"
                    );

                }

            }
        );


        if (
            mensagem
        ) {

            mensagem.textContent =
                "Seu voto já foi registrado neste navegador.";

        }

    }


    /* =====================================================
       EVENTO DE VOTO
       ===================================================== */

    botoes.forEach(
        function (
            botao
        ) {

            botao.addEventListener(
                "click",
                function () {

                    const campanha =
                        botao.dataset.campanha;


                    if (
                        !campanha
                    ) {

                        return;

                    }


                    /*
                     * Incrementa a quantidade de votos
                     * da campanha selecionada.
                     */

                    votos[campanha] =
                        (
                            votos[campanha] ||
                            0
                        ) + 1;


                    /*
                     * Salva os votos no localStorage.
                     */

                    const votosSalvos =
                        salvarVotos(
                            votos
                        );


                    /*
                     * Registra qual campanha foi
                     * escolhida pelo usuário.
                     */

                    const votoUsuarioSalvo =
                        salvarVotoUsuario(
                            campanha
                        );


                    /*
                     * Caso o armazenamento falhe,
                     * não finalizamos a votação.
                     */

                    if (
                        !votosSalvos ||
                        !votoUsuarioSalvo
                    ) {

                        if (
                            mensagem
                        ) {

                            mensagem.textContent =
                                "Não foi possível salvar seu voto neste navegador.";

                        }


                        return;

                    }


                    /* =================================
                       ATUALIZAR CONTADORES
                       ================================= */

                    atualizarContadoresDeVotos();


                    /* =================================
                       DESABILITAR OPÇÕES
                       ================================= */

                    botoes.forEach(
                        function (
                            outroBotao
                        ) {

                            outroBotao.disabled =
                                true;


                            outroBotao.classList.remove(
                                "voto-selecionado"
                            );


                            outroBotao.setAttribute(
                                "aria-pressed",
                                "false"
                            );

                        }
                    );


                    botao.classList.add(
                        "voto-selecionado"
                    );


                    botao.setAttribute(
                        "aria-pressed",
                        "true"
                    );


                    /* =================================
                       MENSAGEM
                       ================================= */

                    if (
                        mensagem
                    ) {

                        mensagem.textContent =
                            "Seu voto foi registrado. Obrigado por participar!";

                    }


                    /*
                     * Informa aos outros componentes,
                     * inclusive ao Vue, que os votos
                     * foram atualizados.
                     */

                    window.dispatchEvent(
                        new CustomEvent(
                            "pingo:voto-atualizado"
                        )
                    );

                }
            );

        }
    );

}


/* =========================================================
   ATUALIZAR CONTADORES
   ========================================================= */

export function atualizarContadoresDeVotos() {

    const contadores =
        document.querySelectorAll(
            ".contador-votos"
        );


    contadores.forEach(
        function (
            contador
        ) {

            const campanha =
                contador.dataset.campanha;


            if (
                !campanha
            ) {

                return;

            }


            if (
                votos[campanha] ===
                undefined
            ) {

                return;

            }


            contador.textContent =
                `${votos[campanha]} votos`;

        }
    );

}