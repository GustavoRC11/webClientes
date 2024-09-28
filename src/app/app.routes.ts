import { Routes } from '@angular/router';
import { CadastroClientesComponent } from './components/pages/cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './components/pages/consulta-clientes/consulta-clientes.component';
import { EdicaoClientesComponent } from './components/pages/edicao-clientes/edicao-clientes.component';

export const routes: Routes = [
    {
        path: 'pages/clientes/cadastro',
        component: CadastroClientesComponent
    },
    {
        path: 'pages/clientes/consulta',
        component: ConsultaClientesComponent
    },
    {
        path: 'pages/clientes/edicao',
        component: EdicaoClientesComponent
    },
    {
        path: '', pathMatch: 'full',
        redirectTo:'/pages/clientes/consulta'
    }

];
