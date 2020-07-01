import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../person'
import { PersonService } from '../person.service';

export interface DialogData {
  name: string;
  title: string;
}

@Component({
  selector: 'app-add-aperson-dialog',
  templateUrl: './add-aperson-dialog.component.html'
})
export class AddAPersonDialogComponent implements OnInit {
	
	name: string;
  title: string;

  constructor(
  	private dialogRef: MatDialogRef<AddAPersonDialogComponent>,
    private personService: PersonService,
  	@Inject(MAT_DIALOG_DATA) public data: DialogData
  	) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
  	this.dialogRef.close();
  }

}