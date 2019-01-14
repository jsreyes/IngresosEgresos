import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router ) { }

  // Método para crear un usuario
  public crearUsuario(email: string, nombre: string, password: string) {
    // Método de autenticacion de firebase utiliza las promesas then y catch
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        console.log(resp);
        this.router.navigate(['/']);
      })
      .catch( error => {
        console.error( error );
        Swal('Error en el login', error.message, 'error');
      });
  }

  // Método para loguear un usuario
  public login( email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then( resp => {
        console.log(resp, ' esta logueado');
        this.router.navigate(['/']);
      })
      .catch( error => {
        console.error( error );
        Swal('Error en el login', error.message, 'error');
      });
  }

  // Método para desloguear el usuario
  public logout () {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }
}
