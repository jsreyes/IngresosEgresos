import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore ) { }

  public initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {

      console.log(fbUser);

    });
  }

  // Método para crear un usuario
  public crearUsuario(email: string, nombre: string, password: string) {
    // Método de autenticacion de firebase utiliza las promesas then y catch
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(resp => {
        // Graba la info en un modelo de tipo usuario
        const user: User = {
          uid: resp.user.uid,
          nombre: nombre,
          email: resp.user.email
        };

        // Para grabar en la BD
        this.afDB.doc(`${ user.uid }/usuario`)
            .set( user )
            .then(() => {
              this.router.navigate(['/']);
            });
        // console.log(resp);
        this.router.navigate(['/']);
      })
      .catch( error => {
        // console.error( error );
        Swal('Error en el login', error.message, 'error');
      });
  }

  // Método para loguear un usuario
  public login( email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then( resp => {
        // console.log(resp, ' esta logueado');
        this.router.navigate(['/']);
      })
      .catch( error => {
        // console.error( error );
        Swal('Error en el login', error.message, 'error');
      });
  }

  // Método para desloguear el usuario
  public logout () {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  // Método para saber si esta autenticado
  public isAuth() {
    return this.afAuth.authState // observable
      .pipe(
        map( fbUser => {
          if (fbUser === null ) {
            this.router.navigate(['/login']);
          }
          return fbUser != null;
        }) // retorna true o false despues de procesar la respuesta
      );
  }
}
