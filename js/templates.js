/* =========================================================
   SISTEMA DE TEMPLATES
   PINGO DE ESPERANÇA
   ========================================================= */

import {
    dadosRedesSociais,
    dadosProjetos,
    dadosNiveisVoluntariado,
    dadosCampanhas,
    dadosVotacao,
    dadosContribuicoes
} from "./dados.js";


/* =========================================================
   FUNÇÃO DE SEGURANÇA
   ========================================================= */

function escaparHTML(
    texto
) {

    return String(texto)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   TEMPLATE - REDE SOCIAL
   ========================================================= */

function templateRedeSocial(
    rede
) {

    return `

        <a
            href="#"
            class="rede ${escaparHTML(rede.classe)}">

            <span class="simbolo-rede">

                ${escaparHTML(rede.icone)}

            </span>

            ${escaparHTML(rede.nome)}

        </a>

    `;

}


/* =========================================================
   TEMPLATE - PROJETO
   ========================================================= */

function templateProjeto(
    projeto
) {

    return `

        <article class="card-projeto">

            <span class="icone-projeto">

                ${escaparHTML(projeto.icone)}

            </span>


            <h3>

                ${escaparHTML(projeto.titulo)}

            </h3>


            <p>

                ${escaparHTML(projeto.descricao)}

            </p>

        </article>

    `;

}


/* =========================================================
   TEMPLATE - NÍVEL DE VOLUNTARIADO
   ========================================================= */

function templateNivelVoluntario(
    nivel
) {

    return `

        <article class="nivel-voluntario">

            <span class="nivel-icone">

                ✦

            </span>


            <div>

                <h3>

                    ${escaparHTML(nivel.nome)}

                </h3>


                <p>

                    ${escaparHTML(nivel.quantidade)}

                </p>


                <span
                    class="badge-nivel ${escaparHTML(nivel.classeBadge)}">

                    ${escaparHTML(nivel.badge)}

                </span>

            </div>

        </article>

    `;

}


/* =========================================================
   TEMPLATE - CAMPANHA
   ========================================================= */

function templateCampanha(
    campanha
) {

    return `

        <article
            class="campanha-card"
            data-campanha-card="${escaparHTML(campanha.id)}">


            <div class="campanha-cabecalho">


                <div>

                    <h3>

                        ${escaparHTML(campanha.titulo)}

                    </h3>


                    <span
                        class="badge-status ${escaparHTML(campanha.classeStatus)}">

                        ${escaparHTML(campanha.status)}

                    </span>

                </div>


                <span
                    class="campanha-icone"
                    aria-hidden="true">

                    ${escaparHTML(campanha.icone)}

                </span>


            </div>


            <p>

                ${escaparHTML(campanha.descricao)}

            </p>


            <div class="campanha-meta">


                <span>

                    Meta:

                    <strong>

                        ${escaparHTML(campanha.meta)}

                    </strong>

                </span>


                <strong>

                    ${campanha.percentual}%

                </strong>


            </div>


            <div class="barra-progresso">

                <span
                    style="width: ${campanha.percentual}%;">
                </span>

            </div>


            <small>

                ${escaparHTML(campanha.arrecadado)}

            </small>


        </article>

    `;

}


/* =========================================================
   TEMPLATE - VOTAÇÃO
   ========================================================= */

function templateOpcaoVotacao(
    opcao
) {

    return `

        <button
            type="button"
            class="opcao-votacao"
            data-campanha="${escaparHTML(opcao.id)}"
            aria-pressed="false">


            <span
                class="icone-voto"
                aria-hidden="true">

                ${escaparHTML(opcao.icone)}

            </span>


            <span class="texto-voto">


                <strong>

                    ${escaparHTML(opcao.titulo)}

                </strong>


                <small>

                    ${escaparHTML(opcao.descricao)}

                </small>


            </span>


            <span
                class="contador-votos"
                data-campanha="${escaparHTML(opcao.id)}">

                ${opcao.votos} votos

            </span>


        </button>

    `;

}


/* =========================================================
   TEMPLATE - CONTRIBUIÇÃO
   ========================================================= */

function templateContribuicao(
    contribuicao
) {

    return `

        <label class="opcao-contribuicao">


            <input
                type="checkbox"
                name="${escaparHTML(contribuicao.nome)}"
                value="${escaparHTML(contribuicao.valor)}">


            <span
                class="icone-opcao"
                aria-hidden="true">

                ${escaparHTML(contribuicao.icone)}

            </span>


            <span class="texto-opcao">


                <span class="linha-opcao-titulo">


                    <strong>

                        ${escaparHTML(contribuicao.titulo)}

                    </strong>


                    <span
                        class="badge-contribuicao ${escaparHTML(contribuicao.classeBadge)}">

                        ${escaparHTML(contribuicao.badge)}

                    </span>


                </span>


                <small>

                    ${escaparHTML(contribuicao.descricao)}

                </small>


            </span>


        </label>

    `;

}


/* =========================================================
   TEMPLATE - INÍCIO
   ========================================================= */

export function templateInicio() {

    const redesSociais =
        dadosRedesSociais
            .map(
                templateRedeSocial
            )
            .join("");


    return `

        <section class="sobre">


            <h2>

                Sobre a ONG

            </h2>


            <div class="carrossel">


                <img
                    id="imagem-carrossel"
                    src="../imagens/ong.jpg.png"
                    alt="Cachorro caramelo e gato preto e branco representando o cuidado com os animais">


            </div>


            <div class="indicadores">


                <button
                    type="button"
                    class="indicador ativo"
                    aria-label="Mostrar imagem sobre animais"
                    data-imagem="0">
                </button>


                <button
                    type="button"
                    class="indicador"
                    aria-label="Mostrar imagem sobre ações sociais"
                    data-imagem="1">
                </button>


            </div>


            <p>

                A Pingo de Esperança é uma organização do terceiro setor
                dedicada a promover ações sociais e contribuir para a
                melhoria da qualidade de vida de pessoas e animais
                em situação de vulnerabilidade.

            </p>


            <p>

                Nosso trabalho é realizado por meio de projetos sociais,
                voluntariado e campanhas de doação, buscando gerar impacto
                positivo e levar cuidado, apoio e esperança a quem precisa.

            </p>


        </section>


        <section class="participe">


            <span class="decoracao-coracao">

                ♡

            </span>


            <h2>

                Faça parte dessa causa

            </h2>


            <p>

                Pequenas ações podem gerar grandes mudanças.
                Você pode participar das iniciativas da Pingo de Esperança
                por meio do voluntariado e de outras formas de contribuição.

            </p>


            <a
                href="#cadastro"
                data-rota="cadastro"
                class="botao-participar">

                ♡ Quero participar

            </a>


        </section>


        <section class="redes-sociais">


            <span class="icone-redes">

                ♡

            </span>


            <h2>

                Siga nossas redes sociais

            </h2>


            <p>

                Acompanhe nossas ações, campanhas e projetos e ajude a
                divulgar a Pingo de Esperança.

            </p>


            <div class="lista-redes">

                ${redesSociais}

            </div>


        </section>


        <section
            class="contato"
            id="contato">


            <div class="titulo-contato">


                <span class="icone-contato">

                    ?

                </span>


                <div>


                    <h2>

                        Entre em contato

                    </h2>


                    <p>

                        Tem alguma dúvida ou quer saber mais sobre nossos
                        projetos? Entre em contato com a nossa equipe.

                    </p>


                </div>


            </div>


            <address>


                <p>

                    Av. das Acácias, 850 -
                    Vila Mariana, São Paulo/SP

                </p>


                <p>

                    CNPJ: 12.345.678/0001-90

                </p>


                <p>

                    Telefone: (11) 99999-9999

                </p>


                <p>

                    E-mail:


                    <a
                        href="mailto:contato@pingodeesperanca.org.br">

                        contato@pingodeesperanca.org.br

                    </a>


                </p>


            </address>


        </section>

    `;

}


/* =========================================================
   TEMPLATE - PROJETOS
   ========================================================= */

export function templateProjetos() {

    const projetos =
        dadosProjetos
            .map(
                templateProjeto
            )
            .join("");


    const niveis =
        dadosNiveisVoluntariado
            .map(
                templateNivelVoluntario
            )
            .join("");


    const campanhas =
        dadosCampanhas
            .map(
                templateCampanha
            )
            .join("");


    const votacoes =
        dadosVotacao
            .map(
                templateOpcaoVotacao
            )
            .join("");


    return `

        <section class="introducao-projetos">


            <span class="simbolo-projetos">

                ♡

            </span>


            <h1>

                Nossos Projetos

            </h1>


            <p>

                Conheça as iniciativas da Pingo de Esperança e descubra
                como você pode contribuir para transformar vidas.

            </p>


        </section>


        <section
            class="projetos"
            id="projetos-sociais">


            <h2>

                Projetos Sociais

            </h2>


            ${projetos}


        </section>


        <section
            class="voluntariado"
            id="voluntariado">


            <span class="icone-secao">

                ✚

            </span>


            <h2>

                Voluntariado

            </h2>


            <p>

                Os voluntários podem participar de nossas ações,
                campanhas e atividades de apoio à comunidade.

            </p>


            <ol>


                <li>

                    Conheça nossos projetos.

                </li>


                <li>

                    Escolha como deseja contribuir.

                </li>


                <li>

                    Faça seu cadastro.

                </li>


                <li>

                    Participe das ações e conquiste níveis e badges.

                </li>


                <li>

                    Desbloqueie medalhas e benefícios conforme sua participação.

                </li>


            </ol>


            <div class="niveis-voluntariado">

                ${niveis}

            </div>


        </section>


        <section
            class="campanhas-atividades"
            id="campanhas">


            <span class="icone-secao">

                ✦

            </span>


            <h2>

                Campanhas e Atividades

            </h2>


            <p class="texto-campanhas">

                Acompanhe nossas campanhas em andamento,
                veja o progresso das metas e participe das
                decisões sobre novas ações.

            </p>


            <div class="lista-campanhas">

                ${campanhas}

            </div>


            <div class="votacao-campanha">


                <h3>

                    Qual deve ser nossa próxima campanha?

                </h3>


                <p>

                    Escolha uma das opções para participar da decisão.

                </p>


                <div class="opcoes-votacao">

                    ${votacoes}

                </div>


                <p
                    class="mensagem-votacao"
                    aria-live="polite">
                </p>


            </div>


            <!-- =============================================
                 COMPONENTE VUE
                 ============================================= -->

            <div
                id="painel-vue"
                class="votacao-campanha"
                aria-live="polite">

            </div>


            <div class="acao-campanha">


                <button
                    type="button"
                    class="botao-campanha"
                    id="botao-iniciar-campanha">

                    ＋ Iniciar uma campanha

                </button>


                <p>

                    Organize uma nova iniciativa e mobilize voluntários
                    para uma ação da comunidade.

                </p>


            </div>


            <dialog
                id="modal-campanha"
                class="modal-confirmacao"
                aria-labelledby="titulo-modal-campanha">


                <div class="modal-conteudo">


                    <span
                        class="modal-icone"
                        aria-hidden="true">

                        ＋

                    </span>


                    <h2 id="titulo-modal-campanha">

                        Iniciar uma campanha

                    </h2>


                    <p>

                        Preencha os dados da nova campanha.

                    </p>


                    <form
                        id="form-campanha"
                        class="form-campanha">


                        <div class="form-campanha-grid">


                            <div
                                class="campo-campanha campo-campanha-largo">


                                <label for="nome-campanha">

                                    Nome da campanha

                                </label>


                                <input
                                    type="text"
                                    id="nome-campanha"
                                    required>


                            </div>


                            <div
                                class="campo-campanha campo-campanha-largo">


                                <label for="objetivo-campanha">

                                    Objetivo

                                </label>


                                <textarea
                                    id="objetivo-campanha"
                                    rows="3"
                                    required>
                                </textarea>


                            </div>


                            <div class="campo-campanha">


                                <label for="meta-campanha">

                                    Meta

                                </label>


                                <input
                                    type="text"
                                    id="meta-campanha"
                                    placeholder="Ex.: 100 cestas"
                                    required>


                            </div>


                            <div class="campo-campanha">


                                <label for="data-campanha">

                                    Data de início

                                </label>


                                <input
                                    type="date"
                                    id="data-campanha"
                                    required>


                            </div>


                        </div>


                        <div class="modal-acoes">


                            <button
                                type="button"
                                class="botao-modal cancelar"
                                id="cancelar-campanha">

                                Voltar

                            </button>


                            <button
                                type="submit"
                                class="botao-modal confirmar">

                                Criar campanha

                            </button>


                        </div>


                    </form>


                </div>


            </dialog>


        </section>


        <section
            class="doacoes"
            id="doacoes">


            <span class="icone-secao">

                ♥

            </span>


            <h2>

                Campanhas de Doação

            </h2>


            <article class="card-doacao">


                <h3>

                    Como ajudar

                </h3>


                <p>

                    As doações contribuem para a manutenção dos projetos
                    e para a aquisição de recursos destinados às pessoas
                    e aos animais atendidos pela ONG.

                </p>


            </article>


        </section>


        <section class="chamada-projetos">


            <span class="icone-chamada">

                ♡

            </span>


            <h2>

                Faça parte dessa causa

            </h2>


            <p>

                Quer contribuir com a Pingo de Esperança?
                Cadastre-se para participar de nossas iniciativas.

            </p>


            <a
                href="#cadastro"
                data-rota="cadastro"
                class="botao-participar">

                ♡ Quero participar

            </a>


        </section>

    `;

}


/* =========================================================
   TEMPLATE - CADASTRO
   ========================================================= */

export function templateCadastro() {

    const contribuicoes =
        dadosContribuicoes
            .map(
                templateContribuicao
            )
            .join("");


    return `

        <section class="introducao-cadastro">


            <span class="icone-cadastro">

                ♡

            </span>


            <h1>

                Cadastre-se

            </h1>


            <p>

                Preencha seus dados para fazer parte das iniciativas
                da Pingo de Esperança e contribuir para nossas ações.

            </p>


            <p class="legenda-obrigatorio">


                <span>

                    *

                </span>


                Campo obrigatório


            </p>


        </section>


        <form
            id="formulario-cadastro"
            novalidate>


            <fieldset>


                <legend>

                    Dados pessoais

                </legend>


                <div class="campos-grid">


                    <div class="campo">


                        <label for="nome">


                            Nome completo


                            <span class="asterisco">

                                *

                            </span>


                        </label>


                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Ex.: Ellen Rita"
                            autocomplete="name"
                            title="Digite seu nome completo, incluindo nome e sobrenome."
                            required>


                    </div>


                    <div class="campo">


                        <label for="nome-social">

                            Nome social

                        </label>


                        <input
                            type="text"
                            id="nome-social"
                            name="nome-social"
                            placeholder="Digite seu nome social"
                            autocomplete="nickname">


                    </div>


                    <div class="campo">


                        <label for="email">


                            E-mail


                            <span class="asterisco">

                                *

                            </span>


                        </label>


                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="exemplo@email.com"
                            autocomplete="email"
                            inputmode="email"
                            pattern="[^\s@]+@[^\s@]+\.[A-Za-z]{2,}"
                            title="Digite um e-mail completo, como exemplo@email.com."
                            required>


                    </div>


                    <div class="campo">


                        <label for="nascimento">


                            Data de nascimento


                            <span class="asterisco">

                                *

                            </span>


                        </label>


                        <input
                            type="date"
                            id="nascimento"
                            name="nascimento"
                            min="1900-01-01"
                            required>


                    </div>


                    <div class="campo">


                        <label for="cpf">


                            CPF


                            <span class="asterisco">

                                *

                            </span>


                        </label>


                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            placeholder="000.000.000-00"
                            maxlength="14"
                            autocomplete="off"
                            inputmode="numeric"
                            pattern="[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}"
                            title="Digite o CPF no formato 000.000.000-00."
                            required>


                    </div>


                </div>


            </fieldset>


            <fieldset>


                <legend>

                    Contato

                </legend>


                <div class="campo">


                    <label for="telefone">


                        Telefone


                        <span class="asterisco">

                            *

                        </span>


                    </label>


                    <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        placeholder="(11) 99999-9999"
                        maxlength="15"
                        autocomplete="tel"
                        inputmode="tel"
                        title="Digite o telefone no formato (11) 99999-9999."
                        required>


                </div>


            </fieldset>


            <fieldset>


                <legend>

                    Endereço

                </legend>


                <div class="campos-grid">


                    <div class="campo">


                        <label for="cep">


                            CEP


                            <span class="asterisco">

                                *

                            </span>


                        </label>


                        <input
                            type="text"
                            id="cep"
                            name="cep"
                            placeholder="00000-000"
                            maxlength="9"
                            autocomplete="postal-code"
                            inputmode="numeric"
                            pattern="[0-9]{5}-[0-9]{3}"
                            title="Digite o CEP no formato 00000-000."
                            required>


                    </div>


                    <div class="campo">


                        <label for="numero">


                            Número


                            <span class="asterisco">

                                *

                            </span>


                        </label>


                        <input
                            type="text"
                            id="numero"
                            name="numero"
                            placeholder="Ex.: 100"
                            inputmode="numeric"
                            maxlength="10"
                            title="Digite somente o número do endereço."
                            required>


                        <label
                            for="sem-numero"
                            style="
                                display: flex;
                                align-items: center;
                                gap: 8px;
                                margin-top: 10px;
                                margin-bottom: 0;
                                font-weight: 400;
                                cursor: pointer;
                            ">

                            <input
                                type="checkbox"
                                id="sem-numero"
                                name="sem-numero"
                                value="true"
                                style="
                                    width: 18px;
                                    height: 18px;
                                    flex-shrink: 0;
                                    margin: 0;
                                ">

                            <span>

                                Marque aqui caso não tenha número

                            </span>

                        </label>


                    </div>


                    <div class="campo campo-largo">


                        <label for="endereco">


                            Endereço


                            <span class="asterisco">

                                *

                            </span>


                        </label>


                        <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            placeholder="Ex.: Avenida das Acácias"
                            autocomplete="street-address"
                            title="Digite o tipo e nome do logradouro, como Avenida das Acácias."
                            required>


                    </div>


                    <div class="campo campo-largo">


                        <label for="complemento">

                            Complemento

                        </label>


                        <input
                            type="text"
                            id="complemento"
                            name="complemento"
                            placeholder="Ex.: apartamento 12">


                    </div>


                    <div class="campo">


                        <label for="estado">


                            Estado


                            <span class="asterisco">

                                *

                            </span>


                        </label>


                        <input
                            type="text"
                            id="estado"
                            name="estado"
                            list="lista-estados"
                            placeholder="Digite ou selecione o estado"
                            autocomplete="off"
                            required>


                        <datalist
                            id="lista-estados">
                        </datalist>


                    </div>


                    <div class="campo">


                        <label for="cidade">


                            Cidade


                            <span class="asterisco">

                                *

                            </span>


                        </label>


                        <input
                            type="text"
                            id="cidade"
                            name="cidade"
                            list="lista-cidades"
                            placeholder="Selecione primeiro o estado"
                            autocomplete="off"
                            required
                            disabled>


                        <datalist
                            id="lista-cidades">
                        </datalist>


                    </div>


                </div>


            </fieldset>


            <fieldset>


                <legend>

                    Como deseja contribuir?

                </legend>


                <p class="descricao-contribuicao">

                    Selecione uma ou mais opções:

                </p>


                <div class="opcoes-contribuicao">

                    ${contribuicoes}

                </div>


            </fieldset>


            <div class="area-envio">


                <button
                    type="submit"
                    id="botao-enviar">


                    ♡ Enviar cadastro


                </button>


                <p class="texto-ajuda">


                    Sua participação pode fazer a diferença.


                </p>


            </div>


        </form>


        <dialog
            id="modal-contribuicao"
            class="modal-confirmacao"
            aria-labelledby="titulo-modal-contribuicao">


            <div class="modal-conteudo">


                <span
                    class="modal-icone"
                    aria-hidden="true">

                    ?

                </span>


                <h2 id="titulo-modal-contribuicao">

                    Duas formas de contribuição

                </h2>


                <p>

                    Você selecionou trabalho voluntário e
                    contribuição financeira. Deseja continuar
                    com as duas opções?

                </p>


                <div class="modal-acoes">


                    <button
                        type="button"
                        class="botao-modal cancelar"
                        id="cancelar-contribuicao">

                        Não, voltar

                    </button>


                    <button
                        type="button"
                        class="botao-modal confirmar"
                        id="confirmar-contribuicao">

                        Sim, continuar

                    </button>


                </div>


            </div>


        </dialog>


        <dialog
            id="modal-feedback"
            class="modal-feedback"
            aria-labelledby="titulo-modal-feedback"
            aria-describedby="mensagem-modal-feedback">


            <div class="modal-conteudo">


                <span
                    id="icone-modal-feedback"
                    class="modal-icone"
                    aria-hidden="true">

                    !

                </span>


                <h2 id="titulo-modal-feedback">

                    Atenção

                </h2>


                <p id="mensagem-modal-feedback">

                    Verifique os campos do formulário.

                </p>


                <div class="modal-acoes">


                    <button
                        type="button"
                        class="botao-modal confirmar"
                        id="acao-modal-feedback">

                        Entendi

                    </button>


                </div>


            </div>


        </dialog>

    `;

}