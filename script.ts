interface Veiculo {
    nome: string;
    placa: string;
    entrada: string; // Armazena a data em formato ISO
}

(function() {
    const $ = (query: string): HTMLInputElement | null =>
        document.querySelector(query); // para não precisar ficar criando querySelector 
    // para tudo

    function calcTempo(mil: number) {
        const min = Math.floor(mil / 60000);
        const sec = Math.floor((mil % 60000) / 1000);

        return `${min}m e ${sec}s`;
    }

    function patio() {
        function ler(): Veiculo[] {
            return localStorage.patio ? JSON.parse(localStorage.patio) : [];
        }

        function salvar(veiculos: Veiculo[]) {
            localStorage.setItem("patio", JSON.stringify(veiculos));
        }

        function adicionar(veiculo: Veiculo, salva?: boolean) {
            const row = document.createElement("tr");

            // Formatar a data para exibição no HTML
            const entradaFormatada = new Date(veiculo.entrada).toLocaleString('pt-BR', {
                year: '2-digit',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });

            row.innerHTML = `
                <td>${veiculo.nome}</td>
                <td>${veiculo.placa}</td>
                <td>${entradaFormatada}</td>
                <td>
                    <button class="delete" data-placa="${veiculo.placa}">X</button>
                </td>
            `;

            row.querySelector(".delete")?.addEventListener("click", function () {
                remover(this.dataset.placa!);
            });

            $("#patio")?.appendChild(row);

            if (salva) salvar([...ler(), veiculo]);
        }

        function remover(placa: string) {
            const veiculo = ler().find((veiculo) => veiculo.placa === placa);

            if (!veiculo) return;

            const tempo = calcTempo(new Date().getTime() - new Date(veiculo.entrada).getTime());

            if (!confirm(`O veículo ${veiculo.nome} permaneceu por ${tempo}. Deseja encerrar?`)) return;

            salvar(ler().filter((veiculo) => veiculo.placa !== placa));

            renderizar();
        }

        function renderizar() {
            $("#patio")!.innerHTML = "";
            // o ! se chama "force". Como eu tenho certeza de que "patio" existe no
            // HTML, estou forçando o innerHTML a renderizá-lo sempre (é perigoso usar
            // o force. Use com moderação)
            const patio = ler();

            if (patio.length) {
                patio.forEach((veiculo) => adicionar(veiculo));
            }
        }

        return { ler, adicionar, remover, salvar, renderizar };
    }

    patio().renderizar();

    const btnCadastrar = $("#cadastrar");

    if (btnCadastrar) {
        btnCadastrar.addEventListener("click", () => {
            const nome = $("#nome")?.value;
            const placa = $("#placa")?.value;

            if (!nome || !placa) {
                alert("Os campos nome e placa são obrigatórios");
                return;
            }

            const entrada = new Date().toISOString(); // Armazena no formato ISO

            patio().adicionar({ nome, placa, entrada }, true);
        });
    } else {
        console.error("Botão não encontrado! Verifique o ID.");
    }
})();

// npx -p typescript tsc
// para transpilar para JS