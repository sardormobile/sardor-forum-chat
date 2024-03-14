import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar-pages',
  templateUrl: './navbar-pages.component.html',
  styleUrl: './navbar-pages.component.css'
})
export class NavbarPagesComponent {

constructor(
  private activeRouter: ActivatedRoute
) {}

pageNumber: any = {};

ngOnInit() {
  this.pageNumber = this.activeRouter.snapshot.params['pageArg'];
}

}
