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
  @Input() selectedMock!: Mock;
  @Input() mockForm!: FormGroup;
  
  methods = methods;
  contentTypes = contentTypes;


  unsubscribeAll$: Subject<void>;

  constructor(private mockService: MockService) {
    this.unsubscribeAll$ = new Subject<void>();
  }

  ngOnInit(): void {
    this.mockDetailsSubscriber
      .pipe(takeUntil(this.unsubscribeAll$))
      .subscribe(
        (data) => {
          this.selectedMock = data;
        }
      );
  }

  get mockHeaderFormGroups() {
    return this.mockForm?.get('headers') as FormArray;
  }

  onAddHeader(event: Event) {
    //this.mockForm.controls?.push({ key: "", value: "" });
  }

  onSave() {
    console.log(this.mockForm);
    this.mockService.createMock(this.mockForm?.value as Mock);
  }

  onCancel() {
    this.mockForm?.reset();
  }

  onRemoveHeader(index: number) {
    this.selectedMock.headers.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

}
