import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthGuardService } from './auth/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  {
    path: '',
    component: DashboardComponent,
    // Children es para ponerle las rutas hijas a la ruta, es un arreglo de rutas
    children: dashboardRoutes,
    canActivate: [ AuthGuardService ]
  },
  { path: '**', redirectTo: ''} // Significa que cualquier otro path va a redireccionar al dashboard
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes ) // Archivo de las rutas principales
  ],
  exports: [
    RouterModule // Para poder utilizar las rutas en otros lados
  ]
})


export class AppRoutingModule {}
