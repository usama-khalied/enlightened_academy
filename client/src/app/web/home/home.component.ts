import { Component, OnInit,AfterViewInit } from '@angular/core';
// import {
//   SocialAuthService,
//   GoogleLoginProvider,
//   SocialUser,
// } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit,AfterViewInit {
  // socialUser!: SocialUser;

  constructor(
    // private socialAuthService: SocialAuthService
    ) {}

  ngOnInit() {

    // this.socialAuthService.authState.subscribe((user) => {
    //   this.socialUser = user;
    //   console.log(this.socialUser)
    // });    
  }
  // loginWithGoogle(): void {
  //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
  ngAfterViewInit(): void {

  }
}
