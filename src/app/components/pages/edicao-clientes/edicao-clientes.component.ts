import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edicao-clientes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edicao-clientes.component.html',
  styleUrl: './edicao-clientes.component.css'
})
export class EdicaoClientesComponent {

  //atributos
  mensagem: string = '';
  id: string = '';

  //método construtor
  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ){}

  //função executada quando a página for aberta
  ngOnInit() {

    //capturando o id do cliente enviado na URL
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    //consultando o cliente na API através do ID
    this.httpClient.get('http://localhost:8081/api/clientes/' + this.id)
      .subscribe({
        next: (data) => {
          //preencher o formulário com os dados do cliente
          this.formulario.patchValue(data);
        }
      })
  }

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

  //função para atualizar os dados do cliente
  atualizarCliente() {

    //enviando uma requisição PUT para a API (atualizar o cliente)
    this.httpClient.put('http://localhost:8081/api/clientes/' + this.id, 
      this.formulario.value, //enviando os dados do formulário
      { responseType : 'text' } //api irá retornar resposta do tipo 'texto'
    ).subscribe({
      next: (data) => {
        //exibindo a mensagem obtida da API
        this.mensagem = data;
      }
    })
  }

}
