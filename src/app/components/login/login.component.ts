import { SigninDto } from './../../Interface/SigninDto';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent {
  email: string = ""
  password: string = ""
  remember: boolean = false

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}


  clear() {
    this.email = ""
    this.password = ""
  }

  handleSignIn() {
    //console.log({ email: this.email, password: this.password, remember: this.remember})
    const signinDto: SigninDto = {
      email: this.email,
      password: this.password,
      token: '',
      tokenExist: false
    }
    console.log(signinDto)
    this.authService.signIn(signinDto).subscribe(dto => {
      console.log(dto)
      if(dto.tokenExist) {
        //success
        this.router.navigate(['/openings'])
        console.log(dto)
      }
      else {
        //failed
        console.log("failed")
        this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Invalid Credentials', detail: 'Please provide all correct credentials.' });

      }
    })
  }
}
