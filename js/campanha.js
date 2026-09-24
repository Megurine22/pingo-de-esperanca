/* =========================================================
   CAMPANHA.JS
   Responsável pelo formulário de criação de campanhas.
   Pingo de Esperança
   ========================================================= */

import {
    salvarSolicitacaoCampanha,
    obterSolicitacoesCampanha
} from "./storage.js";


/* =========================================================
   DADOS
   ========================================================= */

let solicitacoesCampanha =
    obterSolicitacoesCampanha();


/* =========================================================
   INICIALIZAR CAMPANHA
   ========================================================= */

export function inicializarCampanha() {

    const abrir =
        document.getElementById(
            "botao-iniciar-campanha"
        );

    const modal =
        document.getElementById(
            "modal-campanha"
        );

    const cancelar =
        document.getElementById(
            "cancelar-campanha"
        );

    const formulario =
        document.getElementById(
            "form-campanha"
        );


    if (
        !abrir ||
        !modal ||
        !cancelar ||
        !formulario
    ) {

        return;

    }


    /* =====================================================
       ABRIR MODAL
       ===================================================== */

    abrir.addEventListener(
        "click",
        function () {

            formulario.reset();

            limparEstadosCampanha(
                formulario
            );

            modal.showModal();

        }
    );


    /* =====================================================
       CANCELAR
       ===================================================== */

    cancelar.addEventListener(
        "click",
        function () {

            modal.close();

        }
    );


    /* =====================================================
       FECHAR CLICANDO FORA DO MODAL
       ===================================================== */

    modal.addEventListener(
        "click",
        function (
            event
        ) {

            if (
                event.target ===
                modal
            ) {

                modal.close();

            }

        }
    );


    /* =====================================================
       VALIDAÇÃO VISUAL DOS CAMPOS
       ===================================================== */

    const campos =
        formulario.querySelectorAll(
            "input, textarea"
        );


    campos.forEach(
        function (
            campo
        ) {

            campo.addEventListener(
                "input",
                function () {

                    atualizarEstadoCampoCampanha(
                        campo
                    );

                }
            );


            campo.addEventListener(
                "blur",
                function () {

                    atualizarEstadoCampoCampanha(
                        campo
                    );

                }
            );

        }
    );


    /* =====================================================
       ENVIO DO FORMULÁRIO
       ===================================================== */

    formulario.addEventListener(
        "submit",
        function (
            event
        ) {

            event.preventDefault();


            const nomeInput =
                document.getElementById(
                    "nome-campanha"
                );

            const objetivoInput =
                document.getElementById(
                    "objetivo-campanha"
                );

            const metaInput =
                document.getElementById(
                    "meta-campanha"
                );

            const dataInput =
                document.getElementById(
                    "data-campanha"
                );


            const camposFormulario = [

                nomeInput,

                objetivoInput,

                metaInput,

                dataInput

            ];


            camposFormulario.forEach(
                atualizarEstadoCampoCampanha
            );


            const formularioValido =
                Boolean(
                    nomeInput &&
                    nomeInput.value.trim() !== ""
                )
                &&
                Boolean(
                    objetivoInput &&
                    objetivoInput.value.trim() !== ""
                )
                &&
                Boolean(
                    metaInput &&
                    metaInput.value.trim() !== ""
                )
                &&
                Boolean(
                    dataInput &&
                    dataInput.value !== ""
                );


            if (
                !formularioValido
            ) {

                mostrarMensagemCampanha(
                    "Preencha todos os campos antes de enviar a proposta.",
                    true
                );

                return;

            }


            /* =================================================
               NOVA SOLICITAÇÃO
               ================================================= */

            const novaSolicitacao = {

                id:
                    `solicitacao-${Date.now()}`,

                nome:
                    nomeInput.value.trim(),

                objetivo:
                    objetivoInput.value.trim(),

                meta:
                    metaInput.value.trim(),

                data:
                    dataInput.value,

                status:
                    "PENDENTE",

                enviadoEm:
                    new Date().toISOString()

            };


            solicitacoesCampanha.push(
                novaSolicitacao
            );


            /* =================================================
               SALVAR NO WEB STORAGE
               ================================================= */

            const salvou =
                salvarSolicitacaoCampanha(
                    solicitacoesCampanha
                );


            if (
                !salvou
            ) {

                solicitacoesCampanha.pop();

                mostrarMensagemCampanha(
                    "Não foi possível registrar a proposta neste navegador. Verifique o armazenamento local e tente novamente.",
                    true
                );

                return;

            }


            /* =================================================
               LIMPAR FORMULÁRIO
               ================================================= */

            formulario.reset();


            limparEstadosCampanha(
                formulario
            );


            modal.close();


            /* =================================================
               MENSAGEM DE SUCESSO
               ================================================= */

            mostrarMensagemCampanha(
                "Proposta enviada para análise! A equipe da Pingo de Esperança irá avaliar a campanha antes de qualquer publicação.",
                false
            );


            /* =================================================
               EVENTO PERSONALIZADO
               ================================================= */

            window.dispatchEvent(
                new CustomEvent(
                    "pingo:campanha-enviada"
                )
            );

        }
    );

}


/* =========================================================
   MENSAGEM DA CAMPANHA
   ========================================================= */

function mostrarMensagemCampanha(
    mensagem,
    erro = false
) {

    let elemento =
        document.querySelector(
            ".mensagem-campanha"
        );


    if (
        !elemento
    ) {

        const area =
            document.querySelector(
                ".acao-campanha"
            );


        if (
            !area
        ) {

            return;

        }


        elemento =
            document.createElement(
                "p"
            );


        elemento.className =
            "mensagem-campanha";


        elemento.setAttribute(
            "aria-live",
            "polite"
        );


        area.appendChild(
            elemento
        );

    }


    elemento.textContent =
        mensagem;


    elemento.style.color =
        erro
            ? "var(--cor-erro)"
            : "var(--cor-sucesso)";


    elemento.style.fontWeight =
        "700";


    elemento.style.marginTop =
        "12px";


    elemento.style.lineHeight =
        "1.5";

}


/* =========================================================
   ESTADO VISUAL DOS CAMPOS
   ========================================================= */

function atualizarEstadoCampoCampanha(
    campo
) {

    if (
        !campo
    ) {

        return;

    }


    campo.classList.remove(
        "campo-valido",
        "campo-invalido"
    );


    if (
        !campo.value.trim()
    ) {

        if (
            campo.required
        ) {

            campo.classList.add(
                "campo-invalido"
            );

        }

        return;

    }


    if (
        campo.checkValidity()
    ) {

        campo.classList.add(
            "campo-valido"
        );

    } else {

        campo.classList.add(
            "campo-invalido"
        );

    }

}


/* =========================================================
   LIMPAR ESTADOS VISUAIS
   ========================================================= */

function limparEstadosCampanha(
    formulario
) {

    formulario
        .querySelectorAll(
            ".campo-valido, .campo-invalido"
        )
        .forEach(
            function (
                campo
            ) {

                campo.classList.remove(
                    "campo-valido",
                    "campo-invalido"
                );

            }
        );

}