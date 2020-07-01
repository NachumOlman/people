import { Injectable } from '@angular/core';
import { Person } from './person'
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

	private peolpeUrl = 'api/people';

	httpOptions = {
	    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

  	constructor(
  		private http: HttpClient,
  	) { }

  	getPeople(): Observable<Person[]> {
		return this.http.get<Person[]>(this.peolpeUrl)
	    .pipe(
	    	catchError(this.handleError<Person[]>('getPeople', []))
	    );
	}

	updatePerson(person: Person): Observable<any> {
	  return this.http.put(this.peolpeUrl, person, this.httpOptions).pipe(
	    catchError(this.handleError<any>('updatePerson'))
	  );
	}

	addPerson(person: Person): Observable<Person> {
		return this.http.post<Person>(this.peolpeUrl, person, this.httpOptions).pipe(
		    catchError(this.handleError<Person>('addPerson'))
		);
	}

	deletePerson(person: Person): Observable<Person> {
		return this.http.delete<Person>(this.peolpeUrl, this.httpOptions).pipe(
		    catchError(this.handleError<Person>('deletePerson'))
		);
	}

	searchPeople(term: string): Observable<Person[]> {
		if (!term.trim()) {
			return of([]);
		}
		return this.http.get<Person[]>(`${this.peolpeUrl}/?firstname=${term}`).pipe(
		    catchError(this.handleError<Person[]>('searchPeople', []))
		);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T>(operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

	    console.error(error);

	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}
}
