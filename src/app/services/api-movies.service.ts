import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imovies } from '../models/iproduct';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiMoviesService {

  constructor(private _httpClient: HttpClient) { }

  getAllMovies(): Observable<Imovies[]> {
    return this._httpClient.get<Imovies[]>(`${environment.baseUrl}/movies`);
  }

  getMoviesById(id: any): Observable<Imovies> {
    return this._httpClient.get<Imovies>(`${environment.baseUrl}/movies/${id}`);
  }
}
