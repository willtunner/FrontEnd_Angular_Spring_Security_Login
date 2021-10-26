import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //extrutura do formulario
  credentials = {
    username: '',
    password: ''
  };

  constructor(
    private loginService: AuthServiceService,
    private router: Router ) { }

    ngOnInit() {}

  async onSubmit() {

    // console.log('teste')
    if( this.credentials.username !='' && this.credentials.password !='') {

      // Pega o token
      this.loginService.generateToken(this.credentials).subscribe(
        ( response: any ) => {
          console.log(response.access_token);

          // Passa o tokem para serviço
          this.loginService.loginUser(response.access_token);
          window.location.href="";
          //this.router.navigate(['']);
        },
        error => {
          console.log(error);
        }
      )
    }

    //* teste direto tokken
    // try {
    //   const result = await this.accountService.login(this.credentials);
    //   console.log(this.credentials)
    //   console.log(`Login efetuado: ${result}`);
    //   this.router.navigate(['']);
    // } catch (error) {
    //   console.error(error);
    // }

  }

}
