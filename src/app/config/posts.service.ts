import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../shared/model/post.model";

export interface IPostsService {
  findAllPostsByUser(userId: number): Observable<Post[]>
}

@Injectable({
  providedIn: 'root'
})
export class PostsService implements IPostsService {
  private postUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
  }

  findAllPostsByUser(userId: number): Observable<Post[]> {
    let params: HttpParams = new HttpParams().set('userId', '' + userId)
    return this.http.get<Post[]>(this.postUrl, {params: params})
  }
}
