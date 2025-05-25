    // Criar Cliente
    const apiUrl = 'http://localhost:8080/api/clientes';
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    let clienteTemp = null;

    function verificarCodigoExistente(codigo) {
        return fetch(`${apiUrl}/buscarCliente/${codigo}`, {
            method: 'GET',
            headers: headers
        })
        .then(response => {
            if (response.ok) {
                return true;
            } else {
                return false;
            }
        })
        .catch(error => {
            console.error('Erro ao verificar código:', error);
            return false;
        });
    }


    document.getElementById('formCliente').addEventListener('submit', function (event) {
        event.preventDefault();

        clienteTemp = {
            codigo: document.getElementById('codigo').value,
            loja: document.getElementById('loja').value,
            razao: document.getElementById('razao').value,
            tipo: document.getElementById('tipo').value,
            nomefantasia: document.getElementById('nomefantasia').value,
            finalidade: document.getElementById('finalidade').value,
            cnpj: document.getElementById('cnpj').value,
            cep: document.getElementById('cep').value,
            pais: document.getElementById('pais').value,
            estado: document.getElementById('estado').value,
            codmunicipio: document.getElementById('codmunicipio').value,
            cidade: document.getElementById('cidade').value,
            endereco: document.getElementById('endereco').value,
            bairro: document.getElementById('bairro').value,
            ddd: document.getElementById('ddd').value,
            telefone: document.getElementById('telefone').value,
            abertura: document.getElementById('abertura').value,
            contato: document.getElementById('contato').value,
            email: document.getElementById('email').value,
            homepage: document.getElementById('homepage').value
        };

        verificarCodigoExistente(clienteTemp.codigo).then(codigoExistente => {
            if (codigoExistente) {
                alert('Este código de cliente já está cadastrado. Por favor, escolha outro.');
            } else {
                $('#confirmarSalvarModal').modal('show');
            }
        });
    });

    document.getElementById('confirmarSalvarBtn').addEventListener('click', function () {
        fetch(`${apiUrl}/criarCliente`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(clienteTemp)
        })
        .then(response => {
            if (!response.ok) throw new Error("Erro ao salvar");
            return response.json();
        })
        .then(data => {
            $('#confirmarSalvarModal').modal('hide');
            alert("Cliente salvo com sucesso!");
            document.getElementById('formCliente').reset();
            clienteTemp = null;
            isFormEdited = false;
        })
        .catch(error => {
            $('#confirmarSalvarModal').modal('hide');
            alert("Erro ao salvar cliente.");
            console.error(error);
        });
    });