/* =========================================================
   FORMULARIO.JS
   Lógica do formulário de cadastro e validações.
   Pingo de Esperança
   ========================================================= */

import {
    consultarCEP,
    obterCidadesPorEstado
} from "./api.js";

import {
    salvarRascunhoFormulario,
    obterRascunhoFormulario,
    limparRascunhoFormulario
} from "./storage.js";


/* =========================================================
   ESTADOS DO BRASIL
   ========================================================= */

const estadosBrasil = [

    {
        id: 12,
        sigla: "AC",
        nome: "Acre"
    },

    {
        id: 27,
        sigla: "AL",
        nome: "Alagoas"
    },

    {
        id: 13,
        sigla: "AM",
        nome: "Amazonas"
    },

    {
        id: 16,
        sigla: "AP",
        nome: "Amapá"
    },

    {
        id: 29,
        sigla: "BA",
        nome: "Bahia"
    },

    {
        id: 6,
        sigla: "CE",
        nome: "Ceará"
    },

    {
        id: 53,
        sigla: "DF",
        nome: "Distrito Federal"
    },

    {
        id: 32,
        sigla: "ES",
        nome: "Espírito Santo"
    },

    {
        id: 52,
        sigla: "GO",
        nome: "Goiás"
    },

    {
        id: 21,
        sigla: "MA",
        nome: "Maranhão"
    },

    {
        id: 51,
        sigla: "MT",
        nome: "Mato Grosso"
    },

    {
        id: 50,
        sigla: "MS",
        nome: "Mato Grosso do Sul"
    },

    {
        id: 31,
        sigla: "MG",
        nome: "Minas Gerais"
    },

    {
        id: 15,
        sigla: "PA",
        nome: "Pará"
    },

    {
        id: 25,
        sigla: "PB",
        nome: "Paraíba"
    },

    {
        id: 26,
        sigla: "PE",
        nome: "Pernambuco"
    },

    {
        id: 22,
        sigla: "PI",
        nome: "Piauí"
    },

    {
        id: 41,
        sigla: "PR",
        nome: "Paraná"
    },

    {
        id: 33,
        sigla: "RJ",
        nome: "Rio de Janeiro"
    },

    {
        id: 24,
        sigla: "RN",
        nome: "Rio Grande do Norte"
    },

    {
        id: 43,
        sigla: "RS",
        nome: "Rio Grande do Sul"
    },

    {
        id: 11,
        sigla: "RO",
        nome: "Rondônia"
    },

    {
        id: 14,
        sigla: "RR",
        nome: "Roraima"
    },

    {
        id: 42,
        sigla: "SC",
        nome: "Santa Catarina"
    },

    {
        id: 28,
        sigla: "SE",
        nome: "Sergipe"
    },

    {
        id: 35,
        sigla: "SP",
        nome: "São Paulo"
    },

    {
        id: 17,
        sigla: "TO",
        nome: "Tocantins"
    }

].sort(
    function (
        a,
        b
    ) {

        return a.nome.localeCompare(
            b.nome,
            "pt-BR"
        );

    }
);


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

export function inicializarFormulario() {

    const formulario =
        document.getElementById(
            "formulario-cadastro"
        );


    if (
        !formulario
    ) {

        return;

    }


    const nome =
        document.getElementById(
            "nome"
        );


    const nomeSocial =
        document.getElementById(
            "nome-social"
        );


    const email =
        document.getElementById(
            "email"
        );


    const nascimento =
        document.getElementById(
            "nascimento"
        );


    const cpf =
        document.getElementById(
            "cpf"
        );


    const telefone =
        document.getElementById(
            "telefone"
        );


    const cep =
        document.getElementById(
            "cep"
        );


    const endereco =
        document.getElementById(
            "endereco"
        );


    const numero =
        document.getElementById(
            "numero"
        );


    const semNumero =
        document.getElementById(
            "sem-numero"
        );


    const estado =
        document.getElementById(
            "estado"
        );


    const cidade =
        document.getElementById(
            "cidade"
        );


    const listaEstados =
        document.getElementById(
            "lista-estados"
        );


    const listaCidades =
        document.getElementById(
            "lista-cidades"
        );


    const checkboxVoluntariado =
        document.querySelector(
            'input[name="voluntariado"]'
        );


    const checkboxDoacao =
        document.querySelector(
            'input[name="doacao"]'
        );


    const opcoes =
        document.querySelectorAll(
            ".opcao-contribuicao"
        );


    if (
        !nome ||
        !nomeSocial ||
        !email ||
        !nascimento ||
        !cpf ||
        !telefone ||
        !cep ||
        !endereco ||
        !numero ||
        !estado ||
        !cidade ||
        !listaEstados ||
        !listaCidades
    ) {

        console.warn(
            "Algum campo esperado do formulário não foi encontrado."
        );


        return;

    }


    let estadoCarregado =
        "";


    let ultimoCEPConsultado =
        "";


    definirDataMaxima(
        nascimento
    );


    preencherListaEstados(
        listaEstados
    );


    configurarCampos();


    configurarContribuicao();


    configurarSubmit();


    inicializarModalContribuicao();


    restaurarRascunho();


    /* =====================================================
       CONFIGURAÇÃO DOS CAMPOS
       ===================================================== */

    function configurarCampos() {

        /* ================================================
           NOME
           ================================================ */

        nome.addEventListener(
            "input",
            function () {

                nome.value =
                    nome.value.replace(
                        /[^A-Za-zÀ-ÖØ-öø-ÿ '-]/g,
                        ""
                    );


                validarNome();


                salvarRascunho();

            }
        );


        /* ================================================
           NOME SOCIAL
           ================================================ */

        nomeSocial.addEventListener(
            "input",
            function () {

                atualizarEstadoCampo(
                    nomeSocial
                );


                salvarRascunho();

            }
        );


        /* ================================================
           EMAIL
           ================================================ */

        email.addEventListener(
            "input",
            function () {

                atualizarEstadoCampo(
                    email
                );


                salvarRascunho();

            }
        );


        email.addEventListener(
            "blur",
            function () {

                atualizarEstadoCampo(
                    email,
                    true
                );

            }
        );


        /* ================================================
           DATA DE NASCIMENTO
           ================================================ */

        nascimento.addEventListener(
            "input",
            function () {

                validarNascimento();


                salvarRascunho();

            }
        );


        /* ================================================
           CPF
           ================================================ */

        cpf.addEventListener(
            "input",
            function () {

                cpf.value =
                    aplicarMascaraCPF(
                        cpf.value
                    );


                validarCPF();


                salvarRascunho();

            }
        );


        /* ================================================
           TELEFONE
           ================================================ */

        telefone.addEventListener(
            "input",
            function () {

                telefone.value =
                    aplicarMascaraTelefone(
                        telefone.value
                    );


                validarTelefone();


                salvarRascunho();

            }
        );


        telefone.addEventListener(
            "blur",
            function () {

                validarTelefone();

            }
        );


        /* ================================================
           CEP
           ================================================ */

        cep.addEventListener(
            "input",
            function () {

                const numeros =
                    cep.value
                        .replace(
                            /\D/g,
                            ""
                        )
                        .substring(
                            0,
                            8
                        );


                cep.value =
                    numeros.replace(
                        /(\d{5})(\d)/,
                        "$1-$2"
                    );


                atualizarEstadoCampo(
                    cep
                );


                if (
                    numeros.length <
                    8
                ) {

                    ultimoCEPConsultado =
                        "";

                }


                if (
                    numeros.length ===
                    8
                ) {

                    buscarEnderecoPorCEP(
                        numeros
                    );

                }


                salvarRascunho();

            }
        );


        cep.addEventListener(
            "blur",
            function () {

                const numeros =
                    cep.value.replace(
                        /\D/g,
                        ""
                    );


                if (
                    numeros.length ===
                    8
                ) {

                    buscarEnderecoPorCEP(
                        numeros
                    );

                }

            }
        );


        /* ================================================
           ENDEREÇO
           ================================================ */

        endereco.addEventListener(
            "input",
            function () {

                endereco.value =
                    endereco.value.replace(
                        /[^A-Za-zÀ-ÖØ-öø-ÿ .'-]/g,
                        ""
                    );


                validarEndereco();


                salvarRascunho();

            }
        );


        /* ================================================
           NÚMERO
           ================================================ */

        numero.addEventListener(
            "input",
            function () {

                numero.value =
                    numero.value.replace(
                        /\D/g,
                        ""
                    );


                validarNumero();


                salvarRascunho();

            }
        );


        /* ================================================
           SEM NÚMERO
           ================================================ */

        if (
            semNumero
        ) {

            semNumero.addEventListener(
                "change",
                function () {

                    atualizarEstadoSemNumero();

                }
            );

        }


        /* ================================================
           ESTADO
           ================================================ */

        estado.addEventListener(
            "input",
            function () {

                const estadoEncontrado =
                    encontrarEstado(
                        estado.value
                    );


                if (
                    estadoEncontrado &&
                    estadoCarregado !==
                    estadoEncontrado.sigla
                ) {

                    estadoCarregado =
                        estadoEncontrado.sigla;


                    estado.value =
                        estadoEncontrado.nome;


                    estado.setCustomValidity(
                        ""
                    );


                    atualizarEstadoCampo(
                        estado
                    );


                    carregarCidades(
                        estadoEncontrado,
                        cidade,
                        listaCidades
                    );

                } else if (
                    !estadoEncontrado
                ) {

                    estadoCarregado =
                        "";


                    estado.setCustomValidity(
                        "Digite ou selecione um estado válido."
                    );


                    cidade.value =
                        "";


                    cidade.disabled =
                        true;


                    cidade.placeholder =
                        "Selecione primeiro o estado";


                    listaCidades.innerHTML =
                        "";

                }


                atualizarEstadoCampo(
                    estado
                );


                salvarRascunho();

            }
        );


        estado.addEventListener(
            "change",
            validarEstadoSelecionado
        );


        estado.addEventListener(
            "blur",
            validarEstadoSelecionado
        );


        /* ================================================
           CIDADE
           ================================================ */

        cidade.addEventListener(
            "input",
            function () {

                validarCidade(
                    cidade,
                    listaCidades
                );


                salvarRascunho();

            }
        );


        cidade.addEventListener(
            "change",
            function () {

                validarCidade(
                    cidade,
                    listaCidades
                );


                salvarRascunho();

            }
        );


        cidade.addEventListener(
            "blur",
            function () {

                validarCidade(
                    cidade,
                    listaCidades
                );

            }
        );

    }


    /* =====================================================
       RASCUNHO
       ===================================================== */

    async function restaurarRascunho() {

        const dados =
            obterRascunhoFormulario();


        if (
            !dados ||
            Object.keys(
                dados
            ).length ===
            0
        ) {

            return;

        }


        formulario
            .querySelectorAll(
                "input"
            )
            .forEach(
                function (
                    campo
                ) {

                    if (
                        campo.type ===
                        "checkbox"
                    ) {

                        campo.checked =
                            Boolean(
                                dados[
                                    campo.name
                                ]
                            );


                        const opcao =
                            campo.closest(
                                ".opcao-contribuicao"
                            );


                        if (
                            opcao
                        ) {

                            opcao.classList.toggle(
                                "selecionada",
                                campo.checked
                            );

                        }


                        return;

                    }


                    if (
                        dados[
                            campo.name
                        ] !==
                        undefined
                    ) {

                        campo.value =
                            dados[
                                campo.name
                            ];

                    }

                }
            );


        atualizarEstadoSemNumero(
            false
        );


        if (
            dados.estado
        ) {

            const estadoEncontrado =
                encontrarEstado(
                    dados.estado
                );


            if (
                estadoEncontrado
            ) {

                estado.value =
                    estadoEncontrado.nome;


                estadoCarregado =
                    estadoEncontrado.sigla;


                estado.setCustomValidity(
                    ""
                );


                atualizarEstadoCampo(
                    estado
                );


                await carregarCidades(
                    estadoEncontrado,
                    cidade,
                    listaCidades
                );


                if (
                    dados.cidade
                ) {

                    cidade.value =
                        dados.cidade;


                    validarCidade(
                        cidade,
                        listaCidades
                    );

                }

            }

        }


        validarNome();


        validarCPF();


        validarTelefone();


        validarNascimento();


        validarEndereco();


        validarNumero();

    }


    function salvarRascunho() {

        salvarRascunhoFormulario(
            formulario
        );

    }


    /* =====================================================
       MÁSCARAS
       ===================================================== */

    function aplicarMascaraCPF(
        valor
    ) {

        let numeros =
            valor
                .replace(
                    /\D/g,
                    ""
                )
                .substring(
                    0,
                    11
                );


        numeros =
            numeros.replace(
                /(\d{3})(\d)/,
                "$1.$2"
            );


        numeros =
            numeros.replace(
                /(\d{3})(\d)/,
                "$1.$2"
            );


        numeros =
            numeros.replace(
                /(\d{3})(\d{1,2})$/,
                "$1-$2"
            );


        return numeros;

    }


    function aplicarMascaraTelefone(
        valor
    ) {

        let numeros =
            valor
                .replace(
                    /\D/g,
                    ""
                )
                .substring(
                    0,
                    11
                );


        if (
            numeros.length <=
            10
        ) {

            numeros =
                numeros.replace(
                    /(\d{2})(\d)/,
                    "($1) $2"
                );


            numeros =
                numeros.replace(
                    /(\d{4})(\d)/,
                    "$1-$2"
                );

        } else {

            numeros =
                numeros.replace(
                    /(\d{2})(\d)/,
                    "($1) $2"
                );


            numeros =
                numeros.replace(
                    /(\d{5})(\d)/,
                    "$1-$2"
                );

        }


        return numeros;

    }


    /* =====================================================
       VALIDAÇÕES
       ===================================================== */

    function validarNome() {

        const palavras =
            nome.value
                .trim()
                .split(
                    /\s+/
                )
                .filter(
                    Boolean
                );


        const valido =
            palavras.length >=
            2;


        nome.setCustomValidity(
            valido
                ? ""
                : "Digite seu nome completo, incluindo nome e sobrenome."
        );


        atualizarEstadoCampo(
            nome
        );


        return valido;

    }


    function validarCPF() {

        const valor =
            cpf.value.trim();


        const numeros =
            valor.replace(
                /\D/g,
                ""
            );


        const formato =
            /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;


        const valido =
            numeros.length ===
            11
            &&
            formato.test(
                valor
            )
            &&
            !/^(\d)\1+$/.test(
                numeros
            );


        cpf.setCustomValidity(
            valido
                ? ""
                : "Digite um CPF completo e válido no formato 000.000.000-00."
        );


        atualizarEstadoCampo(
            cpf
        );


        return valido;

    }


    function validarTelefone() {

        const valor =
            telefone.value.trim();


        const numeros =
            valor.replace(
                /\D/g,
                ""
            );


        const formato =
            /^\(\d{2}\) \d{4,5}-\d{4}$/;


        const valido =
            (
                numeros.length ===
                10
                ||
                numeros.length ===
                11
            )
            &&
            formato.test(
                valor
            );


        if (
            !valor
        ) {

            telefone.setCustomValidity(
                "Informe seu telefone."
            );

        } else if (
            !valido
        ) {

            telefone.setCustomValidity(
                "Digite o telefone completo no formato (11) 99999-9999."
            );

        } else {

            telefone.setCustomValidity(
                ""
            );

        }


        atualizarEstadoCampo(
            telefone,
            true
        );


        return valido;

    }


    function validarNascimento() {

        let valido =
            nascimento.checkValidity();


        if (
            nascimento.value &&
            nascimento.max &&
            nascimento.value >
            nascimento.max
        ) {

            nascimento.setCustomValidity(
                "A data de nascimento não pode ser futura."
            );


            valido =
                false;

        } else {

            nascimento.setCustomValidity(
                ""
            );

        }


        atualizarEstadoCampo(
            nascimento
        );


        return valido;

    }


    function validarEndereco() {

        const valor =
            endereco.value.trim();


        const palavras =
            valor
                .split(
                    /\s+/
                )
                .filter(
                    Boolean
                );


        const primeiro =
            (
                palavras[0] ||
                ""
            )
            .toLowerCase()
            .replace(
                /\./g,
                ""
            );


        const tipos = [

            "rua",
            "r",
            "avenida",
            "av",
            "travessa",
            "tv",
            "alameda",
            "al",
            "praca",
            "praça",
            "rodovia",
            "rod",
            "estrada"

        ];


        let valido =
            true;


        if (
            !valor
        ) {

            endereco.setCustomValidity(
                "Informe o logradouro."
            );


            valido =
                false;

        } else if (
            /\d/.test(
                valor
            )
        ) {

            endereco.setCustomValidity(
                "Não informe o número neste campo. Utilize o campo Número."
            );


            valido =
                false;

        } else if (
            palavras.length <
            2
        ) {

            endereco.setCustomValidity(
                "Digite o tipo de logradouro e seu nome, como Rua das Flores."
            );


            valido =
                false;

        } else if (
            !tipos.includes(
                primeiro
            )
        ) {

            endereco.setCustomValidity(
                "Informe o tipo do logradouro, como Rua, Avenida ou Alameda."
            );


            valido =
                false;

        } else {

            endereco.setCustomValidity(
                ""
            );

        }


        atualizarEstadoCampo(
            endereco
        );


        return valido;

    }


    function validarNumero() {

        if (
            semNumero &&
            semNumero.checked
        ) {

            numero.setCustomValidity(
                ""
            );


            numero.setAttribute(
                "aria-invalid",
                "false"
            );


            numero.classList.remove(
                "campo-valido",
                "campo-invalido"
            );


            return true;

        }


        const valor =
            numero.value.trim();


        const valido =
            /^\d+$/.test(
                valor
            );


        numero.setCustomValidity(
            valido
                ? ""
                : "Informe o número do endereço ou marque a opção caso não tenha número."
        );


        atualizarEstadoCampo(
            numero,
            true
        );


        return valido;

    }


    function atualizarEstadoSemNumero(
        salvar = true
    ) {

        if (
            !semNumero
        ) {

            return;

        }


        if (
            semNumero.checked
        ) {

            numero.value =
                "";


            numero.disabled =
                true;


            numero.required =
                false;


            numero.setCustomValidity(
                ""
            );


            numero.classList.remove(
                "campo-valido",
                "campo-invalido"
            );


            numero.setAttribute(
                "aria-invalid",
                "false"
            );

        } else {

            numero.disabled =
                false;


            numero.required =
                true;


            validarNumero();

        }


        if (
            salvar
        ) {

            salvarRascunho();

        }

    }


    /* =====================================================
       ESTADO / CIDADE
       ===================================================== */

    function validarEstadoSelecionado() {

        const estadoEncontrado =
            encontrarEstado(
                estado.value
            );


        if (
            !estadoEncontrado
        ) {

            estado.setCustomValidity(
                "Digite ou selecione um estado válido."
            );


            cidade.value =
                "";


            cidade.disabled =
                true;


            cidade.placeholder =
                "Selecione primeiro o estado";


            listaCidades.innerHTML =
                "";


            atualizarEstadoCampo(
                estado
            );


            return false;

        }


        estado.value =
            estadoEncontrado.nome;


        estadoCarregado =
            estadoEncontrado.sigla;


        estado.setCustomValidity(
            ""
        );


        atualizarEstadoCampo(
            estado
        );


        carregarCidades(
            estadoEncontrado,
            cidade,
            listaCidades
        );


        salvarRascunho();


        return true;

    }


    function encontrarEstado(
        valor
    ) {

        const texto =
            String(
                valor ||
                ""
            )
                .trim()
                .toLowerCase();


        if (
            !texto
        ) {

            return null;

        }


        return estadosBrasil.find(
            function (
                item
            ) {

                return (
                    item.nome.toLowerCase() ===
                    texto
                )
                ||
                (
                    item.sigla.toLowerCase() ===
                    texto
                );

            }
        )
        ||
        null;

    }


    async function carregarCidades(
        estadoSelecionado,
        campoCidade,
        lista
    ) {

        campoCidade.disabled =
            true;


        campoCidade.value =
            "";


        campoCidade.placeholder =
            "Carregando cidades...";


        campoCidade.setCustomValidity(
            ""
        );


        lista.innerHTML =
            "";


        try {

            const cidades =
                await obterCidadesPorEstado(
                    estadoSelecionado.id
                );


            cidades.forEach(
                function (
                    nomeCidade
                ) {

                    const opcao =
                        document.createElement(
                            "option"
                        );


                    opcao.value =
                        nomeCidade;


                    lista.appendChild(
                        opcao
                    );

                }
            );


            campoCidade.disabled =
                false;


            campoCidade.placeholder =
                "Digite ou selecione a cidade";


            validarCidade(
                campoCidade,
                lista
            );

        } catch (
            erro
        ) {

            console.error(
                "Erro ao carregar cidades:",
                erro
            );


            campoCidade.disabled =
                true;


            campoCidade.placeholder =
                "Não foi possível carregar as cidades";


            campoCidade.setCustomValidity(
                "Não foi possível carregar as cidades."
            );

        }

    }


    function validarCidade(
        campoCidade,
        lista
    ) {

        if (
            campoCidade.disabled
        ) {

            return false;

        }


        const valor =
            campoCidade.value
                .trim()
                .toLowerCase();


        if (
            !valor
        ) {

            campoCidade.setCustomValidity(
                "Selecione uma cidade."
            );


            atualizarEstadoCampo(
                campoCidade
            );


            return false;

        }


        const encontrada =
            Array
                .from(
                    lista.options
                )
                .find(
                    function (
                        opcao
                    ) {

                        return (
                            opcao.value
                                .trim()
                                .toLowerCase()
                            ===
                            valor
                        );

                    }
                );


        if (
            !encontrada &&
            lista.options.length >
            0
        ) {

            campoCidade.setCustomValidity(
                "Digite ou selecione uma cidade válida."
            );


            atualizarEstadoCampo(
                campoCidade
            );


            return false;

        }


        if (
            encontrada
        ) {

            campoCidade.value =
                encontrada.value;

        }


        campoCidade.setCustomValidity(
            ""
        );


        atualizarEstadoCampo(
            campoCidade
        );


        return true;

    }


    /* =====================================================
       CEP
       ===================================================== */

    async function buscarEnderecoPorCEP(
        numerosCEP
    ) {

        if (
            numerosCEP.length !==
            8
        ) {

            return;

        }


        if (
            ultimoCEPConsultado ===
            numerosCEP
        ) {

            return;

        }


        ultimoCEPConsultado =
            numerosCEP;


        try {

            const dados =
                await consultarCEP(
                    numerosCEP
                );


            const cepAtual =
                cep.value.replace(
                    /\D/g,
                    ""
                );


            if (
                cepAtual !==
                numerosCEP
            ) {

                return;

            }


            if (
                !dados ||
                dados.erro
            ) {

                cep.setCustomValidity(
                    "CEP não encontrado."
                );


                atualizarEstadoCampo(
                    cep
                );


                return;

            }


            cep.setCustomValidity(
                ""
            );


            if (
                dados.logradouro
            ) {

                endereco.value =
                    dados.logradouro;


                validarEndereco();

            }


            const estadoEncontrado =
                encontrarEstado(
                    dados.uf ||
                    dados.estado ||
                    ""
                );


            if (
                estadoEncontrado
            ) {

                estado.value =
                    estadoEncontrado.nome;


                estadoCarregado =
                    estadoEncontrado.sigla;


                estado.setCustomValidity(
                    ""
                );


                atualizarEstadoCampo(
                    estado
                );


                await carregarCidades(
                    estadoEncontrado,
                    cidade,
                    listaCidades
                );


                if (
                    dados.localidade
                ) {

                    cidade.value =
                        dados.localidade;


                    validarCidade(
                        cidade,
                        listaCidades
                    );

                }

            }


            atualizarEstadoCampo(
                cep
            );


            salvarRascunho();

        } catch (
            erro
        ) {

            console.error(
                "Erro ao consultar CEP:",
                erro
            );


            if (
                cep.value.replace(/\D/g, "") ===
                numerosCEP
            ) {

                cep.setCustomValidity(
                    erro.message ||
                    "Não foi possível consultar o CEP."
                );


                atualizarEstadoCampo(
                    cep
                );

            }

        }

    }


    /* =====================================================
       CAMPOS VISUAIS
       ===================================================== */

    function atualizarEstadoCampo(
        campo,
        marcarVazio = false
    ) {

        if (
            !campo ||
            campo.disabled
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

            campo.setAttribute(
                "aria-invalid",
                "false"
            );


            if (
                marcarVazio &&
                campo.required
            ) {

                campo.classList.add(
                    "campo-invalido"
                );


                campo.setAttribute(
                    "aria-invalid",
                    "true"
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


            campo.setAttribute(
                "aria-invalid",
                "false"
            );

        } else {

            campo.classList.add(
                "campo-invalido"
            );


            campo.setAttribute(
                "aria-invalid",
                "true"
            );

        }

    }


    function validarTodosOsCampos() {

        validarNome();


        validarCPF();


        validarTelefone();


        validarNascimento();


        validarEndereco();


        validarNumero();


        formulario
            .querySelectorAll(
                "input"
            )
            .forEach(
                function (
                    campo
                ) {

                    if (
                        campo.type ===
                        "checkbox"
                        ||
                        campo.disabled
                    ) {

                        return;

                    }


                    atualizarEstadoCampo(
                        campo,
                        true
                    );

                }
            );

    }


    /* =====================================================
       CONTRIBUIÇÃO
       ===================================================== */

    function configurarContribuicao() {

        opcoes.forEach(
            function (
                opcao
            ) {

                const checkbox =
                    opcao.querySelector(
                        'input[type="checkbox"]'
                    );


                if (
                    !checkbox
                ) {

                    return;

                }


                checkbox.addEventListener(
                    "change",
                    function () {

                        opcao.classList.toggle(
                            "selecionada",
                            checkbox.checked
                        );


                        if (
                            checkboxVoluntariado &&
                            checkboxDoacao &&
                            checkboxVoluntariado.checked &&
                            checkboxDoacao.checked
                        ) {

                            abrirModalContribuicao();

                        }


                        salvarRascunho();

                    }
                );

            }
        );

    }


    /* =====================================================
       ENVIO
       ===================================================== */

    function configurarSubmit() {

        formulario.addEventListener(
            "submit",
            function (
                event
            ) {

                event.preventDefault();


                /*
                 * A contribuição é verificada primeiro.
                 * Assim preservamos a mensagem específica
                 * quando nenhuma opção foi escolhida.
                 */

                const contribuicaoSelecionada =
                    Boolean(
                        checkboxVoluntariado?.checked
                    )
                    ||
                    Boolean(
                        checkboxDoacao?.checked
                    );


                if (
                    !contribuicaoSelecionada
                ) {

                    const primeiraOpcao =
                        checkboxVoluntariado ||
                        checkboxDoacao;


                    abrirFeedback(
                        "feedback-alerta",
                        "Escolha uma forma de contribuição",
                        "Selecione pelo menos uma opção: Trabalho voluntário ou Contribuição financeira.",
                        "Escolher opção",
                        function () {

                            if (
                                !primeiraOpcao
                            ) {

                                return;

                            }


                            const opcao =
                                primeiraOpcao.closest(
                                    ".opcao-contribuicao"
                                );


                            if (
                                opcao
                            ) {

                                opcao.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth",

                                        block:
                                            "center"
                                    }
                                );

                            }


                            primeiraOpcao.focus();

                        }
                    );


                    return;

                }


                validarTodosOsCampos();


                if (
                    !formulario.checkValidity()
                ) {

                    const primeiroInvalido =
                        formulario.querySelector(
                            ":invalid"
                        );


                    abrirFeedback(
                        "feedback-alerta",
                        "Verifique o formulário",
                        "Existem campos obrigatórios vazios ou preenchidos incorretamente.",
                        "Ir para o campo",
                        function () {

                            if (
                                primeiroInvalido
                            ) {

                                primeiroInvalido.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth",

                                        block:
                                            "center"
                                    }
                                );


                                primeiroInvalido.focus();

                            }

                        }
                    );


                    return;

                }


                abrirFeedback(
                    "feedback-sucesso",
                    "Cadastro realizado com sucesso!",
                    "Obrigado por querer fazer parte da Pingo de Esperança.",
                    "Fechar",
                    function () {

                        formulario.reset();


                        atualizarEstadoSemNumero(
                            false
                        );


                        cidade.value =
                            "";


                        cidade.disabled =
                            true;


                        cidade.placeholder =
                            "Selecione primeiro o estado";


                        listaCidades.innerHTML =
                            "";


                        estadoCarregado =
                            "";


                        ultimoCEPConsultado =
                            "";


                        opcoes.forEach(
                            function (
                                opcao
                            ) {

                                opcao.classList.remove(
                                    "selecionada"
                                );

                            }
                        );


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


                        limparRascunhoFormulario();

                    }
                );

            }
        );

    }


    /* =====================================================
       MODAL DE CONTRIBUIÇÃO
       ===================================================== */

    function abrirModalContribuicao() {

        const modal =
            document.getElementById(
                "modal-contribuicao"
            );


        if (
            modal &&
            typeof modal.showModal ===
            "function"
        ) {

            modal.showModal();

        }

    }


    function inicializarModalContribuicao() {

        const modal =
            document.getElementById(
                "modal-contribuicao"
            );


        const cancelar =
            document.getElementById(
                "cancelar-contribuicao"
            );


        const confirmar =
            document.getElementById(
                "confirmar-contribuicao"
            );


        const voluntariado =
            document.querySelector(
                'input[name="voluntariado"]'
            );


        const doacao =
            document.querySelector(
                'input[name="doacao"]'
            );


        if (
            !modal ||
            !cancelar ||
            !confirmar
        ) {

            return;

        }


        cancelar.addEventListener(
            "click",
            function () {

                if (
                    doacao &&
                    voluntariado &&
                    doacao.checked &&
                    voluntariado.checked
                ) {

                    doacao.checked =
                        false;


                    const opcao =
                        doacao.closest(
                            ".opcao-contribuicao"
                        );


                    if (
                        opcao
                    ) {

                        opcao.classList.remove(
                            "selecionada"
                        );

                    }

                }


                modal.close();


                salvarRascunho();

            }
        );


        confirmar.addEventListener(
            "click",
            function () {

                modal.close();


                salvarRascunho();

            }
        );


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

    }


    /* =====================================================
       MODAL DE FEEDBACK
       ===================================================== */

    function abrirFeedback(
        tipo,
        titulo,
        mensagem,
        textoBotao,
        acao
    ) {

        const modal =
            document.getElementById(
                "modal-feedback"
            );


        const tituloElemento =
            document.getElementById(
                "titulo-modal-feedback"
            );


        const mensagemElemento =
            document.getElementById(
                "mensagem-modal-feedback"
            );


        const botao =
            document.getElementById(
                "acao-modal-feedback"
            );


        const icone =
            document.getElementById(
                "icone-modal-feedback"
            );


        if (
            !modal ||
            !tituloElemento ||
            !mensagemElemento ||
            !botao ||
            !icone
        ) {

            return;

        }


        modal.classList.remove(
            "feedback-alerta",
            "feedback-sucesso"
        );


        modal.classList.add(
            tipo
        );


        tituloElemento.textContent =
            titulo;


        mensagemElemento.textContent =
            mensagem;


        botao.textContent =
            textoBotao;


        icone.textContent =
            tipo ===
            "feedback-sucesso"

                ? "✓"

                : "!";


        botao.onclick =
            function () {

                modal.close();


                if (
                    typeof acao ===
                    "function"
                ) {

                    acao();

                }

            };


        modal.showModal();

    }

}


/* =========================================================
   FUNÇÕES DE SUPORTE
   ========================================================= */

function preencherListaEstados(
    listaEstados
) {

    if (
        !listaEstados
    ) {

        return;

    }


    listaEstados.innerHTML =
        "";


    estadosBrasil.forEach(
        function (
            estado
        ) {

            const opcao =
                document.createElement(
                    "option"
                );


            opcao.value =
                estado.nome;


            opcao.label =
                `${estado.nome} (${estado.sigla})`;


            listaEstados.appendChild(
                opcao
            );

        }
    );

}


function definirDataMaxima(
    campo
) {

    if (
        !campo
    ) {

        return;

    }


    const hoje =
        new Date();


    const ano =
        hoje.getFullYear();


    const mes =
        String(
            hoje.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const dia =
        String(
            hoje.getDate()
        ).padStart(
            2,
            "0"
        );


    campo.max =
        `${ano}-${mes}-${dia}`;

}