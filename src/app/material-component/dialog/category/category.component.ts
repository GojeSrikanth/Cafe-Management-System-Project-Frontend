import { Component, OnInit, EventEmitter, Inject, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnachbarService } from 'src/app/services/snachbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";

  responseMessage: any;
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    public dialogRef: MatDialogRef<CategoryComponent>,
    private snachbarService: SnachbarService
  ) { }

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required]]
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction == "Edit") {
      this.edit();
    }
    else {
      this.add();
    }
  }

  add() {
    var formData = this.categoryForm.value;
    var data = {
      name: formData.name
    }
    this.categoryService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddProduct.emit();
      this.responseMessage = response.message;
      this.snachbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.dialogRef.close();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else
        this.responseMessage = GlobalConstants.genericError;
      this.snachbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

  edit() {
    var formData = this.categoryForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      price: formData.price,
      description: formData.description
    }
    this.categoryService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditProduct.emit();
      this.responseMessage = response.message;
      this.snachbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.dialogRef.close();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else
        this.responseMessage = GlobalConstants.genericError;
      this.snachbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }
}
