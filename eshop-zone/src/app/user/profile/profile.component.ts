import { Component, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { NavBarService } from 'src/app/services/nav-bar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private navBarService:NavBarService,
    private localstorageService:LocalstorageService
  ) { }
  isAdmin:boolean=false;

  ngOnInit(): void {
    this.navBarService.displayNav();
    if(this.localstorageService.getRole()=="ADMIN"){
      this.isAdmin=true;
    }
  }

}
