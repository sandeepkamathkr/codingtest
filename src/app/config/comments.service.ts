import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Comment} from "../shared/model/comment.model";

export interface ICommentsService {
  findAllCommentsByPost(postId: number):Observable<Comment[]>
}
@Injectable({
  providedIn: 'root'
})
export class CommentsService implements ICommentsService{
  private commentUrl = 'https://jsonplaceholder.typicode.com/comments';
  constructor(private http: HttpClient) { }

  findAllCommentsByPost(postId: number): Observable<Comment[]> {
    let params: HttpParams = new HttpParams().set('postId', ''+postId)
    return this.http.get<Comment[]>(this.commentUrl, {params: params});
  }
}
