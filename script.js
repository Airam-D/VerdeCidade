// --- 1. CAMADA DE INTERAÇÃO (ENTRADA) ---
document.addEventListener('DOMContentLoaded', () => {
    const formPlantio = document.getElementById('form-plantio');

    if (formPlantio) {
        // Manipulador de Evento de envio (submit)
        formPlantio.addEventListener('submit', function (event) {
            event.preventDefault(); // Impede o recarregamento (Regra da Sprint 2)

            console.log("Formulário capturado com sucesso!"); // Debug no console
            executarFluxoCadastro();
        });
    }

    // Inicializa a listagem se o elemento existir na página
    if (document.getElementById('lista-renderizada')) {
        renderizarSaidaCanteiros();
    }

    const btnEntrar = document.getElementById('btn-entrar-login');
    if (btnEntrar) {
        btnEntrar.addEventListener('click', fazerLogin);
    }

});

// --- 2. CAMADA DE INTELIGÊNCIA (PROCESSAMENTO) ---
function executarFluxoCadastro() {
    // Captura de Inputs
    const nome = document.getElementById('nome_canteiro').value;
    const cultura = document.getElementById('tipo_hortalica').value;
    const dataPlantio = document.getElementById('data_plantio').value;
    const area = document.getElementById('area_canteiro').value;

    // Validação de Dados (Verificação de campos vazios)
    if (!nome || !cultura || !dataPlantio || !area) {
        alert("⚠️ Por favor, preencha todos os campos antes de continuar.");
        return;
    }

    // Cálculos Agronômicos (Objeto Math)
    const sementesCalculadas = Math.ceil(parseFloat(area) * 50);

    // Cálculos de Data (Objeto Date - Estimativa de 45 dias)
    const dataBase = new Date(dataPlantio);
    dataBase.setDate(dataBase.getDate() + 45);
    const dataColheitaFinal = dataBase.toLocaleDateString('pt-BR');

    // Criação do Objeto de Saída
    const novoCanteiro = {
        id: Date.now(),
        nome,
        cultura,
        area,
        sementes: sementesCalculadas,
        dataColheita: dataColheitaFinal
    };

    // Armazenamento
    const listaAtual = JSON.parse(localStorage.getItem('canteiros')) || [];
    listaAtual.push(novoCanteiro);
    localStorage.setItem('canteiros', JSON.stringify(listaAtual));

    alert(`✅ Sucesso! Precisará de ${sementesCalculadas} sementes.\nColheita estimada: ${dataColheitaFinal}`);

    // Redirecionamento para visualização
    window.location.href = "canteiros.html";
}

// --- 3. CAMADA DE VISUALIZAÇÃO (SAÍDA) ---
function renderizarSaidaCanteiros() {
    const listaUI = document.getElementById('lista-renderizada');
    const dados = JSON.parse(localStorage.getItem('canteiros')) || [];

    listaUI.innerHTML = ''; // Limpa painel

    dados.forEach(item => {
        // Criação cirúrgica de elementos (document.createElement)
        const card = document.createElement('div');
        card.classList.add('card-referencia');

        card.innerHTML = `
            <div class="header-card-ref">
                <strong>🌱 ${item.nome}</strong>
            </div>
            <p>Hortaliça: ${item.cultura}</p>
            <p>Colheita prevista: <strong>${item.dataColheita}</strong></p>
            <hr>
            <p>🎒 Insumos: ${item.sementes} sementes</p>
            <button class="btn-excluir-ref" onclick="removerCanteiro(${item.id})">Remover</button>
        `;
        listaUI.appendChild(card);
    });
}

function removerCanteiro(id) {
    let dados = JSON.parse(localStorage.getItem('canteiros')) || [];
    dados = dados.filter(d => d.id !== id);
    localStorage.setItem('canteiros', JSON.stringify(dados));
    renderizarSaidaCanteiros();
}

// --- FUNÇÃO DE LOGIN ---
function fazerLogin() {
    // Captura os inputs
    const email = document.getElementById("login-email").value.trim();
    const senha = document.getElementById("login-senha").value.trim();

    // Validação de campos vazios (UI/UX para idosos: mensagens claras)
    if (email === "" || senha === "") {
        alert("⚠️ Por favor, preencha o seu e-mail e sua senha para entrar.");
        return;
    }

    // Simulação de autenticação (Mínimo de 4 caracteres para senha)
    if (senha.length < 4) {
        alert("⚠️ A senha deve ter pelo menos 4 números ou letras.");
        return;
    }

    // Se passar na validação, salva o status de login e redireciona
    console.log("Login realizado com sucesso!");
    localStorage.setItem('usuarioLogado', 'true'); // Opcional: para controle de acesso
    window.location.href = "dashboard.html";
}