import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Mock, MockHeader } from '../models/mock.model';
import { MockService } from '../services/mock.service';

@Component({
  selector: 'mock-buddy-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  mockDetailsSubject: Subject<Mock> = new Subject<Mock>();
  mockForm!: FormGroup;
  selectedMock!: Mock;
  mocks: Array<Mock> = [];

  constructor(private fb: FormBuilder, private mockService: MockService) { }

  ngOnInit(): void {
    this.mocks = this.mockService.getMocks();
    this.selectedMock = this.mocks[0];
    this.initializeMockForm();
  }

  initializeMockForm() {
    this.mockForm = this.fb.group({
      name: [this.selectedMock ? this.selectedMock.name : '', [Validators.required, Validators.minLength(3)]],
      route: [this.selectedMock ? this.selectedMock.route : '', [Validators.required]],
      status: [this.selectedMock ? this.selectedMock.status : '', [Validators.required]],
      bodyType: [this.selectedMock ? this.selectedMock.bodyType : '', [Validators.required]],
      body: [this.selectedMock ? this.selectedMock.body : ''],
      method: [this.selectedMock ? this.selectedMock.method : '', [Validators.required]],
      contentType: [this.selectedMock ? this.selectedMock.contentType : '', [Validators.required]],
      headers: this.fb.array(this.createHeaderFormGroups(this.selectedMock ? this.selectedMock.headers : []))
    });
  }

  private createHeaderFormGroups(headers: Array<MockHeader>): Array<FormGroup> {
    let headersFormGroups: Array<FormGroup> = [];
    headers?.forEach(header => headersFormGroups.push(
      this.fb.group(
        {
          key: [header.key, Validators.required],
          value: [header.value, Validators.required]
        }
      )
    )
    );
    return headersFormGroups;
  }

  setMockDetails(mock: Mock) {
    this.selectedMock = mock;
    this.initializeMockForm();
    this.mockDetailsSubject.next(this.selectedMock);
  }

}
