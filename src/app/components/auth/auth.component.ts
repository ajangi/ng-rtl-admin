import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  username: string = '';
  password: string = '';

  ngOnInit() {
    if(this.router.url == '/login' && this.authService.isLogedIn()){
      this.router.navigate(['dashboard'])
    }
  }
  public login(form: any) {
    let formValue : Object = form.value;
    this.authService.login(formValue)
  }
}
