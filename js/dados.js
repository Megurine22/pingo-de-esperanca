/* =========================================================
   DADOS DA APLICAÇÃO
   PINGO DE ESPERANÇA
   ========================================================= */


/* =========================================================
   REDES SOCIAIS
   ========================================================= */

export const dadosRedesSociais = [

    {
        id: "instagram",
        nome: "Instagram",
        icone: "◎",
        classe: "rede-instagram"
    },

    {
        id: "facebook",
        nome: "Facebook",
        icone: "f",
        classe: "rede-facebook"
    },

    {
        id: "youtube",
        nome: "YouTube",
        icone: "▶",
        classe: "rede-youtube"
    },

    {
        id: "linkedin",
        nome: "LinkedIn",
        icone: "in",
        classe: "rede-linkedin"
    }

];


/* =========================================================
   PROJETOS
   ========================================================= */

export const dadosProjetos = [

    {
        id: "acao-solidaria",
        icone: "♥",
        titulo: "Ação Solidária",
        descricao:
            "Arrecadamos e distribuímos alimentos, roupas e itens essenciais para pessoas e famílias em situação de vulnerabilidade."
    },

    {
        id: "apoio-animal",
        icone: "🐾",
        titulo: "Apoio Animal",
        descricao:
            "Promovemos campanhas para arrecadação de alimentos, medicamentos e outros itens destinados a animais que precisam de cuidados."
    }

];


/* =========================================================
   NÍVEIS DE VOLUNTARIADO
   ========================================================= */

export const dadosNiveisVoluntariado = [

    {
        id: "novo",
        nome: "Novo voluntário",
        quantidade: "0 a 2 ações",
        badge: "NOVO",
        classeBadge: "badge-novo"
    },

    {
        id: "ativo",
        nome: "Voluntário ativo",
        quantidade: "3 a 5 ações",
        badge: "ATIVO",
        classeBadge: "badge-ativo"
    },

    {
        id: "destaque",
        nome: "Voluntário destaque",
        quantidade: "6 a 9 ações",
        badge: "DESTAQUE",
        classeBadge: "badge-destaque"
    },

    {
        id: "embaixador",
        nome: "Embaixador da causa",
        quantidade: "10 ou mais ações",
        badge: "EMBAIXADOR",
        classeBadge: "badge-embaixador"
    }

];


/* =========================================================
   CAMPANHAS
   ========================================================= */

export const dadosCampanhas = [

    {
        id: "cesta",
        titulo: "Cesta Solidária",
        status: "EM ANDAMENTO",
        classeStatus: "status-andamento",
        icone: "♥",
        descricao:
            "Arrecadação de alimentos para famílias em situação de vulnerabilidade.",
        meta: "100 cestas",
        percentual: 67,
        arrecadado: "67 cestas arrecadadas"
    },

    {
        id: "animal",
        titulo: "Apoio Animal",
        status: "EM ANDAMENTO",
        classeStatus: "status-andamento",
        icone: "🐾",
        descricao:
            "Arrecadação de ração e medicamentos para animais que precisam de cuidados.",
        meta: "80 kg",
        percentual: 68,
        arrecadado: "54 kg arrecadados"
    }

];


/* =========================================================
   VOTAÇÃO
   ========================================================= */

export const dadosVotacao = [

    {
        id: "inverno",
        titulo: "Inverno Solidário",
        descricao: "Roupas e cobertores.",
        icone: "❄",
        votos: 31
    },

    {
        id: "cesta",
        titulo: "Cesta Solidária",
        descricao: "Alimentos para famílias.",
        icone: "♥",
        votos: 58
    },

    {
        id: "animal",
        titulo: "Apoio Animal",
        descricao: "Ração e medicamentos.",
        icone: "🐾",
        votos: 42
    }

];


/* =========================================================
   FORMAS DE CONTRIBUIÇÃO
   ========================================================= */

export const dadosContribuicoes = [

    {
        id: "voluntariado",
        nome: "voluntariado",
        valor: "voluntariado",
        titulo: "Trabalho voluntário",
        badge: "VOLUNTÁRIO",
        classeBadge: "badge-voluntario",
        icone: "✚",
        descricao:
            "Participar das ações e campanhas."
    },

    {
        id: "doacao",
        nome: "doacao",
        valor: "doacao",
        titulo: "Contribuição financeira",
        badge: "DOAÇÃO",
        classeBadge: "badge-doacao",
        icone: "♥",
        descricao:
            "Apoiar a manutenção dos projetos."
    }

];