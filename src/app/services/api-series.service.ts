import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Imovies } from '../models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class ApiSeriesService {

  constructor(private _httpClient:HttpClient) { }

  getAllSeries():Observable<Imovies[]>{
    return this._httpClient.get<Imovies[]>(`${environment.baseUrl}/series`);
  }

  getSeriesById(id:any):Observable<Imovies>{
    return this._httpClient.get<Imovies>(`${environment.baseUrl}/series/${id}`);
  }
}
