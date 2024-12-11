import { Component, OnInit } from '@angular/core';
import { Imovies } from '../../models/iproduct';
import { ApiMoviesService } from '../../services/api-movies.service';
import { ApiSeriesService } from '../../services/api-series.service';
import {NgxPaginationModule} from 'ngx-pagination'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgxPaginationModule, CommonModule],
  templateUrl: './home.component.html',
  styles: ''
})
export class HomeComponent implements OnInit {

  products!: Imovies[];
  totalItems!: number; // Total number of items
  currentPage: number = 1;  // Current page
  

  constructor(
    private _ApiMoviesService:ApiMoviesService,
    private _ApiSeriesService:ApiSeriesService,
  ){}
  ngOnInit(): void {
    this._ApiMoviesService.getAllMovies().subscribe({
      next: (res) => {
        this.products = res;
        this._ApiSeriesService.getAllSeries().subscribe({
          next: (res) => {
            this.products.push(...res);
            this.totalItems = this.products.length
          },
          error: (err) => console.log(err)
        });
      },
      error: (err) => console.log(err)
    });

    
  }
}
