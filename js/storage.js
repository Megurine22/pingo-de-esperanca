/* =========================================================
   STORAGE.JS
   PERSISTÊNCIA LOCAL DA APLICAÇÃO
   PINGO DE ESPERANÇA
   ========================================================= */


/* =========================================================
   CHAVES
   ========================================================= */

const CHAVE_RASCUNHO =
    "pingoEsperancaRascunho";

const CHAVE_VOTOS =
    "pingoEsperancaVotos";

const CHAVE_VOTO_USUARIO =
    "pingoEsperancaVotoUsuario";

const CHAVE_SOLICITACOES_CAMPANHA =
    "pingoEsperancaSolicitacoesCampanha";


/* =========================================================
   VERIFICAR LOCALSTORAGE
   ========================================================= */

function localStorageDisponivel() {

    try {

        const chaveTeste =
            "__pingo_esperanca_teste__";

        localStorage.setItem(
            chaveTeste,
            "ok"
        );

        const resultado =
            localStorage.getItem(
                chaveTeste
            );


        localStorage.removeItem(
            chaveTeste
        );


        return resultado === "ok";

    } catch (erro) {

        console.error(
            "localStorage indisponível:",
            erro
        );


        return false;

    }

}


/* =========================================================
   LEITURA GENÉRICA
   ========================================================= */

function lerStorage(
    chave,
    valorPadrao
) {

    if (
        !localStorageDisponivel()
    ) {

        return valorPadrao;

    }


    try {

        const valor =
            localStorage.getItem(
                chave
            );


        if (
            valor === null ||
            valor === ""
        ) {

            return valorPadrao;

        }


        return JSON.parse(
            valor
        );

    } catch (erro) {

        console.error(
            `Erro ao ler a chave ${chave}:`,
            erro
        );


        return valorPadrao;

    }

}


/* =========================================================
   GRAVAÇÃO GENÉRICA
   ========================================================= */

function gravarStorage(
    chave,
    valor
) {

    if (
        !localStorageDisponivel()
    ) {

        return false;

    }


    try {

        const dados =
            JSON.stringify(
                valor
            );


        localStorage.setItem(
            chave,
            dados
        );


        /*
         * Confirma se o navegador realmente gravou
         * o conteúdo.
         */

        const confirmacao =
            localStorage.getItem(
                chave
            );


        if (
            confirmacao !== dados
        ) {

            console.error(
                `A gravação da chave ${chave} não pôde ser confirmada.`
            );


            return false;

        }


        return true;

    } catch (erro) {

        console.error(
            `Erro ao salvar a chave ${chave}:`,
            erro
        );


        return false;

    }

}


/* =========================================================
   RASCUNHO DO FORMULÁRIO
   ========================================================= */

export function salvarRascunhoFormulario(
    formulario
) {

    if (!formulario) {

        return false;

    }


    const dados = {};


    const elementos =
        Array.from(
            formulario.elements
        );


    elementos.forEach(
        function (
            elemento
        ) {

            if (
                !elemento.name
            ) {

                return;

            }


            if (
                elemento.type ===
                "checkbox"
            ) {

                dados[
                    elemento.name
                ] =
                    elemento.checked;


                return;

            }


            dados[
                elemento.name
            ] =
                elemento.value;

        }
    );


    return gravarStorage(
        CHAVE_RASCUNHO,
        dados
    );

}


/* =========================================================
   RECUPERAR RASCUNHO
   ========================================================= */

export function obterRascunhoFormulario() {

    return lerStorage(
        CHAVE_RASCUNHO,
        {}
    );

}


/* =========================================================
   APAGAR RASCUNHO
   ========================================================= */

export function limparRascunhoFormulario() {

    if (
        !localStorageDisponivel()
    ) {

        return;

    }


    try {

        localStorage.removeItem(
            CHAVE_RASCUNHO
        );

    } catch (erro) {

        console.error(
            "Erro ao limpar rascunho:",
            erro
        );

    }

}


/* =========================================================
   VOTOS
   ========================================================= */

export function salvarVotos(
    votos
) {

    return gravarStorage(
        CHAVE_VOTOS,
        votos
    );

}


export function obterVotos(
    votosIniciais
) {

    const votosSalvos =
        lerStorage(
            CHAVE_VOTOS,
            {}
        );


    const resultado = {
        ...votosIniciais
    };


    if (
        !votosSalvos ||
        typeof votosSalvos !==
        "object"
    ) {

        return resultado;

    }


    Object.keys(
        votosIniciais
    ).forEach(
        function (
            campanha
        ) {

            const valorSalvo =
                Number(
                    votosSalvos[
                        campanha
                    ]
                );


            if (
                Number.isFinite(
                    valorSalvo
                ) &&
                valorSalvo >= 0
            ) {

                resultado[
                    campanha
                ] =
                    valorSalvo;

            }

        }
    );


    return resultado;

}


/* =========================================================
   VOTO DO USUÁRIO
   ========================================================= */

export function salvarVotoUsuario(
    campanha
) {

    return gravarStorage(
        CHAVE_VOTO_USUARIO,
        campanha
    );

}


export function obterVotoUsuario() {

    return lerStorage(
        CHAVE_VOTO_USUARIO,
        null
    );

}


export function limparVotoUsuario() {

    if (
        !localStorageDisponivel()
    ) {

        return;

    }


    try {

        localStorage.removeItem(
            CHAVE_VOTO_USUARIO
        );

    } catch (erro) {

        console.error(
            "Erro ao limpar voto:",
            erro
        );

    }

}


/* =========================================================
   SOLICITAÇÕES DE CAMPANHA
   ========================================================= */

export function salvarSolicitacaoCampanha(
    solicitacoes
) {

    /*
     * Garante que sempre seja armazenado
     * um array válido.
     */

    if (
        !Array.isArray(
            solicitacoes
        )
    ) {

        return false;

    }


    return gravarStorage(
        CHAVE_SOLICITACOES_CAMPANHA,
        solicitacoes
    );

}


export function obterSolicitacoesCampanha() {

    const solicitacoes =
        lerStorage(
            CHAVE_SOLICITACOES_CAMPANHA,
            []
        );


    if (
        !Array.isArray(
            solicitacoes
        )
    ) {

        return [];

    }


    return solicitacoes;

}


export function limparSolicitacoesCampanha() {

    if (
        !localStorageDisponivel()
    ) {

        return;

    }


    try {

        localStorage.removeItem(
            CHAVE_SOLICITACOES_CAMPANHA
        );

    } catch (erro) {

        console.error(
            "Erro ao limpar solicitações:",
            erro
        );

    }

}