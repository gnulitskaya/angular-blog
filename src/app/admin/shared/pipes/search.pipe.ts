import {Pipe, PipeTransform} from "@angular/core";
import {Post} from "../../../shared/interfaces";

@Pipe({
  name: 'searchPipe'
})

export class SearchPipe implements PipeTransform{
  transform(posts: Post[], search = ''): Post[] {
    //если пустая строка
    if(!search.trim()) {
      return posts
    }
    return posts.filter(post => {
      return post.title.toLowerCase().includes(search.toLowerCase())
    })
  }
}
