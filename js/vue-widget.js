/* =========================================================
   VUE-WIDGET.JS
   PAINEL INTERATIVO DE PARTICIPAÇÃO
   PINGO DE ESPERANÇA
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       INSTÂNCIA ATUAL DO VUE
       ===================================================== */

    let instanciaVue = null;


    /* =====================================================
       ESTILOS ESPECÍFICOS DO PAINEL
       ===================================================== */

    function inserirEstilosPainel() {

        const estiloExistente =
            document.getElementById(
                "estilos-painel-vue"
            );


        if (
            estiloExistente
        ) {

            return;

        }


        const estilo =
            document.createElement(
                "style"
            );


        estilo.id =
            "estilos-painel-vue";


        estilo.textContent = `

            /* =============================================
               PAINEL
               ============================================= */

            #painel-vue {
                padding: 0 !important;
                min-height: 0 !important;
            }


            .painel-vue-conteudo {
                width: 100%;
                box-sizing: border-box;
                text-align: center;
            }


            .painel-vue-titulo {
                margin: 0 0 10px;
                color: var(--cor-azul-escuro);
                font-family: var(--fonte-titulos);
                font-size: var(--texto-md);
            }


            .painel-vue-descricao {
                max-width: 760px;
                margin: 0 auto var(--espaco-3);
                color: var(--cor-texto);
                line-height: 1.6;
            }


            /* =============================================
               STATUS
               ============================================= */

            .status-painel {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                margin-bottom: 10px;
                padding: 6px 12px;
                background: var(--cor-neutro-claro);
                border-radius: var(--raio-pill);
                color: var(--cor-azul-principal);
                font-size: var(--texto-xs);
                font-weight: 700;
            }


            .status-painel-ponto {
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: var(--cor-sucesso);
            }


            /* =============================================
               RESUMO
               ============================================= */

            .painel-resumo {
                display: grid;
                grid-template-columns:
                    repeat(3, minmax(0, 1fr));
                gap: var(--espaco-2);
                margin: var(--espaco-3) auto;
                width: 100%;
            }


            .painel-indicador {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 6px;
                min-height: 105px;
                padding: var(--espaco-2);
                box-sizing: border-box;
                background: var(--cor-branco);
                border: 1px solid var(--cor-neutro-borda);
                border-radius: var(--raio-md);
                box-shadow: var(--sombra-suave);
                transition:
                    transform 0.2s ease,
                    box-shadow 0.2s ease,
                    border-color 0.2s ease;
            }


            .painel-indicador:hover {
                transform: translateY(-2px);
                box-shadow: var(--sombra-media);
                border-color: var(--cor-azul-claro);
            }


            .painel-indicador-icone {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 34px;
                height: 34px;
                border-radius: 50%;
                background: var(--cor-neutro-claro);
                color: var(--cor-azul-principal);
                font-size: 1rem;
                font-weight: 700;
            }


            .painel-indicador-rotulo {
                color: var(--cor-texto-secundario);
                font-size: var(--texto-xs);
            }


            .painel-indicador-valor {
                color: var(--cor-azul-escuro);
                font-family: var(--fonte-titulos);
                font-size: var(--texto-md);
                font-weight: 700;
            }


            /* =============================================
               GRÁFICO
               ============================================= */

            .grafico-votos {
                margin-top: var(--espaco-4);
                padding: var(--espaco-3);
                background: var(--cor-branco);
                border: 1px solid var(--cor-neutro-borda);
                border-radius: var(--raio-lg);
                box-shadow: var(--sombra-suave);
                text-align: left;
            }


            .grafico-cabecalho {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--espaco-2);
                margin-bottom: var(--espaco-3);
            }


            .grafico-cabecalho h4 {
                margin: 0;
                color: var(--cor-azul-escuro);
                font-family: var(--fonte-titulos);
                font-size: 1.15rem;
            }


            .grafico-cabecalho span {
                color: var(--cor-texto-secundario);
                font-size: var(--texto-xs);
            }


            .barra-voto {
                margin-bottom: var(--espaco-3);
            }


            .barra-voto:last-child {
                margin-bottom: 0;
            }


            .barra-voto-topo {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: var(--espaco-2);
                margin-bottom: 7px;
            }


            .barra-voto-nome {
                display: flex;
                align-items: center;
                gap: 8px;
                min-width: 0;
                color: var(--cor-texto);
                font-weight: 600;
            }


            .barra-voto-icone {
                flex-shrink: 0;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: var(--cor-fundo-claro);
                color: var(--cor-azul-principal);
            }


            .barra-voto-total {
                flex-shrink: 0;
                color: var(--cor-azul-principal);
                font-weight: 700;
            }


            .barra-voto-trilho {
                width: 100%;
                height: 12px;
                overflow: hidden;
                background: var(--cor-neutro-claro);
                border-radius: 30px;
            }


            .barra-voto-progresso {
                height: 100%;
                min-width: 8px;
                border-radius: inherit;
                background:
                    linear-gradient(
                        90deg,
                        var(--cor-azul-principal),
                        var(--cor-azul-claro)
                    );
                transition:
                    width 0.5s ease;
            }


            /* =============================================
               NOTIFICAÇÃO DA PROPOSTA
               ============================================= */

            .notificacao-proposta {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                margin-top: var(--espaco-3);
                padding: 14px 16px;
                background: #f2fbf3;
                border: 1px solid #b8dabb;
                border-radius: var(--raio-md);
                color: var(--cor-sucesso);
                text-align: left;
                line-height: 1.5;
            }


            .notificacao-proposta-icone {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background: #dff1e1;
                color: var(--cor-sucesso);
                font-weight: 700;
            }


            .notificacao-proposta-conteudo {
                flex: 1;
                min-width: 0;
            }


            .notificacao-proposta-conteudo strong {
                color: var(--cor-sucesso);
            }


            .notificacao-proposta-conteudo small {
                display: block;
                margin-top: 4px;
                color: #55735a;
            }


            /* =============================================
               BOTÃO DE DETALHES
               ============================================= */

            .botao-detalhes-vue {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                margin-top: var(--espaco-3);
                padding: 12px 20px;
                border: 2px solid var(--cor-azul-principal);
                border-radius: var(--raio-pill);
                background: var(--cor-branco);
                color: var(--cor-azul-principal);
                font-family: var(--fonte-principal);
                font-weight: 700;
                cursor: pointer;
                transition:
                    background 0.2s ease,
                    color 0.2s ease,
                    transform 0.2s ease,
                    box-shadow 0.2s ease;
            }


            .botao-detalhes-vue:hover {
                background: var(--cor-azul-principal);
                color: var(--cor-branco);
                transform: translateY(-1px);
                box-shadow: var(--sombra-suave);
            }


            .botao-detalhes-vue:focus-visible {
                outline: 3px solid var(--cor-destaque);
                outline-offset: 3px;
            }


            .seta-detalhes-vue {
                display: inline-block;
                font-size: 0.85rem;
                transition:
                    transform 0.25s ease;
            }


            .seta-detalhes-vue.aberta {
                transform: rotate(180deg);
            }


            /* =============================================
               DETALHES
               ============================================= */

            .detalhes-vue {
                margin-top: var(--espaco-3);
                padding: var(--espaco-3);
                background: var(--cor-fundo-suave);
                border: 1px solid var(--cor-neutro-borda-clara);
                border-radius: var(--raio-md);
                text-align: left;
                animation:
                    aparecerDetalhes 0.25s ease;
            }


            .detalhes-vue p {
                margin: 0 0 var(--espaco-2);
                color: var(--cor-texto);
                line-height: 1.6;
            }


            .detalhes-vue p:last-child {
                margin-bottom: 0;
            }


            .atualizacao-painel {
                margin-top: var(--espaco-2);
                color: var(--cor-texto-secundario);
                font-size: var(--texto-xs);
                text-align: center;
            }


            /* =============================================
               ANIMAÇÃO
               ============================================= */

            @keyframes aparecerDetalhes {

                from {
                    opacity: 0;
                    transform: translateY(-5px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }

            }


            /* =============================================
               RESPONSIVIDADE
               ============================================= */

            @media (max-width: 699px) {

                .painel-resumo {
                    grid-template-columns:
                        1fr;
                }


                .painel-indicador {
                    min-height: 90px;
                }


                .grafico-votos {
                    padding: var(--espaco-2);
                }


                .grafico-cabecalho {
                    flex-direction: column;
                    align-items: flex-start;
                }


                .notificacao-proposta {
                    padding: 12px;
                }

            }


            @media (max-width: 449px) {

                .barra-voto-nome {
                    font-size: var(--texto-xs);
                }


                .barra-voto-total {
                    font-size: var(--texto-xs);
                }


                .botao-detalhes-vue {
                    width: 100%;
                }

            }

        `;


        document.head.appendChild(
            estilo
        );

    }


    /* =====================================================
       VOTOS PADRÃO
       ===================================================== */

    const votosPadrao = {

        inverno:
            31,

        cesta:
            58,

        animal:
            42

    };


    /* =====================================================
       DADOS DO GRÁFICO
       ===================================================== */

    const campanhasGrafico = [

        {
            id:
                "inverno",

            titulo:
                "Inverno Solidário",

            descricao:
                "Roupas e cobertores.",

            icone:
                "❄"
        },


        {
            id:
                "cesta",

            titulo:
                "Cesta Solidária",

            descricao:
                "Alimentos para famílias.",

            icone:
                "♥"
        },


        {
            id:
                "animal",

            titulo:
                "Apoio Animal",

            descricao:
                "Ração e medicamentos.",

            icone:
                "🐾"
        }

    ];


    /* =====================================================
       OBTER VOTOS
       ===================================================== */

    function obterVotos() {

        try {

            const salvo =
                localStorage.getItem(
                    "pingoEsperancaVotos"
                );


            if (
                !salvo
            ) {

                return {
                    ...votosPadrao
                };

            }


            const dados =
                JSON.parse(
                    salvo
                );


            if (
                !dados ||
                typeof dados !==
                "object"
            ) {

                return {
                    ...votosPadrao
                };

            }


            return {

                ...votosPadrao,

                ...dados

            };

        } catch (
            erro
        ) {

            console.error(
                "Erro ao recuperar votos:",
                erro
            );


            return {
                ...votosPadrao
            };

        }

    }


    /* =====================================================
       TOTAL
       ===================================================== */

    function calcularTotalVotos() {

        return Object
            .values(
                obterVotos()
            )
            .reduce(
                function (
                    total,
                    quantidade
                ) {

                    return (
                        total +
                        Number(
                            quantidade
                        )
                    );

                },
                0
            );

    }


    /* =====================================================
       OBTER PROPOSTAS
       ===================================================== */

    function obterSolicitacoes() {

        try {

            const salvo =
                localStorage.getItem(
                    "pingoEsperancaSolicitacoesCampanha"
                );


            if (
                !salvo
            ) {

                return [];

            }


            const propostas =
                JSON.parse(
                    salvo
                );


            if (
                !Array.isArray(
                    propostas
                )
            ) {

                return [];

            }


            return propostas;

        } catch (
            erro
        ) {

            console.error(
                "Erro ao recuperar propostas:",
                erro
            );


            return [];

        }

    }


    /* =====================================================
       CONTAR PROPOSTAS
       ===================================================== */

    function contarPropostasPendentes() {

        return obterSolicitacoes()
            .filter(
                function (
                    proposta
                ) {

                    return (
                        proposta.status ===
                        "PENDENTE"
                    );

                }
            )
            .length;

    }


    /* =====================================================
       ÚLTIMA PROPOSTA
       ===================================================== */

    function obterUltimaProposta() {

        const propostas =
            obterSolicitacoes();


        if (
            propostas.length ===
            0
        ) {

            return null;

        }


        return [
            ...propostas
        ]
        .sort(
            function (
                a,
                b
            ) {

                const dataA =
                    Date.parse(
                        a.enviadoEm ||
                        ""
                    ) || 0;


                const dataB =
                    Date.parse(
                        b.enviadoEm ||
                        ""
                    ) || 0;


                return (
                    dataB -
                    dataA
                );

            }
        )[0];

    }


    /* =====================================================
       FORMATAR DATA E HORA
       ===================================================== */

    function formatarDataHora(
        data
    ) {

        if (
            !data
        ) {

            return "";

        }


        const dataConvertida =
            new Date(
                data
            );


        if (
            Number.isNaN(
                dataConvertida.getTime()
            )
        ) {

            return "";

        }


        return new Intl.DateTimeFormat(
            "pt-BR",
            {
                day:
                    "2-digit",

                month:
                    "2-digit",

                year:
                    "numeric",

                hour:
                    "2-digit",

                minute:
                    "2-digit"
            }
        )
        .format(
            dataConvertida
        );

    }


    /* =====================================================
       HORÁRIO ATUAL
       ===================================================== */

    function obterHorarioAtual() {

        return new Intl.DateTimeFormat(
            "pt-BR",
            {
                hour:
                    "2-digit",

                minute:
                    "2-digit"
            }
        )
        .format(
            new Date()
        );

    }


    /* =====================================================
       MONTAGEM
       ===================================================== */

    window.montarPainelVue =
        function () {

            const container =
                document.getElementById(
                    "painel-vue"
                );


            if (
                !container
            ) {

                return;

            }


            /* =============================================
               LIMPAR INSTÂNCIA ANTERIOR
               ============================================= */

            if (
                instanciaVue
            ) {

                try {

                    instanciaVue.unmount();

                } catch (
                    erro
                ) {

                    console.warn(
                        "Erro ao desmontar instância anterior:",
                        erro
                    );

                }


                instanciaVue =
                    null;

            }


            /* =============================================
               ESTILOS
               ============================================= */

            inserirEstilosPainel();


            /* =============================================
               VERIFICAR VUE
               ============================================= */

            if (
                !window.Vue
            ) {

                container.innerHTML = `

                    <div
                        class="painel-vue-conteudo">


                        <h3
                            class="painel-vue-titulo">

                            Painel de participação

                        </h3>


                        <p
                            class="painel-vue-descricao">

                            O componente interativo não pôde
                            ser inicializado neste navegador.

                        </p>


                    </div>

                `;


                return;

            }


            try {

                const {
                    createApp,
                    ref,
                    computed,
                    onUnmounted
                } =
                    window.Vue;


                /* =========================================
                   ESTADOS REATIVOS
                   ========================================= */

                const mostrarDetalhes =
                    ref(
                        false
                    );


                const votosAtualizados =
                    ref(
                        obterVotos()
                    );


                const propostasPendentes =
                    ref(
                        contarPropostasPendentes()
                    );


                const ultimaProposta =
                    ref(
                        obterUltimaProposta()
                    );


                const ultimaAtualizacao =
                    ref(
                        obterHorarioAtual()
                    );


                /* =========================================
                   TOTAL DE VOTOS
                   ========================================= */

                const totalVotos =
                    computed(
                        function () {

                            return Object
                                .values(
                                    votosAtualizados.value
                                )
                                .reduce(
                                    function (
                                        total,
                                        quantidade
                                    ) {

                                        return (

                                            total +
                                            Number(
                                                quantidade
                                            )

                                        );

                                    },
                                    0
                                );

                        }
                    );


                /* =========================================
                   MAIOR QUANTIDADE
                   ========================================= */

                const maiorQuantidadeVotos =
                    computed(
                        function () {

                            const valores =
                                campanhasGrafico.map(
                                    function (
                                        campanha
                                    ) {

                                        return Number(
                                            votosAtualizados
                                                .value[
                                                    campanha.id
                                                ] || 0
                                        );

                                    }
                                );


                            return Math.max(
                                ...valores,
                                1
                            );

                        }
                    );


                /* =========================================
                   CAMPANHAS DO GRÁFICO
                   ========================================= */

                const campanhasComVotos =
                    computed(
                        function () {

                            return campanhasGrafico
                                .map(
                                    function (
                                        campanha
                                    ) {

                                        const quantidade =
                                            Number(
                                                votosAtualizados
                                                    .value[
                                                        campanha.id
                                                    ] || 0
                                            );


                                        const percentual =
                                            (
                                                quantidade /
                                                maiorQuantidadeVotos.value
                                            ) *
                                            100;


                                        return {

                                            ...campanha,

                                            votos:
                                                quantidade,

                                            percentual:
                                                percentual

                                        };

                                    }
                                );

                        }
                    );


                /* =========================================
                   BOTÃO
                   ========================================= */

                const textoDetalhes =
                    computed(
                        function () {

                            return (

                                mostrarDetalhes.value

                                    ? "Ocultar detalhes"

                                    : "Mostrar detalhes"

                            );

                        }
                    );


                /* =========================================
                   ATUALIZAR DADOS
                   ========================================= */

                function atualizarDados() {

                    votosAtualizados.value =
                        obterVotos();


                    propostasPendentes.value =
                        contarPropostasPendentes();


                    ultimaProposta.value =
                        obterUltimaProposta();


                    ultimaAtualizacao.value =
                        obterHorarioAtual();

                }


                /* =========================================
                   DETALHES
                   ========================================= */

                function alternarDetalhes() {

                    mostrarDetalhes.value =
                        !mostrarDetalhes.value;

                }


                /* =========================================
                   EVENTOS PERSONALIZADOS
                   ========================================= */

                function receberVoto() {

                    atualizarDados();

                }


                function receberCampanha() {

                    atualizarDados();

                }


                /* =========================================
                   STORAGE ENTRE ABAS
                   ========================================= */

                function receberAlteracaoStorage(
                    evento
                ) {

                    const chavesObservadas = [

                        "pingoEsperancaVotos",

                        "pingoEsperancaVotoUsuario",

                        "pingoEsperancaSolicitacoesCampanha"

                    ];


                    if (
                        !evento.key ||
                        chavesObservadas.includes(
                            evento.key
                        )
                    ) {

                        atualizarDados();

                    }

                }


                /* =========================================
                   LISTENERS
                   ========================================= */

                window.addEventListener(
                    "pingo:voto-atualizado",
                    receberVoto
                );


                window.addEventListener(
                    "pingo:campanha-enviada",
                    receberCampanha
                );


                window.addEventListener(
                    "storage",
                    receberAlteracaoStorage
                );


                /* =========================================
                   CRIAR VUE
                   ========================================= */

                instanciaVue =
                    createApp({

                        setup() {

                            onUnmounted(
                                function () {

                                    window.removeEventListener(
                                        "pingo:voto-atualizado",
                                        receberVoto
                                    );


                                    window.removeEventListener(
                                        "pingo:campanha-enviada",
                                        receberCampanha
                                    );


                                    window.removeEventListener(
                                        "storage",
                                        receberAlteracaoStorage
                                    );

                                }
                            );


                            /*
                             * IMPORTANTE:
                             * formatarDataHora é retornada aqui
                             * porque o template Vue precisa
                             * acessá-la.
                             */

                            return {

                                mostrarDetalhes,

                                votosAtualizados,

                                propostasPendentes,

                                ultimaProposta,

                                ultimaAtualizacao,

                                totalVotos,

                                maiorQuantidadeVotos,

                                campanhasComVotos,

                                textoDetalhes,

                                alternarDetalhes,

                                formatarDataHora

                            };

                        },


                        /* =====================================
                           TEMPLATE
                           ===================================== */

                        template: `

                            <div
                                class="painel-vue-conteudo">


                                <!-- =================================
                                     STATUS
                                     ================================= -->

                                <span
                                    class="status-painel">

                                    <span
                                        class="status-painel-ponto">
                                    </span>

                                    Painel interativo

                                </span>


                                <!-- =================================
                                     TÍTULO
                                     ================================= -->

                                <h3
                                    class="painel-vue-titulo">

                                    Painel de participação

                                </h3>


                                <p
                                    class="painel-vue-descricao">

                                    Acompanhe os principais indicadores
                                    das campanhas e a participação da
                                    comunidade.

                                </p>


                                <!-- =================================
                                     INDICADORES
                                     ================================= -->

                                <div
                                    class="painel-resumo">


                                    <article
                                        class="painel-indicador">


                                        <span
                                            class="painel-indicador-icone"
                                            aria-hidden="true">

                                            ✦

                                        </span>


                                        <span
                                            class="painel-indicador-rotulo">

                                            Campanhas ativas

                                        </span>


                                        <strong
                                            class="painel-indicador-valor">

                                            2

                                        </strong>


                                    </article>


                                    <article
                                        class="painel-indicador">


                                        <span
                                            class="painel-indicador-icone"
                                            aria-hidden="true">

                                            ♥

                                        </span>


                                        <span
                                            class="painel-indicador-rotulo">

                                            Total de votos

                                        </span>


                                        <strong
                                            class="painel-indicador-valor">

                                            {{ totalVotos }}

                                        </strong>


                                    </article>


                                    <article
                                        class="painel-indicador">


                                        <span
                                            class="painel-indicador-icone"
                                            aria-hidden="true">

                                            +

                                        </span>


                                        <span
                                            class="painel-indicador-rotulo">

                                            Propostas pendentes

                                        </span>


                                        <strong
                                            class="painel-indicador-valor">

                                            {{ propostasPendentes }}

                                        </strong>


                                    </article>


                                </div>


                                <!-- =================================
                                     GRÁFICO
                                     ================================= -->

                                <section
                                    class="grafico-votos"
                                    aria-labelledby="titulo-grafico-vue">


                                    <div
                                        class="grafico-cabecalho">


                                        <h4
                                            id="titulo-grafico-vue">

                                            Participação nas campanhas

                                        </h4>


                                        <span>

                                            Comparativo de votos

                                        </span>


                                    </div>


                                    <div>


                                        <div
                                            v-for="campanha in campanhasComVotos"
                                            :key="campanha.id"
                                            class="barra-voto">


                                            <div
                                                class="barra-voto-topo">


                                                <div
                                                    class="barra-voto-nome">


                                                    <span
                                                        class="barra-voto-icone"
                                                        aria-hidden="true">

                                                        {{ campanha.icone }}

                                                    </span>


                                                    <span>

                                                        {{ campanha.titulo }}

                                                    </span>


                                                </div>


                                                <span
                                                    class="barra-voto-total">

                                                    {{ campanha.votos }} votos

                                                </span>


                                            </div>


                                            <div
                                                class="barra-voto-trilho"
                                                role="progressbar"
                                                :aria-valuenow="campanha.votos"
                                                aria-valuemin="0"
                                                :aria-valuemax="maiorQuantidadeVotos"
                                                :aria-label="'Votos para ' + campanha.titulo">


                                                <div
                                                    class="barra-voto-progresso"
                                                    :style="{ width: campanha.percentual + '%' }">
                                                </div>


                                            </div>


                                        </div>


                                    </div>


                                </section>


                                <!-- =================================
                                     NOTIFICAÇÃO DA ÚLTIMA PROPOSTA
                                     ================================= -->

                                <div
                                    v-if="ultimaProposta"
                                    class="notificacao-proposta"
                                    aria-live="polite">


                                    <span
                                        class="notificacao-proposta-icone"
                                        aria-hidden="true">

                                        ✓

                                    </span>


                                    <div
                                        class="notificacao-proposta-conteudo">


                                        <strong>

                                            Proposta enviada para análise

                                        </strong>


                                        <div>

                                            {{ ultimaProposta.nome }}

                                        </div>


                                        <small>

                                            Status: aguardando análise
                                            da equipe responsável.


                                            <span
                                                v-if="ultimaProposta.enviadoEm">

                                                Enviada em
                                                {{ formatarDataHora(ultimaProposta.enviadoEm) }}

                                            </span>

                                        </small>


                                    </div>


                                </div>


                                <!-- =================================
                                     BOTÃO DE DETALHES
                                     ================================= -->

                                <button
                                    type="button"
                                    class="botao-detalhes-vue"
                                    :aria-expanded="mostrarDetalhes"
                                    aria-controls="detalhes-painel-vue"
                                    @click="alternarDetalhes">


                                    <span>

                                        {{ textoDetalhes }}

                                    </span>


                                    <span
                                        class="seta-detalhes-vue"
                                        :class="{ aberta: mostrarDetalhes }"
                                        aria-hidden="true">

                                        ↓

                                    </span>


                                </button>


                                <!-- =================================
                                     DETALHES
                                     ================================= -->

                                <div
                                    v-if="mostrarDetalhes"
                                    id="detalhes-painel-vue"
                                    class="detalhes-vue">


                                    <p>

                                        O gráfico apresenta a
                                        distribuição atual dos votos
                                        registrados nas campanhas
                                        disponíveis para votação.

                                    </p>


                                    <p>

                                        Os números são atualizados
                                        automaticamente quando uma
                                        nova votação é registrada.

                                    </p>


                                    <p>

                                        As propostas enviadas pelos
                                        usuários são armazenadas como
                                        pendentes até a análise da
                                        equipe responsável.

                                    </p>


                                    <p
                                        v-if="ultimaProposta">

                                        Última proposta:

                                        <strong>

                                            {{ ultimaProposta.nome }}

                                        </strong>

                                        — aguardando análise.

                                    </p>


                                    <p
                                        class="atualizacao-painel">

                                        Última atualização:

                                        <strong>

                                            {{ ultimaAtualizacao }}

                                        </strong>

                                    </p>


                                </div>


                            </div>

                        `

                    });


                /* =========================================
                   MONTAR
                   ========================================= */

                instanciaVue.mount(
                    container
                );


                console.log(
                    "Painel Vue montado com sucesso."
                );


            } catch (
                erro
            ) {

                console.error(
                    "Erro ao montar painel Vue:",
                    erro
                );


                container.innerHTML = `

                    <div
                        class="painel-vue-conteudo">


                        <h3
                            class="painel-vue-titulo">

                            Painel de participação

                        </h3>


                        <p
                            class="painel-vue-descricao">

                            Não foi possível inicializar
                            o painel interativo.

                        </p>

                    </div>

                `;

            }

        };

})();