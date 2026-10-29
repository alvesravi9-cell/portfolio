/**
 * NOTA TRANSPARÊNCIA DE APRENDIZADO:
 * Este código foi desenvolvido como parte de um estudo prático de Desenvolvimento Front-End.
 * Utilizei assistência de IA para esclarecer dúvidas sobre a API do DOM e estruturar as
 * funções de forma limpa, garantindo a aplicação das boas práticas estudadas no curso do SENAC.
 */

// Executa os scripts principais quando o HTML estiver totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
    configurarMenuMobile();
    configurarAlternanciaTema();
    configurarSecaoProjetos();
    configurarValidacaoFormulario();
    atualizarAnoRodape();
});

/* ==========================================
   1. Controle do Menu Hambúrguer (Mobile)
   ================================---------- */
function configurarMenuMobile() {
    const botaoMenu = document.querySelector(".menu-hamburguer");
    const navMenu = document.querySelector(".navegacao");
    const linksNav = document.querySelectorAll(".link-nav");

    if (!botaoMenu || !navMenu) return;

    botaoMenu.addEventListener("click", () => {
        const estaAberto = navMenu.classList.toggle("menu-aberto");
        botaoMenu.setAttribute("aria-expanded", estaAberto);
    });

    linksNav.forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("menu-aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
        });
    });
}

/* ==========================================
   2. Alternância e Persistência do Tema
   ================================---------- */
function configurarAlternanciaTema() {
    const btnTema = document.getElementById("botao-tema");
    const corpoPagina = document.body;

    const temaSalvo = localStorage.getItem("tema_preferido");
    if (temaSalvo === "escuro") {
        corpoPagina.classList.add("tema-escuro");
    }

    if (!btnTema) return;

    btnTema.addEventListener("click", () => {
        corpoPagina.classList.toggle("tema-escuro");
        
        const modoEscuroAtivo = corpoPagina.classList.contains("tema-escuro");
        localStorage.setItem("tema_preferido", modoEscuroAtivo ? "escuro" : "claro");
    });
}

/* ==========================================
   3. Meus Projetos Dinâmicos e Filtro
   ================================---------- */
// APENAS OS 3 PROJETOS SOLICITADOS
const meusProjetos = [
    {
        titulo: "Sistema de Biblioteca",
        descricao: "Gerenciador de livros e controle de empréstimos voltado para funcionários da biblioteca.",
        tecnologias: ["JavaScript", "HTML", "CSS"],
        link: "#",
        emBreve: false
    },
    {
        titulo: "Aplicativo Delivery",
        descricao: "Interface dinâmica para pedidos de refeições com catálogo de produtos e carrinho interativo.",
        tecnologias: ["JavaScript", "HTML", "CSS"],
        link: "#",
        emBreve: false
    },
    {
        titulo: "Sistema de Notas",
        descricao: "Aplicação focada no cálculo automático de médias e verificação de situação escolar dos alunos.",
        tecnologias: ["JavaScript", "HTML", "CSS"],
        link: "#",
        emBreve: false
    }
];

function exibirProjetos(filtro = "todos") {
    const containerProjetos = document.getElementById("grade-projetos");
    if (!containerProjetos) return;

    containerProjetos.innerHTML = "";

    const projetosFiltrados = meusProjetos.filter(proj => {
        if (filtro === "todos") return true;
        return proj.tecnologias.includes(filtro);
    });

    projetosFiltrados.forEach(proj => {
        const cartao = document.createElement("article");
        cartao.className = "cartao-projeto";

        const acaoProjeto = proj.emBreve 
            ? `<span class="tag-em-breve">Em breve</span>`
            : `<a href="${proj.link}" class="link-projeto" target="_blank" rel="noopener noreferrer">Acessar</a>`;

        cartao.innerHTML = `
            <div>
                <div class="cabecalho-projeto">
                    <h3>${proj.titulo}</h3>
                    ${acaoProjeto}
                </div>
                <p>${proj.descricao}</p>
            </div>
            <div class="rodape-projeto">
                <span class="tecnologias-projeto">${proj.tecnologias.join(" • ")}</span>
            </div>
        `;

        containerProjetos.appendChild(cartao);
    });
}

function configurarSecaoProjetos() {
    exibirProjetos("todos");

    const botoesFiltro = document.querySelectorAll(".botao-filtro");
    botoesFiltro.forEach(btn => {
        btn.addEventListener("click", (evento) => {
            botoesFiltro.forEach(b => b.classList.remove("ativo"));
            evento.target.classList.add("ativo");

            const tecnologiaSelecionada = evento.target.getAttribute("data-filtro");
            exibirProjetos(tecnologiaSelecionada);
        });
    });
}

/* ==========================================
   4. Validação do Formulário de Contato
   ================================---------- */
function validarFormulario() {
    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoMensagem = document.getElementById("mensagem");
    const campoConsentimento = document.getElementById("consentimento");

    let formValido = true;
    limparErrosFormulario();

    if (!campoNome.value.trim()) {
        exibirMensagemErro("nome", "Por favor, informe seu nome.");
        formValido = false;
    }

    const valEmail = campoEmail.value.trim();
    if (!valEmail || !valEmail.includes("@") || !valEmail.includes(".")) {
        exibirMensagemErro("email", "Por favor, digite um e-mail válido com '@' e ponto.");
        formValido = false;
    }

    if (campoMensagem.value.trim().length < 20) {
        exibirMensagemErro("mensagem", "Sua mensagem precisa conter no mínimo 20 caracteres.");
        formValido = false;
    }

    if (!campoConsentimento.checked) {
        exibirMensagemErro("consentimento", "Você deve marcar esta opção para confirmar.");
        formValido = false;
    }

    return formValido;
}

function exibirMensagemErro(campo, texto) {
    const elementoErro = document.querySelector(`[id-erro="${campo}"]`);
    if (elementoErro) {
        elementoErro.textContent = texto;
    }
}

function limparErrosFormulario() {
    const erros = document.querySelectorAll(".erro-mensagem");
    erros.forEach(el => el.textContent = "");
}

function configurarValidacaoFormulario() {
    const form = document.getElementById("formulario-contato");
    const msgSucesso = document.getElementById("sucesso-envio");

    if (!form) return;

    form.addEventListener("submit", (evento) => {
        evento.preventDefault();
        msgSucesso.hidden = true;

        if (validarFormulario()) {
            msgSucesso.hidden = false;
            form.reset();

            setTimeout(() => {
                msgSucesso.hidden = true;
            }, 5000);
        }
    });
}

/* ==========================================
   5. Atualização Automática do Ano no Rodapé
   ================================---------- */
function atualizarAnoRodape() {
    const elAno = document.getElementById("ano-atual");
    if (elAno) {
        elAno.textContent = new Date().getFullYear();
    }
}
