import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Person } from './person'

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

	createDb() {
	    const people = [
		    { firstname: 'Nachum', lastname: 'Olman', id: 10 },
		    { firstname: 'Netanel', lastname: 'Mantzur', id: 11 },
		    { firstname: 'Avichay', lastname: 'Elderos', id: 12 },
		    { firstname: 'Yehoshfat', lastname: 'Glazer', id: 13 },
		    { firstname: 'Mark', lastname: 'Whatney', id: 14 },
		    { firstname: 'Kirk', lastname: 'Douglas', id: 15 },
		    { firstname: 'Eric', lastname: 'Lensher', id: 16 },
		    { firstname: 'Espada', lastname: 'Ardiente', id: 17 },
		    { firstname: 'John', lastname: 'Mitchell', id: 18 },
		    { firstname: 'Eric', lastname: 'Wright', id: 19 }
	    ];
	    return {people};
  	}

  	genId(people: Person[]): number {
	    return people.length > 0 ? Math.max(...people.map(person => person.id)) + 1 : 21;
	}
}
