import { Component, OnInit, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../../services/user.service';
import { GlobalConstants } from '../../../shared/global-constants';
import { SnachbarService } from '../../../services/snachbar.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  oldPassword = true;
  newPassword = true;
  confirmPassword = true;
  changePasswordForm: any = FormGroup;
  responseMessage: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private ngxService: NgxUiLoaderService,
    private snachbarService: SnachbarService
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  validateSubmit() {
    if (this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value) {
      return true;
    }
    else
      return false;
  }

  handleDepartmentSubmit() {
    this.ngxService.start();
    var formData = this.changePasswordForm.value;
    var data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword
    }
    this.userService.changePassword(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snachbarService.openSnackBar(this.responseMessage, "Success");
    }, (error) => {
      console.log(error);
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snachbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }
}
