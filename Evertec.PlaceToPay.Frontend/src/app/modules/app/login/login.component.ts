import { UserService } from './../../administraciones/user/services/user.service';
import { Login } from './../../administraciones/user/services/user.object';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: Login = {};

  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly recaptchaV3Service: ReCaptchaV3Service,
    private readonly localStorageServ: LocalStorageService
  ) {}

  ngOnInit() {
    this.localStorageServ.clear();
  }

  inicarSession() {
    this.recaptchaV3Service.execute('inicarSession').subscribe((token) => {
      this.userService
        .postMethodExterno('Account', 'Login', this.login)
        .subscribe((res: any) => {
          this.localStorageServ.set('user', JSON.stringify(res));
          this.router.navigate(['/']);
        });
    });
  }
}
