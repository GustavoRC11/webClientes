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

  mensagem: string = '';

  constructor(

    private httpClient: HttpClient

  ) { }

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)])
  });

  get f() {
    return this.formulario.controls;
  }

  cadastrarCliente() {
    this.httpClient.post('http://localhost:8081/api/clientes', this.formulario.value,
      { responseType: 'text' })
      .subscribe({
        next: (data) => {

          
          this.mensagem = data;
         

          if (data.includes('sucesso')) {
            //limpar os campos do formulário
            this.formulario.reset();
          }
        }
      });
  }


}
