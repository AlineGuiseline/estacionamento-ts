var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
(function () {
    var $ = function (query) {
        return document.querySelector(query);
    }; // para não precisar ficar criando querySelector 
    // para tudo
    function calcTempo(mil) {
        var min = Math.floor(mil / 60000);
        var sec = Math.floor((mil % 60000) / 1000);
        return "".concat(min, "m e ").concat(sec, "s");
    }
    function patio() {
        function ler() {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }
        function salvar(veiculos) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }
        function adicionar(veiculo, salva) {
            var _a, _b;
            var row = document.createElement("tr");
            // Formatar a data para exibição no HTML
            var entradaFormatada = new Date(veiculo.entrada).toLocaleString('pt-BR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            row.innerHTML = "\n                <td>".concat(veiculo.nome, "</td>\n                <td>").concat(veiculo.placa, "</td>\n                <td>").concat(entradaFormatada, "</td>\n                <td>\n                    <button class=\"delete\" data-placa=\"").concat(veiculo.placa, "\">X</button>\n                </td>\n            ");
            (_a = row.querySelector(".delete")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
                remover(this.dataset.placa);
            });
            (_b = $("#patio")) === null || _b === void 0 ? void 0 : _b.appendChild(row);
            if (salva)
                salvar(__spreadArray(__spreadArray([], ler(), true), [veiculo], false));
        }
        function remover(placa) {
            var veiculo = ler().find(function (veiculo) { return veiculo.placa === placa; });
            if (!veiculo)
                return;
            var tempo = calcTempo(new Date().getTime() - new Date(veiculo.entrada).getTime());
            if (!confirm("O ve\u00EDculo ".concat(veiculo.nome, " permaneceu por ").concat(tempo, ". Deseja encerrar?")))
                return;
            salvar(ler().filter(function (veiculo) { return veiculo.placa !== placa; }));
            renderizar();
        }
        function renderizar() {
            $("#patio").innerHTML = "";
            // o ! se chama "force". Como eu tenho certeza de que "patio" existe no
            // HTML, estou forçando o innerHTML a renderizá-lo sempre (é perigoso usar
            // o force. Use com moderação)
            var patio = ler();
            if (patio.length) {
                patio.forEach(function (veiculo) { return adicionar(veiculo); });
            }
        }
        return { ler: ler, adicionar: adicionar, remover: remover, salvar: salvar, renderizar: renderizar };
    }
    patio().renderizar();
    var btnCadastrar = $("#cadastrar");
    if (btnCadastrar) {
        btnCadastrar.addEventListener("click", function () {
            var _a, _b;
            var nome = (_a = $("#nome")) === null || _a === void 0 ? void 0 : _a.value;
            var placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
            if (!nome || !placa) {
                alert("Os campos nome e placa são obrigatórios");
                return;
            }
            var entrada = new Date().toISOString(); // Armazena no formato ISO
            patio().adicionar({ nome: nome, placa: placa, entrada: entrada }, true);
        });
    }
    else {
        console.error("Botão não encontrado! Verifique o ID.");
    }
})();
// npx -p typescript tsc
// para transpilar para JS
