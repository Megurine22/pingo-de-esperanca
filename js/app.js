/* =========================================================
   APP.JS
   APLICAÇÃO SPA
   PINGO DE ESPERANÇA
   ========================================================= */


/* =========================================================
   TEMPLATES
   ========================================================= */

import {
    templateInicio,
    templateProjetos,
    templateCadastro
} from "./templates.js";


/* =========================================================
   MÓDULOS
   ========================================================= */

import {
    inicializarFormulario
} from "./formulario.js";

import {
    inicializarVotacao,
    atualizarContadoresDeVotos
} from "./votacao.js";

import {
    inicializarCampanha
} from "./campanha.js";


/* =========================================================
   ROTAS
   ========================================================= */

const rotas = {

    inicio:
        templateInicio,

    projetos:
        templateProjetos,

    cadastro:
        templateCadastro

};


/* =========================================================
   APP
   ========================================================= */

const app =
    document.getElementById(
        "app"
    );


/* =========================================================
   NAVEGAÇÃO
   ========================================================= */

function obterNavegacao() {

    const hash =
        window.location.hash
            .replace(
                "#",
                ""
            );


    if (
        !hash
    ) {

        return {

            rota:
                "inicio",

            alvo:
                ""

        };

    }


    const partes =
        hash.split(
            "/"
        );


    return {

        rota:
            partes[0] ||
            "inicio",

        alvo:
            partes[1] ||
            ""

    };

}


/* =========================================================
   NAVEGAR
   ========================================================= */

function navegar(
    rota,
    alvo = ""
) {

    let destino =
        `#${rota}`;


    if (
        alvo
    ) {

        destino +=
            `/${alvo}`;

    }


    if (
        window.location.hash !==
        destino
    ) {

        window.location.hash =
            destino;

    } else {

        renderizar(
            rota,
            alvo
        );

    }

}


/* =========================================================
   RENDERIZAÇÃO DA SPA
   ========================================================= */

function renderizar(
    rota,
    alvo = ""
) {

    const template =
        rotas[rota] ||
        rotas.inicio;


    app.innerHTML =
        template();


    atualizarContadoresDeVotos();


    inicializarInteracoes(
        rota
    );


    if (
        rota ===
        "projetos"
    ) {

        inicializarWidgetVue();

    }


    fecharMenu();


    /* =====================================================
       NAVEGAÇÃO PARA ÂNCORA
       ===================================================== */

    if (
        alvo
    ) {

        setTimeout(
            function () {

                const elemento =
                    document.getElementById(
                        alvo
                    );


                if (
                    elemento
                ) {

                    elemento.scrollIntoView(
                        {
                            behavior:
                                "smooth",

                            block:
                                "start"
                        }
                    );

                }


                atualizarBotaoScroll();

            },
            100
        );

    } else {

        window.scrollTo(
            {
                top:
                    0,

                behavior:
                    "smooth"
            }
        );


        setTimeout(
            atualizarBotaoScroll,
            150
        );

    }

}


/* =========================================================
   INICIALIZAR COMPONENTE VUE
   ========================================================= */

function inicializarWidgetVue() {

    const painel =
        document.getElementById(
            "painel-vue"
        );


    if (
        !painel
    ) {

        return;

    }


    if (
        typeof window.montarPainelVue ===
        "function"
    ) {

        window.montarPainelVue();

        return;

    }


    painel.innerHTML = `

        <div
            style="
                padding: 24px;
                text-align: center;
            ">

            <span class="badge-status status-planejada">

                VUE 3

            </span>


            <h3>

                Componente Vue indisponível

            </h3>


            <p>

                O arquivo do componente Vue não foi carregado.

            </p>

        </div>

    `;


    console.error(
        "window.montarPainelVue não está disponível."
    );

}


/* =========================================================
   LINKS DA SPA
   ========================================================= */

document.addEventListener(
    "click",
    function (
        event
    ) {

        const link =
            event.target.closest(
                "[data-rota]"
            );


        if (
            !link
        ) {

            return;

        }


        event.preventDefault();


        navegar(
            link.dataset.rota,
            link.dataset.alvo ||
                ""
        );

    }
);


/* =========================================================
   HASHCHANGE
   ========================================================= */

window.addEventListener(
    "hashchange",
    function () {

        const navegacao =
            obterNavegacao();


        renderizar(
            navegacao.rota,
            navegacao.alvo
        );

    }
);


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navegacao =
            obterNavegacao();


        renderizar(
            navegacao.rota,
            navegacao.alvo
        );


        inicializarBotaoScroll();

    }
);


/* =========================================================
   FECHAR MENU
   ========================================================= */

function fecharMenu() {

    const menu =
        document.getElementById(
            "menu-principal"
        );


    const botao =
        document.querySelector(
            ".botao-menu"
        );


    if (
        !menu
    ) {

        return;

    }


    menu.classList.remove(
        "menu-aberto"
    );


    if (
        botao
    ) {

        botao.setAttribute(
            "aria-expanded",
            "false"
        );


        botao.setAttribute(
            "aria-label",
            "Abrir menu"
        );

    }

}


/* =========================================================
   INTERAÇÕES
   ========================================================= */

function inicializarInteracoes(
    rota
) {

    if (
        rota ===
        "inicio"
    ) {

        inicializarCarrossel();

    }


    if (
        rota ===
        "projetos"
    ) {

        inicializarVotacao();

        inicializarCampanha();

    }


    if (
        rota ===
        "cadastro"
    ) {

        inicializarFormulario();

    }

}


/* =========================================================
   CARROSSEL
   ========================================================= */

function inicializarCarrossel() {

    const imagem =
        document.getElementById(
            "imagem-carrossel"
        );


    const indicadores =
        document.querySelectorAll(
            ".indicador"
        );


    if (
        !imagem ||
        indicadores.length ===
        0
    ) {

        return;

    }


    const imagens = [

        {

            src:
                "../imagens/ong.jpg.png",

            alt:
                "Cachorro caramelo e gato preto e branco representando o cuidado com os animais"

        },

        {

            src:
                "../imagens/doacoes.png",

            alt:
                "Voluntária organizando alimentos e doações em uma ação social da Pingo de Esperança"

        }

    ];


    let atual =
        0;


    function trocarImagem(
        numero
    ) {

        atual =
            numero;


        imagem.style.opacity =
            "0";


        setTimeout(
            function () {

                if (
                    !document.body.contains(
                        imagem
                    )
                ) {

                    return;

                }


                imagem.src =
                    imagens[
                        atual
                    ].src;


                imagem.alt =
                    imagens[
                        atual
                    ].alt;


                imagem.style.opacity =
                    "1";

            },
            250
        );


        indicadores.forEach(
            function (
                indicador,
                indice
            ) {

                indicador.classList.toggle(
                    "ativo",
                    indice ===
                    atual
                );

            }
        );

    }


    indicadores.forEach(
        function (
            indicador
        ) {

            indicador.addEventListener(
                "click",
                function () {

                    trocarImagem(
                        Number(
                            indicador.dataset.imagem
                        )
                    );

                }
            );

        }
    );


    const intervalo =
        setInterval(
            function () {

                if (
                    !document.body.contains(
                        imagem
                    )
                ) {

                    clearInterval(
                        intervalo
                    );

                    return;

                }


                atual =
                    (
                        atual + 1
                    )
                    %
                    imagens.length;


                trocarImagem(
                    atual
                );

            },
            3000
        );

}


/* =========================================================
   BOTÃO DE ROLAGEM
   ========================================================= */

function inicializarBotaoScroll() {

    const botao =
        document.getElementById(
            "botao-scroll"
        );


    if (
        !botao
    ) {

        return;

    }


    botao.addEventListener(
        "click",
        function () {

            const documento =
                document.documentElement;


            const estaNoFinal =
                window.scrollY +
                window.innerHeight >=
                documento.scrollHeight -
                80;


            if (
                estaNoFinal
            ) {

                window.scrollTo(
                    {
                        top:
                            0,

                        behavior:
                            "smooth"
                    }
                );

            } else {

                window.scrollTo(
                    {
                        top:
                            documento.scrollHeight,

                        behavior:
                            "smooth"
                    }
                );

            }

        }
    );


    window.addEventListener(
        "scroll",
        atualizarBotaoScroll,
        {
            passive:
                true
        }
    );


    window.addEventListener(
        "resize",
        atualizarBotaoScroll
    );


    atualizarBotaoScroll();

}


/* =========================================================
   ATUALIZAR BOTÃO DE ROLAGEM
   ========================================================= */

function atualizarBotaoScroll() {

    const botao =
        document.getElementById(
            "botao-scroll"
        );


    if (
        !botao
    ) {

        return;

    }


    const documento =
        document.documentElement;


    const possuiRolagem =
        documento.scrollHeight >
        window.innerHeight +
        10;


    if (
        !possuiRolagem
    ) {

        botao.hidden =
            true;

        return;

    }


    botao.hidden =
        false;


    const estaNoFinal =
        window.scrollY +
        window.innerHeight >=
        documento.scrollHeight -
        80;


    if (
        estaNoFinal
    ) {

        botao.textContent =
            "↑";


        botao.setAttribute(
            "aria-label",
            "Voltar ao topo da página"
        );


        botao.setAttribute(
            "title",
            "Voltar ao topo da página"
        );

    } else {

        botao.textContent =
            "↓";


        botao.setAttribute(
            "aria-label",
            "Descer para o final da página"
        );


        botao.setAttribute(
            "title",
            "Descer para o final da página"
        );

    }

}