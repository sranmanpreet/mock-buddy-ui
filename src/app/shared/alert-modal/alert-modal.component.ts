import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'mock-buddy-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit {
  @Input() title: string = "Are you sure?";
  @Input() description: string = "Your action will discard unsaved changes. Do you still want to proceed?";
  @Input() trueButtonLabel: string = "Yes";
  @Input() falseButtonLabel: string = "No";

  constructor(protected dialogRef: NbDialogRef<boolean>) { }

  ngOnInit(): void {
    console.log("I am here");
  }

  onClose(flag: boolean) {
    this.dialogRef.close(flag);
  }

}
