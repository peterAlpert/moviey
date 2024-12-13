import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Imovies } from '../../models/iproduct';
import { ApiMoviesService } from '../../services/api-movies.service';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styles: ''
})
export class HeaderComponent implements OnInit {
  movies!: Imovies[];
  movieName: string = '';

  constructor(private _apiMoviesService: ApiMoviesService,
    private _SharedService: SharedService
  ) { }
  ngOnInit(): void {
    this._apiMoviesService.getAllProducts().subscribe({
      next: (res) => this.movies = res,
      error: (err) => console.log(err)
    })
  }

  search() {
    this._SharedService.search(this.movieName);
  }
}
