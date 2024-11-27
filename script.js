"use strict";
(function () {
    const $ = (query) => document.querySelector(query); // pra não precisar ficar criando querySelector para tudo
    function patio() {
        function ler() { }
        function adicionar(veiculo) {
            var _a;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">X</button>
                </td>
            `;
            (_a = $("#patio")) === null || _a === void 0 ? void 0 : _a.appendChild(row);
        }
        function remover() { }
        function salvar() { }
        function renderizar() { }
        return { ler, adicionar, remover, salvar, renderizar };
    }
    const btnCadastrar = $("#cadastrar");
    if (btnCadastrar) {
        btnCadastrar.addEventListener("click", () => {
            var _a, _b;
            const nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
            const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
            if (!nome || !placa) {
                alert("Os campos nome e placa são obrigatórios");
                return;
            }
            patio().adicionar({ nome, placa, entrada: new Date() });
        });
    }
    else {
        console.error("Botão não encontrado! Verifique o ID.");
    }
})();
// npx -p typescript tsc
// para transpilar para JS
