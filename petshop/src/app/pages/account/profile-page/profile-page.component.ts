import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  public form: FormGroup;
  public busy: boolean;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required
      ])],
      document: [{ value: '', disable: true }],
      email: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(100),
        Validators.required,
        CustomValidator.EmailValidator
      ])]
    })
  }

  ngOnInit() {
    this.busy = true;
    this.dataService
      .getProfile()
      .subscribe((data: any) => {
        this.busy = false;
        this.form.controls['name'].setValue(data.name);
        this.form.controls['email'].setValue(data.email);
        this.form.controls['document'].setValue(data.document);
      },
        (err) => {
          console.log(err);
          this.busy = false;
        })
  }

  submit() {
    this.busy = true;
    this.dataService
      .updateProfile(this.form.value)
      .subscribe((data: any) => {
        this.busy = false;
        this.toastr.success(data.message, 'Dados Atualizado com Sucesso');
      },
        (err) => {
          console.log(err);
          this.busy = false;
        })

  }

}
