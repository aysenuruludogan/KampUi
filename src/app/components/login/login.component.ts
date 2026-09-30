import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.CreateLoginForm();
  }

  CreateLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password:["", [Validators.required]]
    })
  }

  login() {
    console.log(this.loginForm.value);
    if(this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.info(response.message)
        localStorage.setItem("token", response.data.token);
        
      }, responseError => {
        console.log(responseError);
        this.toastrService.error(responseError.error);
      } )
    }
}
}