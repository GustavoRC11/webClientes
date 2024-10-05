import { Routes } from '@angular/router';
import { CadastroClientesComponent } from './components/pages/cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './components/pages/consulta-clientes/consulta-clientes.component';
import { EdicaoClientesComponent } from './components/pages/edicao-clientes/edicao-clientes.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';

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
        path: 'pages/clientes/edicao/:id',
        component: EdicaoClientesComponent
    },
    {
        path :'pages/clientes/dashboard',
        component: DashboardComponent
    },
    {   
        path: '', pathMatch: 'full',
        redirectTo:'/pages/clientes/consulta'
    }

];
