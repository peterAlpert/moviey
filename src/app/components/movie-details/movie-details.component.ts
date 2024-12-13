import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiMoviesService } from '../../services/api-movies.service';
import { Imovies } from '../../models/iproduct';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommentService } from '../../services/comment.service';
import { FormsModule } from '@angular/forms';
import { Icomment } from '../../models/icomment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {

  movie: Imovies = {} as Imovies;
  movieId!: number;
  count!: number;
  commentt: string = ''
  commentList: Icomment[] = []

  constructor(private _apiMoviesService: ApiMoviesService,
    private _activatedRouter: ActivatedRoute,
    private _location: Location,
    private _CommentService: CommentService,
    private _ToastrService: ToastrService
  ) { }



  ngOnInit(): void {
    this.movieId = Number(this._activatedRouter.snapshot.paramMap.get('id'));
    this._apiMoviesService.getProductById(this.movieId).subscribe({
      next: (res) => {
        this.movie = res
      },
      error: (err) => {
        console.log(err)
      }
    })

    // this._CommentService.getComments().subscribe({
    //   next: (res) => {
    //     this.commentList = res.filter(c => c.movieId == this.movieId)
    //     this.count = res.length
    //   }
    // })
  }

  back() {
    this._location.back();
  }

  comment(id: any) {
    let newComment = {
      "id": (++this.count).toString(),
      "movieId": id,
      "comment": this.commentt
    }
    //   this._CommentService.addComment(newComment).subscribe({
    //     next: () => {
    //       this._CommentService.getComments().subscribe({
    //         next: (res) => this.commentList = res.filter(c => c.movieId == this.movieId),
    //         error: (err) => console.warn(err)


    //       })
    //       this.commentt = ''
    //       this._ToastrService.success("Comment Added Successfully")

    //     },
    //     error: (err) => console.log(err)
    //   })
  }

  removeComment(commId: any) { }
  // this._CommentService.removeComment(commId).subscribe({
  //   next: () => {
  //     this._ToastrService.info('commment deleted')
  //     this._CommentService.getComments().subscribe({
  //       next: (res) => this.commentList = res.filter(c => c.movieId == this.movieId),
  //       error: (err) => console.warn(err)

  //     })
  //   },
  //   error: (err) => console.log(err)
  // })
}

