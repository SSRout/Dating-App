import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { AuthService } from './../_serviceces/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AlertifyService } from '../_serviceces/alertify.service';
import {Router} from '@angular/router';
import {
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../_models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  constructor(
    private authService: AuthService,
    private alertifyService: AlertifyService,
    private fb: FormBuilder,
    private router:Router
  ) {}

  ngOnInit() {
    (this.bsConfig = {
      containerClass: 'theme-red',
    }),
      this.craeteRegisterForm();
  }

  craeteRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        username: ['', Validators.required],
        knownAs: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(8),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordCompaire }
    );
  }

  passwordCompaire(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.alertifyService.success('Register success!!');
        },
        (error) => {
          this.alertifyService.error(error);
        },()=>{
          this.authService.login(this.user).subscribe(()=>{
            this.router.navigate(['/members']);
          });
        });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertifyService.message('Registration Canceled');
  }
}
