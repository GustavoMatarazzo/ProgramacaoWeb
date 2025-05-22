    // Buscar Cliente
    const apiUrl = 'http://localhost:8080/api/clientes';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const codigo = localStorage.getItem('clienteCodigo');

    window.addEventListener('DOMContentLoaded', () => {
        if (!codigo) {
            alert("Nenhum cliente selecionado para visualização.");
            return;
        }
    
        fetch(`${apiUrl}/buscarCliente/${codigo}`, {
            method: 'GET',
            headers: headers
        })
        .then(response => {
            if (!response.ok) throw new Error('Cliente não encontrado');
            return response.json();
        })
        .then(cliente => {
            document.getElementById('codigo').value = cliente.codigo;
            document.getElementById('loja').value = cliente.loja;
            document.getElementById('razao').value = cliente.razao;
            document.getElementById('tipo').value = cliente.tipo;
            document.getElementById('nomefantasia').value = cliente.nomefantasia;
            document.getElementById('finalidade').value = cliente.finalidade;
            document.getElementById('cnpj').value = cliente.cnpj;
            document.getElementById('cep').value = cliente.cep;
            document.getElementById('pais').value = cliente.pais;
            document.getElementById('estado').value = cliente.estado;
            document.getElementById('codmunicipio').value = cliente.codmunicipio;
            document.getElementById('cidade').value = cliente.cidade;
            document.getElementById('endereco').value = cliente.endereco;
            document.getElementById('bairro').value = cliente.bairro;
            document.getElementById('ddd').value = cliente.ddd;
            document.getElementById('telefone').value = cliente.telefone;
            document.getElementById('abertura').value = cliente.abertura;
            document.getElementById('contato').value = cliente.contato;
            document.getElementById('email').value = cliente.email;
            document.getElementById('homepage').value = cliente.homepage;
        })
        .catch(error => {
            alert("Erro ao carregar cliente.");
            console.error(error);
        });
    });