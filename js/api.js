/* =========================================================
   API.JS
   Responsável exclusivamente pelas consultas a serviços
   externos utilizados pela aplicação.
   ========================================================= */


/**
 * Consulta um CEP na API ViaCEP.
 *
 * A consulta utiliza JSONP para manter o comportamento que já
 * funciona no projeto quando os arquivos são executados localmente.
 *
 * Esta função não manipula campos do formulário.
 * Ela apenas consulta a API e devolve os dados encontrados.
 *
 * @param {string} cep
 * @returns {Promise<Object>}
 */
export function consultarCEP(cep) {

    const numerosCEP =
        String(
            cep || ""
        ).replace(
            /\D/g,
            ""
        );


    if (
        numerosCEP.length !==
        8
    ) {

        return Promise.reject(
            new Error(
                "O CEP deve conter 8 dígitos."
            )
        );

    }


    return new Promise(
        function (
            resolve,
            reject
        ) {

            const nomeCallback =
                "pingoCEPCallback_" +
                Date.now() +
                "_" +
                Math.random()
                    .toString(36)
                    .slice(2);


            const script =
                document.createElement(
                    "script"
                );


            let finalizado =
                false;


            function limpar() {

                if (
                    finalizado
                ) {

                    return;

                }


                finalizado =
                    true;


                delete window[
                    nomeCallback
                ];


                if (
                    script.parentNode
                ) {

                    script.parentNode.removeChild(
                        script
                    );

                }

            }


            window[
                nomeCallback
            ] =
                function (
                    dados
                ) {

                    limpar();


                    if (
                        !dados ||
                        dados.erro
                    ) {

                        reject(
                            new Error(
                                "CEP não encontrado."
                            )
                        );

                        return;

                    }


                    resolve(
                        dados
                    );

                };


            script.src =
                "https://viacep.com.br/ws/" +
                numerosCEP +
                "/json/?callback=" +
                nomeCallback;


            script.async =
                true;


            script.onerror =
                function () {

                    limpar();


                    reject(
                        new Error(
                            "Não foi possível consultar o CEP."
                        )
                    );

                };


            document.head.appendChild(
                script
            );

        }
    );

}


/**
 * Consulta os municípios de um estado na API do IBGE.
 *
 * A função retorna apenas os nomes das cidades ordenados.
 *
 * A manipulação visual do formulário continuará no
 * formulario.js.
 *
 * @param {number|string} idEstado
 * @returns {Promise<string[]>}
 */
export async function obterCidadesPorEstado(
    idEstado
) {

    if (
        idEstado === undefined ||
        idEstado === null ||
        String(
            idEstado
        ).trim() === ""
    ) {

        throw new Error(
            "Estado não informado."
        );

    }


    const resposta =
        await fetch(
            "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" +
            encodeURIComponent(
                idEstado
            ) +
            "/municipios"
        );


    if (
        !resposta.ok
    ) {

        throw new Error(
            "Não foi possível carregar as cidades."
        );

    }


    const municipios =
        await resposta.json();


    if (
        !Array.isArray(
            municipios
        )
    ) {

        throw new Error(
            "A API de cidades retornou um formato inválido."
        );

    }


    return municipios
        .map(
            function (
                municipio
            ) {

                return municipio.nome;

            }
        )
        .filter(
            Boolean
        )
        .sort(
            function (
                a,
                b
            ) {

                return a.localeCompare(
                    b,
                    "pt-BR",
                    {
                        sensitivity:
                            "base"
                    }
                );

            }
        );

}