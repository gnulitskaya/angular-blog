import { switchMap } from 'rxjs/operators';
import { Post } from './../shared/interfaces';
import { PostsService } from './../shared/posts.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post$?: Observable<Post>
  constructor(
    private route: ActivatedRoute,
    private PostsService: PostsService
  ) { }

  ngOnInit() {
    this.post$ = this.route.params
    //switchMap позволяет изменить направление стрима от парамс до нужного
      .pipe(switchMap( (params: Params) => {
        return this.PostsService.getById(params['id'])
      }))
  }

}
