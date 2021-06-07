import { Component, OnInit } from "@angular/core";
import { ErrorMessage } from "ng-bootstrap-form-validation";
import { Router } from "@angular/router";

import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { AuthenticationService } from "../../core/services";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  username = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required]);
  error_message: any = {
    messsage: null
  };

  constructor(
    private authentication: AuthenticationService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  customErrorMessages: ErrorMessage[] = [
    {
      error: "required",
      format: (label, error) => `${label.toUpperCase()} IS DEFINITELY REQUIRED!`
    },
    {
      error: "pattern",
      format: (label, error) => `${label.toUpperCase()} DOESN'T LOOK RIGHT...`
    }
  ];

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      username: new FormControl("", [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ])
    });
  }

  onSubmit() {
    console.log(this.loginFormGroup);
  }

  get lf() {
    return this.loginFormGroup.controls;
  }

  onReset() {
    this.loginFormGroup.reset();
  }

  getUsernameErrorMessage() {
    return this.username.hasError("required")
      ? "Please Enter username"
      : this.username.hasError("email")
      ? "Not a valid username"
      : "";
  }

  getPasswordErrorMessage() {
    return this.username.hasError("required") ? "Please Enter password" : "";
  }

  login() {
    if (this.lf.username.value && this.lf.password.value) {
      this.authentication
        .login(this.lf.username.value, this.lf.password.value)
        .subscribe(
          data => {
            console.log(data);
            this.router.navigate(["/"]);
          },
          error => {
            this.error_message = error;
          }
        );
    } else {
      this.error_message = "please enter valid details";
    }
  }
}
