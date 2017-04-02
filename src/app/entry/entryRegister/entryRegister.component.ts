import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ContentfulService } from './../../services/contentful.service';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'hymn-entry-register',
  templateUrl: './entryRegister.html',
})

export class EntryRegisterComponent {
  content: JSON;
  user: any;

  constructor (private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
  }

  ngOnInit() {
    this.route.params.forEach(x => this.load(+x['user.id']));

    this.user = {
      is_admin: 0
    };
  }

  private load(id) {
    if (!id) {
      return;
    }

    var onload = (data) => {
      if (data) {
        this.user = data;
      } else {

      }
    };
  }

    register() {
      console.log(this.user);
      this.userService.register(this.user).then(() => {
        location.reload();
      });
    }
}
