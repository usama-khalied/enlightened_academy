import { Component, Input , HostListener  } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavbarComponent {
  @Input() obj: any;
  scrollY:boolean = false
  isMenuOpen = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {}

  onLogin() {
    this.router.navigateByUrl('/login');
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    const scrollY = window.scrollY;
    if (window.scrollY >= 80) {
      this.scrollY = true;
      // alert("scroll huwa hai");
  }
  else {
    this.scrollY = false;
    // alert("nh huwa hai");


  }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}