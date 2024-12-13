import { Component, OnInit } from '@angular/core';
import { ApiMoviesService } from '../../services/api-movies.service';
import { Imovies } from '../../models/iproduct';
import { RouterLink } from '@angular/router';
import { MyListService } from '../../services/my-list.service';
import { ImyList } from '../../models/imy-list';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movies.component.html',
  styles: ''
})
export class MoviesComponent implements OnInit {

  movies: Imovies[] = [];
  // count: number = 0;
  filteredMovies: Imovies[] = [];

  constructor(private _apiMoviesService: ApiMoviesService,
    private _myListService: MyListService,
    private _SharedService: SharedService
  ) {

  }
  ngOnInit() {
    this._apiMoviesService.getProductsByType('Movie').subscribe({
      next: (res) => {

        this.movies = res;
        this.filteredMovies = this.movies;
      },
      error: (err) => {
        console.log(err);
      }
    })

    // this._myListService.getList().subscribe({
    //   next: (res) => {
    //     this.count = res.length
    //   },

    //   error: (err) => {
    //     console.log(err);
    //   }
    // })

    this._SharedService.getSubject().subscribe({
      next: (name) => {
        if (name == '')
          this.filteredMovies = this.movies
        else
          this.filteredMovies = this.movies.filter(movie => movie.name.includes(name))
      }
    })

  }

  addToList(id: any) {
    this._apiMoviesService.getProductById(id).subscribe({
      next: (res) => {
        console.log(res);
        let myList: ImyList = {
          "movies": res
        };
        this._myListService.addToList(myList).subscribe({
          next: () => alert('added successfully'),
          error: (err) => console.log(err)
        })
      },
      error: (err) => console.log(err)
    });
  }
}
