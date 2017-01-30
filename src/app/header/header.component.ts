import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import {UserService} from './../services/user.service';

@Component({
  selector: 'hymn-header',
  templateUrl: './header.html'
})
export class HeaderComponent implements OnInit {
  display: Boolean;
  constructor(private userservice: UserService,
    private router: Router) {}

  ngOnInit() {
    this.display = this.userservice.canActivate();
    console.log(this.display);
  }

  logout() {
    this.userservice.logout();
    this.router.navigate(['/']);
  }
}
