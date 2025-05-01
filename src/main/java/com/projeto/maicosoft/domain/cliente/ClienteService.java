package com.projeto.maicosoft.domain.cliente;
import com.projeto.maicosoft.entities.Cliente;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> listarClientes(){
        return clienteRepository.findAll();
    }

    public Cliente criarCliente(Cliente cliente){
        cliente.setCodigo(null);
        Cliente clienteCriado = clienteRepository.save(cliente);
        return clienteCriado;
    }

    public boolean atualizarCliente(Long codigo, Cliente clienteAtualizado){
        Optional<Cliente> clienteOptional = buscarClientePorCodigo(codigo);
        if(clienteOptional.isPresent()){
            Cliente cliente = clienteOptional.get();
            cliente.setLoja(clienteAtualizado.getLoja());
            cliente.setRazao(clienteAtualizado.getRazao());
            cliente.setTipo(clienteAtualizado.getTipo());
            cliente.setNomefantasia(clienteAtualizado.getNomefantasia());
            cliente.setFinalidade(clienteAtualizado.getFinalidade());
            cliente.setCnpj(clienteAtualizado.getCnpj());
            cliente.setCep(clienteAtualizado.getCep());
            cliente.setPais(clienteAtualizado.getPais());
            cliente.setEstado(clienteAtualizado.getEstado());
            cliente.setCodmunicipio(clienteAtualizado.getCodmunicipio());
            cliente.setCidade(clienteAtualizado.getCidade());
            cliente.setEndereco(clienteAtualizado.getEndereco());
            cliente.setBairro(clienteAtualizado.getBairro());
            cliente.setDdd(clienteAtualizado.getDdd());
            cliente.setTelefone(clienteAtualizado.getTelefone());
            cliente.setAbertura(clienteAtualizado.getAbertura());
            cliente.setContato(clienteAtualizado.getContato());
            cliente.setEmail(clienteAtualizado.getEmail());
            cliente.setHomepage(clienteAtualizado.getHomepage());
            clienteRepository.save(cliente);
            return true;
        }
        return false;
    }

    public boolean deletarCliente(Long codigo){
        if(clienteRepository.existsById(codigo)){
            clienteRepository.deleteById(codigo);
            return true;
        }
        return false;
    }

    public Optional<Cliente> buscarClientePorCodigo(Long codigo){
        return clienteRepository.findById(codigo);
    }
}
