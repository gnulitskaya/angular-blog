import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from "../../shared/posts.service";
import {Post} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy{
  posts: Post[] = []
  pSub?: Subscription
  dSub?: Subscription
  searchStr = ''
  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: any) {
    this.dSub = this.postsService.remove(id).subscribe( () => {
      //переопределение списка постов
      //удалим ненужный элемент из массива
      this.posts = this.posts.filter(post => post.id !== id)
    })
  }

  ngOnDestroy(): void {
    if(this.pSub) {
      this.pSub.unsubscribe()
    }
    if(this.dSub) {
      this.dSub.unsubscribe()
    }
  }


}
