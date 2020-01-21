import {Component, Input} from '@angular/core';
import {Service} from '../../../core/models/Service';
import {DetailsComponent} from '../../../core/generics/components/DetailsComponent';
import {EmployeeReadModel} from '../../../core/models/Employee';
import {MatDialog} from '@angular/material';
import {AdminEmployeeService} from '../../services/admin-employee.service';
import {ToastService} from '../../../shared/services/toast.service';
import {select} from '@angular-redux/store';
import {IAppState} from '../../../Store';

@Component({
  selector: 'employee-profile',
  templateUrl: './employee-panel.component.html',
  styleUrls: ['./employee-panel.component.css']
})
export class EmployeePanelComponent extends DetailsComponent<EmployeeReadModel> {

  @Input() services: Service[];
  @select((s: IAppState) => s.core.user) user$;

  constructor(public dialog: MatDialog,
              private employeeService: AdminEmployeeService,
              private toast: ToastService) {
    super();
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      const selectedFile = new ImageSnippet(event.target.result, file);

      this.employeeService.uploadProfilePicture(this.model.id.toString(), selectedFile.file)
        .toPromise()
        .then((res) => this.model.photoUrl = res.url)
        .catch((err) => this.toast.error(err));
    });

    reader.readAsDataURL(file);
  }

}

class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {
  }
}
