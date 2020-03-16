import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "./config/users.service";
import {User} from "./shared/model/user.model";
import {Subscription} from "rxjs";
import {finalize} from "rxjs/operators";
import {PostsService} from "./config/posts.service";
import {CommentsService} from "./config/comments.service";
import {Post} from "./shared/model/post.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  isLoading = false;
  isPostLoading = false;
  users: User[];
  selectedUser: User;
  actualPosts: Post[];
  dispalyedPosts: Post[];
  private sub$: Subscription = new Subscription();

  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private commentsService: CommentsService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.sub$.add(this.usersService.findAllUsers()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(result => {
        this.users = result;
        this.users.forEach(user => {
          const name:string[] =  user.name.split(" ");
          if(name.length ==3){//when the name contains more than three words
            user.fistName = name[1];
          }else{
            user.fistName = name[0];
          }
        });
      }));
  }

  fetchPosts(user: User): void{
    this.selectedUser = user;
    this.isPostLoading = true;
    this.sub$.add(this.postsService.findAllPostsByUser(user.id)
      .pipe(finalize(() => (this.isPostLoading = false)))
      .subscribe(result => {
        this.actualPosts = result;
        this.dispalyedPosts = this.actualPosts.slice(0,3);
      })
    )
  }

  loadAllPost(): void{
    this.dispalyedPosts = this.actualPosts;
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
