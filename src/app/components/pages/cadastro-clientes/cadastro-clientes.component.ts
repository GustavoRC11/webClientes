import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cadastro-clientes.component.html',
  styleUrl: './cadastro-clientes.component.css'
})
export class CadastroClientesComponent {

  //atributos
  mensagem: string = '';

  //método construtor
  constructor(
    //declarando e já inicializando a classe HttpClient
    private httpClient: HttpClient
  ){}

  //criando o objeto para capturar o formulário
  //os campos já devem ter o mesmo nome da API
  formulario = new FormGroup({ //conjunto do formulário
    nome : new FormControl('', [Validators.required, Validators.minLength(8)]), //campo 'nome'
    cpf : new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]), //campo 'cpf'
    email : new FormControl('', [Validators.required, Validators.email]), //campo 'email'
    telefone : new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]) //campo 'telefone'
  });

  //criando um objeto para que possamos exibir na página
  //as mensagens de validação para cada campo do formulário
  get f() {
    return this.formulario.controls;
  }

  //função executada quando o usuário clicar
  //no botão SUBMIT do formulário
  cadastrarCliente() {
    
      //fazendo uma requisição POST para o serviço de cadastro da API
      this.httpClient
        .post('http://localhost:8081/api/clientes', this.formulario.value, 
          { responseType: 'text' })
          .subscribe({ //aguardando a resposta da API
            next: (data) => { //capturando o conteudo devolvido pelo serviço
              
              //capturando o retorno obtido da API
              this.mensagem = data;

              if(data.includes('sucesso')) {
                  //limpar os campos do formulário
                  this.formulario.reset();
              }
            }
          });        
  }

}
