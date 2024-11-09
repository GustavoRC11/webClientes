import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-consulta-clientes',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NgxPaginationModule
  ],
  templateUrl: './consulta-clientes.component.html',
  styleUrl: './consulta-clientes.component.css'
})
export class ConsultaClientesComponent {

  //atributos
  clientes: any[] = []; //array de objetos vazio
  mensagem: string = ''; //variável para exibir a resposta
  paginador: number = 1; //variável para marcar a página que estamos acessando

  //método construtor
  constructor(
    //declarando e já inicializando a classe HttpClient
    private httpClient: HttpClient
  ) {}

  //função executada quando o componente é carregado
  ngOnInit() {
    
    //fazendo uma requisição para o serviço de consulta de clientes da API
    this.httpClient
      .get('http://localhost:8081/api/clientes')
      .subscribe({ //aguardando a API retornar uma resposta
        next: (data) => { //capturando os dados retornados pela API
          //data: nome de variável que está capturando o retorno da API
          //armazenando os dados obtidos no atributo da classe do componente
          this.clientes = data as any[];
        }
      });
  }

  //função para excluir um cliente selecionado na página
  excluirCliente(id: string) {

    if(confirm('Deseja realmente excluir o cliente selecionado?')) {

      this.httpClient.delete('http://localhost:8081/api/clientes/' + id, 
        { responseType: 'text' }
      ).subscribe({
        next: (data) => {
          //armazenando a mensagem
          this.mensagem = data;
          //executar a consulta novamente
          this.ngOnInit();
        }
      });
    }
  }

  //função para fazer o recurso de 
  //'avançar' e 'voltar' do paginador 
  handlePageChange(event: any) {
    this.paginador = event;
  }

}
