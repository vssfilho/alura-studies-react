import React, { Component } from 'react';
import $ from 'jquery';
import InputComponent from './componets/InputComponent';
import ValidateInputComponent from './componets/ValidateInputComponent';
import PubSub from 'pubsub-js';

class FormularioAutor  extends Component {

    constructor() {
        super();
        this.state = {
            nome: '',
            email: '',
            senha: ''
        }; 
        this.cadastrarAutor = this.cadastrarAutor.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setSenha = this.setSenha.bind(this);
    }

    setNome(event) {
        this.setState({nome: event.target.value});
    }
    
    setEmail(event) {
        this.setState({email: event.target.value});
    }
    
    setSenha(event) {
        this.setState({senha: event.target.value});
    }

    cadastrarAutor(event) {
        event.preventDefault();
        $.ajax({
            url:"http://cdc-react.herokuapp.com/api/autores",
            contentType: 'application/json',
            dataType:'json',
            type:'post',
            data: JSON.stringify({nome:this.state.nome, email: this.state.email, senha:this.state.senha}),
            success: function(data){
                PubSub.publish('atualiza-lista-autores', data);
                this.setState({nome: '', email: '', senha: ''});
            }.bind(this),
            error: function(data){
                if(data.status === 400) {
                    new ValidateInputComponent().publishErrors(data.responseJSON);
                }
            },
            beforeSend: function(){
                PubSub.publish("clear-errors",{});
            }
        });
    }
    
    render() {
        return(
            <div className="pure-form pure-form-aligned">
              <form className="pure-form pure-form-aligned" onSubmit={this.cadastrarAutor} >
                <InputComponent id="nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome} label="Nome" />
                <InputComponent id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="Email" />
                <InputComponent id="senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha} label="Senha" />
                <div className="pure-control-group">                                  
                    <label></label> 
                  < button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                </div>
              </form>             
            </div> 
        );
    }

}

class TabelaAutores extends Component {

    render() {
        return (
            <div>            
              <table className="pure-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>email</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.lista.map(function(autor){
                      return (
                        <tr key={autor.id}>
                          <td>{autor.nome}</td>
                          <td>{autor.email}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table> 
            </div> 
        );
    }

}

export default class AutorBox extends Component {

    constructor() {
        super();
        this.state = {lista : []};
    }

    componentDidMount() {

        $.ajax({
          url: "http://cdc-react.herokuapp.com/api/autores",
          dataType: 'json',
          success: function(data) {
            this.setState({lista:data});
          }.bind(this) 
        });

        PubSub.subscribe('atualiza-lista-autores', function(topico, data) {
            this.setState({lista:data});
        }.bind(this));      
         
    }

    render() {
        return(
            <div>
                <FormularioAutor/>
                <br />
                <TabelaAutores lista={this.state.lista}/>
                
            </div>
        );
    }

}

