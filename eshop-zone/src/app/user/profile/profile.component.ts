import { Component, OnInit } from '@angular/core';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private navBarService:NavBarService) { }

  ngOnInit(): void {
    this.navBarService.displayNav();
  }

}
