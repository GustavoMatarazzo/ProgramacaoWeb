    const apiUrl = 'http://localhost:8080/api/clientes';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    let clienteSelecionado = null;

    // Listar Clientes
    function carregarClientes() {
        fetch(`${apiUrl}/listarClientes`, {
            method: 'GET',
            headers: headers
        })
        .then(response => {
            if (!response.ok) {
                alert('Erro ao conectar com a API: ' + response.statusText);
                throw new Error('Erro na rede');
            }
            return response.json();
        })
        .then(data => {
            const tbody = document.querySelector('#tabelaClientes tbody');
            tbody.innerHTML = '';

            if (data.length === 0) {
                tbody.innerHTML = `
                    <tr>
                    <td colspan="21" class="text-left text-muted">
                        Nenhum cliente cadastrado ainda.
                    </td>
                    <tr class="modelo-layout" style="visibility: collapse;">
                        ${'<td></td>'.repeat(21)}
                    </tr>
                `;
                return;
            }

            data.forEach(cliente => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><input type="checkbox" class="selecionar-cliente" data-codigo="${cliente.codigo}"></td>
                    <td>${cliente.codigo}</td>
                    <td>${cliente.loja}</td>
                    <td>${cliente.razao}</td>
                    <td>${cliente.tipo}</td>
                    <td>${cliente.nomefantasia}</td>
                    <td>${cliente.finalidade}</td>
                    <td>${cliente.cnpj}</td>
                    <td>${cliente.cep}</td>
                    <td>${cliente.pais}</td>
                    <td>${cliente.estado}</td>
                    <td>${cliente.codmunicipio}</td>
                    <td>${cliente.cidade}</td>
                    <td>${cliente.endereco}</td>
                    <td>${cliente.bairro}</td>
                    <td>${cliente.ddd}</td>
                    <td>${cliente.telefone}</td>
                    <td>${cliente.abertura}</td>
                    <td>${cliente.contato}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.homepage}</td>
                `;
                tbody.appendChild(row);
            });

            ativarCheckboxes();

        })
        .catch(error => console.error('Erro:', error));
    }

    window.onload = carregarClientes;

    // Controla checkboxes para seleção única
    function ativarCheckboxes() {
        const excluirBtn = document.getElementById("excluirSelecionado");
        const alterarBtn = document.getElementById("alterarSelecionado");
        const visualizarBtn = document.getElementById("visualizarSelecionado");
        const checkboxes = document.querySelectorAll(".selecionar-cliente");

        checkboxes.forEach((cb) => {
            cb.addEventListener("change", function () {
                if (this.checked) {
                    checkboxes.forEach((otherCb) => {
                        if (otherCb !== this) otherCb.checked = false;
                    });
                    clienteSelecionado = this.getAttribute("data-codigo");
                    excluirBtn.disabled = false;
                    alterarBtn.disabled = false;
                    visualizarBtn.disabled = false;
                } else {
                    clienteSelecionado = null;
                    excluirBtn.disabled = true;
                    alterarBtn.disabled = true
                    visualizarBtn.disabled = true;
                }
            });
        });
    }

    // Excluir Cliente
     document
        .getElementById("excluirSelecionado")
        .addEventListener("click", function () {
            if (!clienteSelecionado) {
                alert("Nenhum cliente selecionado.");
                return;
            }

            const confirmacao = confirm(
                `Você tem certeza que deseja excluir o cliente ${clienteSelecionado}?`
            );
            if (!confirmacao) return;

            fetch(`${apiUrl}/deletarCliente/${clienteSelecionado}`, {
                method: "DELETE",
                headers: headers,
            })
                .then((response) => {
                    if (!response.ok) {
                        alert("Cliente não encontrado!");
                        throw new Error("Cliente não encontrado");
                    }
                    return response.text();
                })
                .then((mensagem) => {
                    alert(mensagem);
                    clienteSelecionado = null;
                    this.disabled = true;
                    carregarClientes();
                })
                .catch((error) => console.error("Erro:", error));
        });

    // Atualizar Cliente
    document
    .getElementById("alterarSelecionado")
    .addEventListener("click", function () {
        if (!clienteSelecionado) {
            alert("Nenhum cliente selecionado.");
            return;
        } 
        localStorage.setItem('clienteCodigo', clienteSelecionado);
        window.location.href = 'alterar.html';
    })

    // Buscar Cliente
    document
    .getElementById("visualizarSelecionado")
    .addEventListener("click", function () {
        if (!clienteSelecionado) {
            alert("Nenhum cliente selecionado.");
            return;
        } 
        localStorage.setItem('clienteCodigo', clienteSelecionado);
        window.location.href = 'buscar.html';
    })

    // Busca filtrada por código
    document.getElementById('btnPesquisar').addEventListener('click', function() {
    const codigo = document.getElementById('filtroCodigo').value.trim();

    if (codigo === '') {
        carregarClientes();
        return;
    }

    fetch(`${apiUrl}/buscarCliente/${codigo}`, {
        method: 'GET',
        headers: headers
    })
    .then(response => {
        if (!response.ok) {
            alert('Erro ao buscar cliente: ' + response.statusText);
            throw new Error('Erro na rede');
        }
        return response.json();
    })
    .then(data => {
        const tbody = document.querySelector('#tabelaClientes tbody');
        tbody.innerHTML = '';

        if (!data || (Array.isArray(data) && data.length === 0)) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="21" class="text-left text-muted">Nenhum cliente encontrado para o código informado.</td>
                </tr>
                <tr class="modelo-layout" style="visibility: collapse;">
                    ${'<td></td>'.repeat(21)}
                </tr>
            `;
            return;
        }

        const clientes = Array.isArray(data) ? data : [data];

        clientes.forEach(cliente => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><input type="checkbox" class="selecionar-cliente" data-codigo="${cliente.codigo}"></td>
                <td>${cliente.codigo}</td>
                <td>${cliente.loja}</td>
                <td>${cliente.razao}</td>
                <td>${cliente.tipo}</td>
                <td>${cliente.nomefantasia}</td>
                <td>${cliente.finalidade}</td>
                <td>${cliente.cnpj}</td>
                <td>${cliente.cep}</td>
                <td>${cliente.pais}</td>
                <td>${cliente.estado}</td>
                <td>${cliente.codmunicipio}</td>
                <td>${cliente.cidade}</td>
                <td>${cliente.endereco}</td>
                <td>${cliente.bairro}</td>
                <td>${cliente.ddd}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.abertura}</td>
                <td>${cliente.contato}</td>
                <td>${cliente.email}</td>
                <td>${cliente.homepage}</td>
            `;
            tbody.appendChild(row);
        });

        ativarCheckboxes();

    })
    .catch(error => console.error('Erro:', error));
});