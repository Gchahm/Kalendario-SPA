import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import {Customer} from '../../../../core/models/Customer';
import {fromEvent, merge, of} from 'rxjs';
import {MatDialog, MatDialogRef, MatPaginator, MatSort} from '@angular/material';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {ToastService} from '../../../../shared/services/toast.service';
import {CreateCustomerDialogComponent} from '../create-customer/create-customer-dialog.component';
import {ModelEvent} from '../../../events/ModelEvent';
import {ListResult} from '../../../../core/generics/services/AdminModelService';

@Component({
  selector: 'admin-customer-list-dialog',
  templateUrl: './customer-list-dialog.component.html',
  styleUrls: ['./customer-list-dialog.component.css']
})
export class CustomerListDialogComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'phone'];
  data: Customer[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  errorOccurred = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customerService: CustomerService,
              private toast: ToastService,
              private dialog: MatDialog,
              public dialogRef: MatDialogRef<CustomerListDialogComponent>) {
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 1);

    const searchBox = document.getElementById('search') as HTMLInputElement;

    merge(fromEvent(searchBox, 'keyup'), this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const page = (this.paginator.pageIndex + 1).toString();
          const pageSize = this.paginator.pageSize.toString();
          return this.customerService.get({search: searchBox.value, page, page_size: pageSize});
        }),
        map((data: ListResult<Customer>) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.errorOccurred = false;
          this.resultsLength = data.count;

          return data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // show error message if error occurs
          this.errorOccurred = true;
          return of({results: []});
        })
      ).subscribe(data => this.data = data.results);
  }

  openCreateForm() {
    const dialogRef = this.dialog.open(CreateCustomerDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().toPromise()
      .then((createModel: ModelEvent) => {
      if (createModel) {
        this.customerService.post(createModel.model).toPromise()
          .then(customer => {
            this.data = [customer].concat(this.data);
          });
      }
    });
  }

  onRowClick(row) {
    this.dialogRef.close(row);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}

