import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

  constructor(private http: HttpClient) { }

  getCocktailByName(cocktailName: string): Observable<any> {
    const url = `${this.apiUrl}/search.php?s=${cocktailName}`;
    return this.http.get(url);
  }
}

