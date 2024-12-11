import { Component, OnInit } from '@angular/core';
import { Imovies } from '../../models/iproduct';
import { ImyList } from '../../models/imy-list';
import { MyListService } from '../../services/my-list.service';
import { RouterLink } from '@angular/router';
import { ApiSeriesService } from '../../services/api-series.service';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './series.component.html',
  styles: ``
})
export class SeriesComponent implements OnInit {

  series!: Imovies[];
  count!: number
  

  constructor(private _ApiSeriesService:ApiSeriesService,
    private _myListService:MyListService
  ){}
  ngOnInit(){
    this._ApiSeriesService.getAllSeries().subscribe({
      next:(res) => this.series = res,
      error:(err) => console.log(err)
    })

    this._myListService.getList().subscribe({
      next: (res) => {
        this.count = res.length
      },

      error: (err) => {
        console.log(err);
      }
    })
  }

  addToList(id: string) {
    this._ApiSeriesService.getSeriesById(id).subscribe({
      next: (res) => {
        console.log(res);
        let myList: ImyList = {
          "id": (++this.count).toString(),
          "name": "george",
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
