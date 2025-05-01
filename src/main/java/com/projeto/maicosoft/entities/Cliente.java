package com.projeto.maicosoft.entities;

import jakarta.persistence.*;

@Entity
@Table(name="CLIENTES")
public class Cliente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    @Column(nullable = false, length = 60)
    private String loja;

    @Column(nullable = false, length = 60)
    private String razao;

    @Column(nullable = false, length = 60)
    private String tipo;

    @Column(nullable = false, length = 60)
    private String nomefantasia;

    @Column(nullable = false, length = 60)
    private String finalidade;

    @Column(nullable = false, length = 60)
    private String cnpj;

    @Column(nullable = false, length = 60)
    private Long cep;

    @Column(nullable = false, length = 60)
    private Integer pais;

    @Column(nullable = false, length = 60)
    private String estado;

    @Column(nullable = false, length = 60)
    private Integer codmunicipio;

    @Column(nullable = false, length = 60)
    private String cidade;

    @Column(nullable = false, length = 60)
    private String endereco;

    @Column(nullable = false, length = 60)
    private String bairro;

    @Column(nullable = false, length = 60)
    private String ddd;

    @Column(nullable = false, length = 60)
    private Integer telefone;

    @Column(nullable = false, length = 60)
    private String abertura;

    @Column(nullable = false, length = 60)
    private String contato;

    @Column(nullable = false, length = 60)
    private String email;

    @Column(nullable = false, length = 60)
    private String homepage;

    public Cliente(){

    }

    public Cliente(Long codigo, String loja, String razao, String tipo, String nomefantasia, String finalidade, String cnpj, Long cep, int pais, String estado, int codmunicipio, String cidade, String endereco, String bairro, String ddd, int telefone, String abertura, String contato, String email, String homepage){
        this.codigo = codigo;
        this.loja = loja;
        this.razao = razao;
        this.tipo = tipo;
        this.nomefantasia = nomefantasia;
        this.finalidade = finalidade;
        this.cnpj = cnpj;
        this.cep = cep;
        this.pais = pais;
        this.estado = estado;
        this.codmunicipio = codmunicipio;
        this.cidade = cidade;
        this.endereco = endereco;
        this.bairro = bairro;
        this.ddd = ddd;
        this.telefone = telefone;
        this.abertura = abertura;
        this.contato = contato;
        this.email = email;
        this.homepage = homepage;
    }

    public Long getCodigo(){
        return codigo;
    }

    public void setCodigo(Long codigo){
        this.codigo = codigo;
    }

    public String getLoja(){
        return loja;
    }

    public void setLoja(String loja){
        this.loja = loja;
    }

    public String getRazao(){
        return razao;
    }

    public void setRazao(String razao){
        this.razao = razao;
    }

    public String getTipo(){
        return tipo;
    }

    public void setTipo(String tipo){
        this.tipo = tipo;
    }

    public String getNomefantasia(){
        return nomefantasia;
    }

    public void setNomefantasia(String nomefantasia){
        this.nomefantasia = nomefantasia;
    }

    public String getFinalidade(){
        return finalidade;
    }

    public void setFinalidade(String finalidade){
        this.finalidade = finalidade;
    }

    public String getCnpj(){
        return cnpj;
    }

    public void setCnpj(String cnpj){
        this.cnpj = cnpj;
    }

    public Long getCep(){
        return cep;
    }

    public void setCep(Long cep){
        this.cep = cep;
    }

    public int getPais(){
        return pais;
    }

    public void setPais(int pais){
        this.pais = pais;
    }

    public String getEstado(){
        return estado;
    }

    public void setEstado(String estado){
        this.estado = estado;
    }

    public int getCodmunicipio(){
        return codmunicipio;
    }

    public void setCodmunicipio(int codmunicipio){
        this.codmunicipio = codmunicipio;
    }

    public String getCidade(){
        return cidade;
    }

    public void setCidade(String cidade){
        this.cidade = cidade;
    }

    public String getEndereco(){
        return endereco;
    }

    public void setEndereco(String endereco){
        this.endereco = endereco;
    }

    public String getBairro(){
        return bairro;
    }

    public void setBairro(String bairro){
        this.bairro = bairro;
    }

    public String getDdd(){
        return ddd;
    }

    public void setDdd(String ddd){
        this.ddd = ddd;
    }

    public int getTelefone(){
        return telefone;
    }

    public void setTelefone(int telefone){
        this.telefone = telefone;
    }

    public String getAbertura(){
        return abertura;
    }

    public void setAbertura(String abertura){
        this.abertura = abertura;
    }

    public String getContato(){
        return contato;
    }

    public void setContato(String contato){
        this.contato = contato;
    }

    public String getEmail(){
        return email;
    }

    public void setEmail(String email){
        this.email = email;
    }

    public String getHomepage(){
        return homepage;
    }

    public void setHomepage(String homepage){
        this.homepage = homepage;
    }

}

