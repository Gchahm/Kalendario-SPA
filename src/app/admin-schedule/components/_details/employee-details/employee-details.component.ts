import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {BaseDetailsComponent} from '../BaseDetailsComponent';
import {Employee} from '../../../../core/models/Employee';
import {select} from '@angular-redux/store';
import {IAppState} from '../../../../Store';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {Schedule} from '../../../../core/models/Schedule';
import {IReadModel} from '../../../../core/models/interfaces/IReadModel';

@Component({
  selector: 'admin-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent extends BaseDetailsComponent<Employee> implements OnInit, OnDestroy {

  @Output() photoChange = new EventEmitter<ImageSnippet>();
  @select((s: IAppState) => s.admin.schedules) schedules: Observable<Schedule[]>;
  @select((s: IAppState) => s.admin.selectedModel) selectedModel: Observable<IReadModel>;
  schedule: Schedule;
  sub: Subscription;


  constructor() {
    super();
  }

  ngOnInit() {
    this.schedule = null;
    this.sub = combineLatest(
      this.schedules,
      this.selectedModel
    ).subscribe((value: [Schedule[], IReadModel]) => {
      this.schedule = value[0].find(m => this.model.schedule === m.id);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      const selectedFile = new ImageSnippet(event.target.result, file, this.model.id);
      this.photoChange.emit(selectedFile);
    });

    reader.readAsDataURL(file);
  }

  services() {
    return this.model.services.map(s => ({name: s.name, value: s.duration}));
  }
}

export class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File, public id: number) {
  }
}
