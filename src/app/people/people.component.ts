import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from '../person'
import { PersonService } from '../person.service';
import { AddAPersonDialogComponent } from '../add-aperson-dialog/add-aperson-dialog.component';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from "@angular/animations";

export interface DialogData {
  name: string;
  title: string;
}

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  animations: [
    trigger("flyInOut", [
      state("in", style({ transform: "translateX(0)" })),
      transition("void => *", [
        animate(
          300,
          keyframes([
            style({ opacity: 0, transform: "translateX(-100%)", offset: 0 }),
            style({ opacity: 1, transform: "translateX(15px)", offset: 0.3 }),
            style({ opacity: 1, transform: "translateX(0)", offset: 1.0 })
          ])
        )
      ]),
      transition("* => void", [
        animate(
          300,
          keyframes([
            style({ opacity: 1, transform: "translateX(0)", offset: 0 }),
            style({ opacity: 1, transform: "translateX(-15px)", offset: 0.7 }),
            style({ opacity: 0, transform: "translateX(100%)", offset: 1.0 })
          ])
        )
      ])
    ])
  ]
})
export class PeopleComponent implements OnInit {

	people: Person[];

	name: string;
  	title: string;

	constructor(
		private personService: PersonService,
    private dialog: MatDialog
	) { }

	ngOnInit() {
		this.getPeople()
	}

	getPeople(): void {
	    this.personService.getPeople()
	    .subscribe(people => this.people = people);
	}

	add(firstname: string, lastname: string): void {
		firstname = firstname.trim();
		lastname = lastname.trim();
		if (!firstname || !lastname) { return; }
		this.personService.addPerson({ firstname, lastname } as Person)
		.subscribe(person => {
		    this.people.push(person);
		});
	}

	delete(person: Person): void {
		this.people = this.people.filter(p => p !== person);
		this.personService.deletePerson(person).subscribe();
	}

	titleAdd(): void {
		this.title = 'Add';
		this.name = '';
	}

	edit(person: Person): void {
  		this.name = person.firstname + " " + person.lastname;
  		this.people = this.people.filter(p => p !== person);
		this.personService.deletePerson(person).subscribe();
		this.title = 'Edit';
		this.openDialog();
  	}

	openDialog(): void {
    	const dialogRef = this.dialog.open(AddAPersonDialogComponent, {
      		data: {name: this.name ,title: this.title}
    	});

    	dialogRef.afterClosed().subscribe(result => {
  			let arr = result.split(" ");
  			let person: Person = {
  				id: 30,
  				firstname: arr[0],
  				lastname: arr[1]
  			}
  			this.people.push(person);
  			this.name = '';
  			this.personService.addPerson(person as Person).subscribe()
		  });
  }
}