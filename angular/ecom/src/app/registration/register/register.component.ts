import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import {
  FormControl,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
declare var $: any;
import { API_REGISTER } from "../../core/constants";
import { AuthenticationService } from "../../core/services";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;
  username = new FormControl("", [Validators.required, Validators.email]);
  password = new FormControl("", [Validators.required]);
  first_name = new FormControl("", [Validators.required]);
  last_name = new FormControl("", [Validators.required]);
  error_message: any = {
    messsage: null
  };

  constructor(
    private authentication: AuthenticationService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.registerFormGroup = this.fb.group({
      username: new FormControl("", [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      ]),
      password: new FormControl("", [Validators.required]),
      first_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      last_name: new FormControl("", [Validators.required])
    });
  }

  get rf() {
    return this.registerFormGroup.controls;
  }

  showNotification(from, align, msg, _type) {
    const type = ["", "info", "success", "warning", "danger"];

    var color = Math.floor(Math.random() * 4 + 1);
    $.notify(
      {
        icon: "pe-7s-gift",
        message: msg
      },
      {
        type: _type,
        timer: 1000,
        placement: {
          from: from,
          align: align
        }
      }
    );
  }

  register() {
    console.log(
      this.rf,
      this.rf.username.value &&
        this.rf.password.value &&
        this.rf.first_name.value &&
        this.rf.last_name.value
    );
    if (
      this.rf.username.value &&
      this.rf.password.value &&
      this.rf.first_name.value &&
      this.rf.last_name.value
    ) {
      console.log("in if");
      this.authentication
        .register(
          this.rf.username.value,
          this.rf.username.value,
          this.rf.password.value,
          this.rf.first_name.value,
          this.rf.last_name.value
        )
        .subscribe(
          data => {
            console.log(data, "============");
            if (data.status == 305) {
              this.showNotification("top", "center", data.message, "danger");
            } else if (data.status == 500) {
              this.showNotification("top", "center", data.message, "danger");
            } else {
              this.showNotification("top", "center", data.message, "success");
            }
            this.router.navigate(["/auth/login"]);
          },
          error => {
            this.error_message = error;
          }
        );
      // this.http
      //   .post<any>(API_REGISTER, {
      //     username: this.rf.username.value,
      //     password: this.rf.password.value,
      //     first_name: this.rf.first_name.value,
      //     last_name: this.rf.last_name.value
      //   })
      //   .map(data => {
      //     console.log(data, "============");
      //     if (data.status == 305) {
      //       this.showNotification("top", "center", data.message, "danger");
      //     }
      //   });
    } else {
      this.error_message = "please enter valid details";
    }
  }
}
