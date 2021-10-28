import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToHome(){
      this.router.navigate(['/']);
   
  }

}
