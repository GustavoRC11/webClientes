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

  mensagem: string = '';
  id: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.httpClient.get('http://localhost:8081/api/clientes/' + this.id)
      .subscribe({
        next: (data) => {
          this.formulario.patchValue(data);
        }
      })
  }

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(8)]),
    cpf: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefone: new FormControl('', [Validators.required, Validators.pattern(/^\d{11}$/)])
  });

  get f() {
    return this.formulario.controls;
  }

  atualizarCliente() {

    this.httpClient.put('http://localhost:8081/api/clientes/' + this.id,
      this.formulario.value,
      { responseType: 'text' }
    ).subscribe({
      next: (data) => {

        this.mensagem = data;
      }
    })


  }

}
