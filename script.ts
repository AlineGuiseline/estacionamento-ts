interface Veiculo {
    nome: string;
    placa: string;
    entrada: Date;
}

(function() {
    const $ = (query: string): HTMLInputElement | null => 
        document.querySelector(query); // pra não precisar ficar criando querySelector para tudo

    function patio() {
        function ler(){}

        function adicionar(veiculo: Veiculo){
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${veiculo.entrada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">X</button>
                </td>
            `;

            $("#patio")?.appendChild(row);
        }

        function remover(){}

        function salvar(){}

        function renderizar(){}

        return { ler, adicionar, remover, salvar, renderizar }
    }

    const btnCadastrar = $("#cadastrar");

    if (btnCadastrar) {
        btnCadastrar.addEventListener("click", () => {
            const nome = $("#nome")?.value;
            const placa = $("#placa")?.value;
    
            if (!nome || !placa) {
                alert("Os campos nome e placa são obrigatórios");
                return;
            }

            patio().adicionar({ nome, placa, entrada: new Date() });
        });
    } else {
        console.error("Botão não encontrado! Verifique o ID.");
    }
})();



// npx -p typescript tsc
// para transpilar para JS