import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  autenticado: boolean = false;

  nomeUsuario: string = '';

  emailUsuario: string = '';

  perfilUsuario: string = '';

  ngOnInit() {

    var data = sessionStorage.getItem('usuario');
    if(data) {
      this.autenticado = true;

      var usuario = JSON.parse(data);

      this.nomeUsuario = usuario.nome;
      this.emailUsuario = usuario.email;
      this.perfilUsuario = usuario.perfil;

    }
  }

  logout() {
    if(confirm('Deseja realmente sair do sistema?')) {
      sessionStorage.removeItem('usuario');

      location.href = '/';
    }
  }
}
