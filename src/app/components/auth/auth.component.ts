import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }
  username: string = '';
  password: string = '';

  ngOnInit() {
  }
  public login(form: any) {
    let formValue : Object = form.value;
    this.authService.login(formValue)
  }
}
