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


  clientes: any[] = [];
  mensagem: string = '';
  paginador: number = 1;

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {



    this.httpClient
      .get('http://localhost:8081/api/clientes')
      .subscribe({
        next: (data) => {
          this.clientes = data as any[];
        }

      });

  }

  excluirCliente (id: string) {

    if (confirm('Deseja realmente excluir o cliente selecionado?')) {

      this.httpClient.delete('http://localhost:8081/api/clientes/' + id,
      { responseType: 'text' }
     ).subscribe({
      next: (data) => {

        this.mensagem = data;

        this.ngOnInit();

      }
     })

    }

  }

  handlePageChange(event: any) {

    this.paginador = event;

  }

}
