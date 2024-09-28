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

  constructor(

    private httpClient : HttpClient

  ) {}

  formulario = new FormGroup({
    nome : new FormControl('',[Validators.required]),
    cpf : new FormControl('',[Validators.required] ),
    email : new FormControl('',[Validators.required]),
    telefone : new FormControl('',[Validators.required])
  });

  cadastrarCliente() {
    this.httpClient.post('http://localhost:8081/api/clientes', this.formulario.value, 
      {responseType : 'text'})
      .subscribe({
      next: (data) => {
        console.log(data);
      }
    })


  }

}
