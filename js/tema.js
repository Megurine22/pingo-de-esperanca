/* =========================================================
   TEMA DA APLICAÇÃO
   PINGO DE ESPERANÇA
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIGURAÇÕES
       ===================================================== */

    const CHAVE_TEMA =
        "pingo-de-esperanca-tema";

    const TEMA_CLARO =
        "light";

    const TEMA_ESCURO =
        "dark";


    /* =====================================================
       OBTÉM TEMA SALVO
       ===================================================== */

    function obterTemaSalvo() {

        try {

            const tema =
                localStorage.getItem(
                    CHAVE_TEMA
                );

            if (
                tema === TEMA_CLARO ||
                tema === TEMA_ESCURO
            ) {

                return tema;

            }

        } catch (erro) {

            console.warn(
                "Não foi possível acessar o localStorage.",
                erro
            );

        }

        return TEMA_CLARO;

    }


    /* =====================================================
       APLICA O TEMA IMEDIATAMENTE
       ===================================================== */

    function aplicarTemaVisual(
        tema
    ) {

        document.documentElement.setAttribute(
            "data-theme",
            tema
        );

    }


    /* =====================================================
       SALVA A PREFERÊNCIA
       ===================================================== */

    function salvarTema(
        tema
    ) {

        try {

            localStorage.setItem(
                CHAVE_TEMA,
                tema
            );

        } catch (erro) {

            console.warn(
                "Não foi possível salvar a preferência de tema.",
                erro
            );

        }

    }


    /* =====================================================
       CRIA O BOTÃO CASO ELE NÃO EXISTA
       ===================================================== */

    function obterOuCriarBotao() {

        let botao =
            document.getElementById(
                "botao-tema"
            );


        if (botao) {

            return botao;

        }


        const cabecalho =
            document.querySelector(
                ".cabecalho-topo"
            );


        if (!cabecalho) {

            return null;

        }


        botao =
            document.createElement(
                "button"
            );


        botao.type =
            "button";


        botao.id =
            "botao-tema";


        botao.className =
            "botao-tema";


        cabecalho.appendChild(
            botao
        );


        return botao;

    }


    /* =====================================================
       ATUALIZA O BOTÃO
       ===================================================== */

    function atualizarBotao(
        botao,
        tema
    ) {

        const modoEscuro =
            tema === TEMA_ESCURO;


        botao.textContent =
            modoEscuro
                ? "☀️"
                : "🌙";


        botao.setAttribute(
            "aria-label",
            modoEscuro
                ? "Ativar modo claro"
                : "Ativar modo escuro"
        );


        botao.setAttribute(
            "title",
            modoEscuro
                ? "Ativar modo claro"
                : "Ativar modo escuro"
        );


        botao.setAttribute(
            "aria-pressed",
            modoEscuro
                ? "true"
                : "false"
        );

    }


    /* =====================================================
       ALTERNA O TEMA
       ===================================================== */

    function alternarTema(
        botao
    ) {

        const temaAtual =
            document.documentElement.getAttribute(
                "data-theme"
            ) || TEMA_CLARO;


        const novoTema =
            temaAtual === TEMA_ESCURO
                ? TEMA_CLARO
                : TEMA_ESCURO;


        aplicarTemaVisual(
            novoTema
        );


        salvarTema(
            novoTema
        );


        atualizarBotao(
            botao,
            novoTema
        );

    }


    /* =====================================================
       INICIALIZAÇÃO
       ===================================================== */

    function inicializarTema() {

        const temaInicial =
            obterTemaSalvo();


        aplicarTemaVisual(
            temaInicial
        );


        const botao =
            obterOuCriarBotao();


        if (!botao) {

            return;

        }


        atualizarBotao(
            botao,
            temaInicial
        );


        botao.addEventListener(
            "click",
            function () {

                alternarTema(
                    botao
                );

            }
        );

    }


    /* =====================================================
       INICIAÇÃO
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            inicializarTema
        );

    } else {

        inicializarTema();

    }

})();