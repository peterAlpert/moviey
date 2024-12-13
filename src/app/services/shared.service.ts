import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Imovies } from '../models/iproduct';
import { ApiMoviesService } from './api-movies.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnInit {

  movies!: Imovies[]

  searchName: BehaviorSubject<string>

  constructor(private _apiMoviesService: ApiMoviesService) {
    this.searchName = new BehaviorSubject<string>('');
  }
  ngOnInit(): void {
    this._apiMoviesService.getAllProducts().subscribe({
      next: (res) => this.movies = res,
      error: (err) => console.log(err)
    })
  }

  search(movieName: string) {
    this.searchName.next(movieName);
  }

  getSubject(): BehaviorSubject<string> {
    return this.searchName;
  }
}
