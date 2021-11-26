import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostsService} from "../../shared/posts.service";
import {switchMap} from "rxjs/operators";
import {Post} from "../../shared/interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  form?: FormGroup
  constructor(private route: ActivatedRoute,
              private postsService: PostsService) { }

  ngOnInit(): void {
    //подпишемся на стрим текущего роута чтобы получить перам
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      })).subscribe((post: Post) => {
        //инициализировать форму которая позволит менять данные поста
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      })
    })
  }

  submit() {

  }
}
