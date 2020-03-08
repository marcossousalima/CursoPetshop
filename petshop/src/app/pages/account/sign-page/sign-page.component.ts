import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-sign-page',
  templateUrl: './sign-page.component.html',
  styleUrls: ['./sign-page.component.css']
})
export class SignPageComponent implements OnInit {
  public form: FormGroup;
  public busy: boolean;
  constructor(
    private router: Router,
    private service: DataService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required
      ])],
      document: ['', Validators.compose([
        Validators.minLength(12),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])],
      email: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required,
        CustomValidator.EmailValidator
      ])],
      password: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit() {
  }

  submit() {
    this.busy = true;
    this.service
      .create(this.form.value)
      .subscribe((data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Bem vindo');
        this.router.navigate(['/login']);
      },
        (err) => {
          console.log(err);
          this.busy = false;
        })
  }

}
