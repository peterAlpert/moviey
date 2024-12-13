import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icomment } from '../models/icomment';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private _HttpClient: HttpClient) { }

  getComments(): Observable<Icomment[]> {
    return this._HttpClient.get<Icomment[]>(`${environment.baseUrl}/userComments`)
  }

  addComment(comment: Icomment): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/userComments`, comment);
  }

  removeComment(id: number): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/userComments/${id}`)
  }
}
