import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userFormGroup! : FormGroup;
  constructor( private fb : FormBuilder) { }

  ngOnInit(): void {

    this.userFormGroup = this.fb.group({
      username : this.fb.control(""),
      password : this.fb.control("")
    })
  }

}
