import { Component, OnInit } from '@angular/core';
import { MyListService } from '../../services/my-list.service';
import { ImyList } from '../../models/imy-list';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent implements OnInit {
  myList!: ImyList[]

  constructor(private _myListService: MyListService) { }
  ngOnInit(): void {
    this._myListService.getList().subscribe({
      next: (res) => this.myList = res,
      error: (err) => console.log(err)
    })
  }

  remove(id: any) {
    this._myListService.remove(id).subscribe({
      next: () => {
        alert("removed successfully");
        this.myList = this.myList.filter(item => item.id != id)
        console.log(this.myList);
      },
      error: (err) => console.log(err)
    })

    console.log(id);
  }

}
