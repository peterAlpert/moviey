import { Component } from '@angular/core';
import { Icomment } from '../../models/icomment';
import { Imovies } from '../../models/iproduct';
import { ApiSeriesService } from '../../services/api-series.service';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../services/comment.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-series-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './series-details.component.html',
  styleUrl: './series-details.component.css'
})
export class SeriesDetailsComponent {

  series: Imovies = {} as Imovies;
  seriesId!: string | null;
  count!: number;
  commentt: string = ''
  commentList: Icomment[] = []

  constructor(private _ApiSeriesService: ApiSeriesService,
    private _activatedRouter: ActivatedRoute,
    private _location: Location,
    private _CommentService: CommentService,
    private _ToastrService: ToastrService
  ) { }



  ngOnInit(): void {
    this.seriesId = this._activatedRouter.snapshot.paramMap.get('id');
    this._ApiSeriesService.getSeriesById(this.seriesId).subscribe({
      next: (res) => {
        this.series = res
      },
      error: (err) => {
        console.log(err)
      }
    })

    this._CommentService.getComments().subscribe({
      next: (res) => {
        this.commentList = res.filter(c => c.movieId == this.seriesId)
        this.count = res.length
      }
    })
  }

  back() {
    this._location.back();
  }

  comment(id: string) {
    let newComment = {
      "id": (++this.count).toString(),
      "movieId": id,
      "comment": this.commentt
    }
    this._CommentService.addComment(newComment).subscribe({
      next: () => {
        this._CommentService.getComments().subscribe({
          next: (res) => this.commentList = res.filter(c => c.movieId == this.seriesId),
          error: (err) => console.warn(err)


        })
        this.commentt = ''
        this._ToastrService.success("Comment Added Successfully")

      },
      error: (err) => console.log(err)
    })
  }

  removeComment(commId: string) {
    this._CommentService.removeComment(commId).subscribe({
      next: () => {
        this._ToastrService.info('commment deleted')
        this._CommentService.getComments().subscribe({
          next: (res) => this.commentList = res.filter(c => c.movieId == this.seriesId),
          error: (err) => console.warn(err)

        })
      },
      error: (err) => console.log(err)
    })
  }

}
