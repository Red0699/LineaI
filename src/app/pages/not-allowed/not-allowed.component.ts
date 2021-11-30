import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../_service/login.service';

@Component({
  selector: 'app-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.css']
})
export class NotAllowedComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.toolBarReactiva.next(true);
  }

}
