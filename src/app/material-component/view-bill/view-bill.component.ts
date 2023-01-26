import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { BillService } from 'src/app/services/bill.service';
import { ProductService } from 'src/app/services/product.service';
import { SnachbarService } from 'src/app/services/snachbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ProductComponent } from '../dialog/product/product.component';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss']
})
export class ViewBillComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total', 'view'];
  dataSource: any;
  responseMessage: any;
  constructor(private productService: ProductService,
    private billService: BillService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snachbarService: SnachbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.billService.getBills().subscribe((response: any) => {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snachbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    };
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddProduct.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: values
    };
    dialogConfig.width = "100%";
    const dialogRef = this.dialog.open(ViewBillProductsComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }

  handleDeleteAction(value: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete ' + value.name + ' bill',
      confirmation: true
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user) => {
      this.ngxService.start();
      this.deleteProduct(value.id);
      dialogRef.close();
    });
  }

  deleteProduct(id: any) {
    this.billService.delete(id).subscribe((response: any) => {
      this.ngxService.stop();
      this.tableData();
      this.responseMessage = response?.message;
      this.snachbarService.openSnackBar(this.responseMessage, "Close");
    }, (error) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snachbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }

  downloadReportAction(value: any) {
    this.ngxService.start();
    var data = {
      name: value.name,
      email: value.email,
      uuid: value.uuid,
      contactNumber: value.contactNumber,
      paymentMethod: value.paymentMethod,
      totalAmount: value.total.toString(),
      productDetails: value.productDetail
    }
    this.downloadFile(value.uuid, data);
  }

  public downloadFile(fileName: string, data: any) {
    this.productService.getPDF(data).subscribe(
      (res) => {
        saveAs(res, fileName + '.pdf');
        this.ngxService.stop();
      }
    );
  }

  // public showPDF(fileName: string,data:any): void {
  //   this.productService.getPDF(fileName,data)
  //       .subscribe(x => {
  //         this.ngxService.stop();
  //           // It is necessary to create a new blob object with mime-type explicitly set
  //           // otherwise only Chrome works like it should
  //           var newBlob = new Blob([x], { type: "application/pdf" });

  //           // IE doesn't allow using a blob object directly as link href
  //           // instead it is necessary to use msSaveOrOpenBlob
  //           if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //               window.navigator.msSaveOrOpenBlob(newBlob, fileName);
  //               return;
  //           }

  //           // For other browsers: 
  //           // Create a link pointing to the ObjectURL containing the blob.
  //           const data = window.URL.createObjectURL(newBlob);

  //           var link = document.createElement('a');
  //           link.href = data;
  //           link.download = fileName;
  //           // this is necessary as link.click() does not work on the latest firefox
  //           link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

  //           setTimeout(function () {
  //               // For Firefox it is necessary to delay revoking the ObjectURL
  //               window.URL.revokeObjectURL(data);
  //               link.remove();
  //           }, 100);
  //       });
  // }
}
