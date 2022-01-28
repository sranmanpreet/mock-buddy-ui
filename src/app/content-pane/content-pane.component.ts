import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Mock, MockHeader } from '../models/mock.model';
import { MockService } from '../services/mock.service';
import { contentTypes } from '../shared/content-types';
import { methods } from '../shared/methods';

@Component({
  selector: 'mock-buddy-content-pane',
  templateUrl: './content-pane.component.html',
  styleUrls: ['./content-pane.component.scss']
})
export class ContentPaneComponent implements OnInit, OnDestroy {
  @Input() mockDetailsSubscriber!: Subject<Mock>;
  mock!: Mock;
  methods = methods;
  contentTypes = contentTypes;

  mockForm!: FormGroup;

  unsubscribeAll$: Subject<void>;

  constructor(private mockService: MockService) {
    this.unsubscribeAll$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.getAfreshData();
    this.mockDetailsSubscriber
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(
        (data) => {
          this.mock = data;
          this.mockForm = this.getInitializedMockForm();
        }
      );
    this.mockForm.valueChanges
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(() => {
        console.log(this.mockForm);
        this.mockService.setUnsavedMockExist(!this.mockForm.pristine);
      });
  }

  getAfreshData() {
    const mocks = this.mockService.getMocks();
    this.mock = mocks[0];
    this.mockForm = this.getInitializedMockForm();
  }

  getInitializedMockForm() {
    if (!this.mock) {
      return this.getBlankForm();
    }
    return new FormGroup({
      name: new FormControl(this.mock.name),
      route: new FormControl(this.mock.route),
      status: new FormControl(this.mock.status),
      bodyType: new FormControl(this.mock.bodyType),
      body: new FormControl(this.mock.body),
      method: new FormControl(this.mock.method),
      contentType: new FormControl(this.mock.contentType),
      headers: new FormArray(this.getHeaderFormGroups(this.mock.headers))
    });
  }

  getBlankForm() {
    return new FormGroup({
      name: new FormControl(''),
      route: new FormControl(''),
      status: new FormControl(''),
      bodyType: new FormControl(''),
      body: new FormControl(''),
      method: new FormControl(''),
      contentType: new FormControl(''),
      headers: new FormArray(this.getHeaderFormGroups([]))
    });
  }

  getHeaderFormGroups(headers: Array<MockHeader>): Array<FormGroup> {
    let headersFormGroups: Array<FormGroup> = [];
    if (headers && headers.length) {
      headers.forEach(header => headersFormGroups.push(this.addHeaderFormGroup(header)));
    } else {
      headersFormGroups.push(this.addHeaderFormGroup({ key: '', value: '' } as MockHeader));
    }
    return headersFormGroups;
  }

  addHeaderFormGroup(header: MockHeader): FormGroup {
    let headersFormArray = this.mockHeaderFormGroups;
    if (!headersFormArray || headersFormArray == undefined) {
      headersFormArray = new FormArray([]);
    }
    if (!header) {
      header = { key: '', value: '' } as MockHeader;
    }
    let headerFormGroup = new FormGroup({ key: new FormControl(header.key), value: new FormControl(header.value) });
    headersFormArray.push(headerFormGroup);
    return headerFormGroup;
  }

  get mockHeaderFormGroups() {
    return this.mockForm?.get('headers') as FormArray;
  }

  onAddHeader(event: Event) {
    this.mock.headers?.push({ key: "", value: "" });
    this.mockForm = this.getInitializedMockForm();
  }

  onSave() {
    console.log(this.mockForm);
    this.mockService.createMock(this.mockForm?.value as Mock);
    this.getAfreshData();
  }

  onCancel() {
    this.mockForm?.reset();
  }

  onRemoveHeader(index: number) {
    this.mock.headers.splice(index, 1);
    this.mockForm = this.getInitializedMockForm();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

}
