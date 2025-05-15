const token = localStorage.getItem('jwt');
if (!token) {
    // Se não tiver token, redireciona para a tela de login
    window.location.href = 'login.html';  
}
else {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;

    if (Date.now() > exp) {
        alert('Sua sessão expirou. Faça login novamente.');
        localStorage.removeItem('jwt');
        window.location.href = 'login.html';
    } else {
        // Verifica a expiração a cada 5 segundos
        const checkExpiration = setInterval(() => {
            if (Date.now() > exp) {
                alert('Sua sessão expirou. Você será redirecionado para o login.');
                localStorage.removeItem('jwt');
                window.location.href = 'login.html';
                clearInterval(checkExpiration);
            }
        }, 5000); // Verifica a cada 5 segundos
    }
}

const apiUrl = 'http://localhost:8080/api/clientes'; // Substitua pela URL real da sua API
const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
};

// Listar Clientes
document.getElementById('listarClientes').addEventListener('click', function() {
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
            const clientesDiv = document.getElementById('clientes');
            clientesDiv.innerHTML = ''; // Limpa a lista antes de adicionar

            data.forEach(cliente => {
                const clienteItem = document.createElement('div');
                clienteItem.className = 'list-group-item list-group-item-action';
                clienteItem.innerHTML = `
                    <strong>Código:</strong> ${cliente.codigo}<br>
                    <strong>Loja:</strong> ${cliente.loja}<br>
                    <strong>Razão Social:</strong> ${cliente.razao}<br>
                    <strong>Tipo:</strong> ${cliente.tipo}<br>
                    <strong>Nome Fantasia:</strong> ${cliente.nomefantasia}<br>
                    <strong>Finalidade:</strong> ${cliente.finalidade}<br>
                    <strong>CNPJ:</strong> ${cliente.cnpj}<br>
                    <strong>CEP:</strong> ${cliente.cep}<br>
                    <strong>País:</strong> ${cliente.pais}<br>
                    <strong>Estado:</strong> ${cliente.estado}<br>
                    <strong>Código Município:</strong> ${cliente.codmunicipio}<br>
                    <strong>Cidade:</strong> ${cliente.cidade}<br>
                    <strong>Endereço:</strong> ${cliente.endereco}<br>
                    <strong>Bairro:</strong> ${cliente.bairro}<br>
                    <strong>DDD:</strong> ${cliente.ddd}<br>
                    <strong>Telefone:</strong> ${cliente.telefone}<br>
                    <strong>Abertura:</strong> ${cliente.abertura}<br>
                    <strong>Contato:</strong> ${cliente.contato}<br>
                    <strong>Email:</strong> ${cliente.email}<br>
                    <strong>Homepage:</strong> ${cliente.homepage}<br>
                `;
                clientesDiv.appendChild(clienteItem);
            });

            alert('Clientes listados com sucesso!');
        })
        .catch(error => console.error('Erro:', error));
});

// Adicionar Cliente
document.getElementById('formCliente').addEventListener('submit', function(event) {
event.preventDefault();

const codigo = document.getElementById('codigo').value;
const loja = document.getElementById('loja').value;
const razao = document.getElementById('razao').value;
const tipo = document.getElementById('tipo').value;
const nomefantasia = document.getElementById('nomefantasia').value;
const finalidade = document.getElementById('finalidade').value;
const cnpj = document.getElementById('cnpj').value;
const cep = document.getElementById('cep').value;
const pais = document.getElementById('pais').value;
const estado = document.getElementById('estado').value;
const codmunicipio = document.getElementById('codmunicipio').value;
const cidade = document.getElementById('cidade').value;
const endereco = document.getElementById('endereco').value;
const bairro = document.getElementById('bairro').value;
const ddd = document.getElementById('ddd').value;
const telefone = document.getElementById('telefone').value;
const abertura = document.getElementById('abertura').value;
const contato = document.getElementById('contato').value;
const email = document.getElementById('email').value;
const homepage = document.getElementById('homepage').value;

const novoCliente = {
    codigo: codigo,
    loja: loja,
    razao: razao,
    tipo: tipo,
    nomefantasia: nomefantasia,
    finalidade: finalidade,
    cnpj: cnpj,
    cep: cep,
    pais: pais,
    estado: estado,
    codmunicipio: codmunicipio,
    cidade: cidade,
    endereco: endereco,
    bairro: bairro,
    ddd: ddd,
    telefone: telefone,
    abertura: abertura,
    contato: contato,
    email: email,
    homepage: homepage
};

 // Confirmação antes de adicionar o cliente
 const confirmacao = confirm("Você tem certeza que deseja adicionar este cliente?");
 if (!confirmacao) {
   return; // Se o usuário clicar em Cancelar, a ação não é executada
}

fetch(`${apiUrl}/criarCliente`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(novoCliente)
})
.then(response => {
    if (response.ok) {
        alert('Cliente adicionado com sucesso!');
        document.getElementById('formCliente').reset();
    } else {
        alert('Erro ao adicionar cliente: ' + response.statusText);
    }
})
.catch(error => console.error('Erro:', error));
});

// Buscar Cliente
document.getElementById('buscarCliente').addEventListener('click', function () {
const codigo = document.getElementById('codigoBusca').value;

if (!codigo) {
alert("Digite um código para buscar.");
return;
}

fetch(`${apiUrl}/buscarCliente/${codigo}`, {
method: 'GET',
headers: headers
})
.then(response => {
    if (!response.ok) {
        alert('Cliente não encontrado!');
        throw new Error('Cliente não encontrado');
    }
    return response.json();
})
.then(cliente => {
    const clientesDiv = document.getElementById('clientes');
    clientesDiv.innerHTML = ''; // limpa resultados anteriores

    const clienteItem = document.createElement('div');
    clienteItem.className = 'list-group-item list-group-item-action';
    clienteItem.innerHTML = `
        <strong>Código:</strong> ${cliente.codigo}<br>
        <strong>Loja:</strong> ${cliente.loja}<br>
        <strong>Razão Social:</strong> ${cliente.razao}<br>
        <strong>Tipo:</strong> ${cliente.tipo}<br>
        <strong>Nome Fantasia:</strong> ${cliente.nomefantasia}<br>
        <strong>Finalidade:</strong> ${cliente.finalidade}<br>
        <strong>CNPJ:</strong> ${cliente.cnpj}<br>
        <strong>CEP:</strong> ${cliente.cep}<br>
        <strong>País:</strong> ${cliente.pais}<br>
        <strong>Estado:</strong> ${cliente.estado}<br>
        <strong>Código Município:</strong> ${cliente.codmunicipio}<br>
        <strong>Cidade:</strong> ${cliente.cidade}<br>
        <strong>Endereço:</strong> ${cliente.endereco}<br>
        <strong>Bairro:</strong> ${cliente.bairro}<br>
        <strong>DDD:</strong> ${cliente.ddd}<br>
        <strong>Telefone:</strong> ${cliente.telefone}<br>
        <strong>Abertura:</strong> ${cliente.abertura}<br>
        <strong>Contato:</strong> ${cliente.contato}<br>
        <strong>Email:</strong> ${cliente.email}<br>
        <strong>Homepage:</strong> ${cliente.homepage}<br>
    `;
    clientesDiv.appendChild(clienteItem);

    alert('Cliente buscado com sucesso!');
})
.catch(error => {
    console.error('Erro:', error);
    document.getElementById('clientes').innerHTML = '';
});
});

//Excluir Cliente
document.getElementById('excluirCliente').addEventListener('click', function () {
const codigo = document.getElementById('codigoExcluir').value;

if (!codigo) {
alert("Digite um código para excluir.");
return;
}

// Confirmação antes de excluir
const confirmacao = confirm("Você tem certeza que deseja excluir este cliente?");
if (!confirmacao) {
return; // Se o usuário clicar em Cancelar, a ação não é executada
}

fetch(`${apiUrl}/deletarCliente/${codigo}`, {
method: 'DELETE',
headers: headers
})
.then(response => {
    if (!response.ok) {
        alert('Cliente não encontrado!');
        throw new Error('Cliente não encontrado');
    }
    return response.text();
})
.then(mensagem => {
    alert(mensagem);
    document.getElementById('clientes').innerHTML = '';
})
.catch(error => console.error('Erro:', error));
});

//Atualizar Cliente