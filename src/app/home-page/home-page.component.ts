import { Post } from './../shared/interfaces';
import { PostsService } from './../shared/posts.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  posts$?: Observable<Post[]>

  constructor(private postServive: PostsService) { }

  ngOnInit() {
    this.posts$ = this.postServive.getAll()
  }

}
