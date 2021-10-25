import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor( private router: Router, private http : HttpClient ) { }

  // token:string;
  // public loggedUser:string;
  // public isloggedIn: Boolean = false;
  // public roles: string [];

  // login(user : User){
  //   return this.http.post<User>(environment.api+'/api/login/', user, {observe: 'response'});
  // }

  // logout(){
  //   this.isloggedIn = false;
  //   this.loggedUser = undefined;
  //   this.roles = undefined;

  //   localStorage.removeItem('loggedUser');
  //   localStorage.setItem('isloggedIn', String(this.isloggedIn));
  //   this.router.navigate(['/login']);
  // }

  

  // chama server para gerar o token
  generateToken( credentials:any ){
    console.log( credentials );
    return this.http.post( `${environment.api}/api/login`, credentials );
  }

  // para logar usuario
  loginUser(token){
    localStorage.setItem("token", token);
    return true;
  }

  // checar se está logado ou não
  isLoggedIn(){
    let token = localStorage.getItem("token");

    if( token == undefined || token === '' || token == null ){
      return false;
    }else{
      return true;
    }
  }

  // para deslogar
  logout(){
    localStorage.removeItem('token')
    return true;
  }

  // para pegar o token
  getToken(){
    return localStorage.getItem("token");
  }

}
