import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Mock } from '../models/mock.model';
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

  @ViewChild('headerAccordionItem') headerAccordion: any;
  
  methods = methods;
  contentTypes = contentTypes;


  unsubscribeAll$: Subject<void>;

  constructor(private mockService: MockService, private fb: FormBuilder) {
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

  onAddHeader() {
    this.headerAccordion.toggle();
    (this.mockForm?.get('headers') as FormArray).push(
      this.fb.group({
        key: ['', Validators.required],
        value: ['', Validators.required]
      })
    );
  }

  onSave() {
    if(this.mockForm.valid){
      this.mockService.createMock(this.mockForm?.value as Mock);
    }
  }

  onCancel() {
    this.mockForm?.reset();
  }

  onRemoveHeader(index: number) {
    this.mockHeaderFormGroups.controls.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next();
    this.unsubscribeAll$.complete();
  }

}
