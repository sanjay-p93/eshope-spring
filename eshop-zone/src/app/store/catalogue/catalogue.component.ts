import { Component, OnInit } from '@angular/core';
import { CatalogueService } from 'src/app/catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {

  constructor(private catalogueService: CatalogueService) { }

  ngOnInit(): void {
  }

}
