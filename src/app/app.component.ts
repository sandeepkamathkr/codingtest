import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from "./config/users.service";
import {User} from "./shared/model/user.model";
import {Subscription} from "rxjs";
import {finalize} from "rxjs/operators";
import {PostsService} from "./config/posts.service";
import {CommentsService} from "./config/comments.service";
import {Post} from "./shared/model/post.model";
import {Comment} from "./shared/model/comment.model";
import {orderBy} from 'lodash';
import {payeeList} from "./shared/payeeList";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoading = false;
  isPostLoading = false;
  isCommentLoading = false;
  users: User[];
  selectedUser: User;
  actualPosts: Post[];
  dispalyedPosts: Post[];
  selectedPost: Post;
  comments: Comment[];
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
          const name: string[] = user.name.split(" ");
          if (name.length == 3) {//when the name contains more than three words
            user.fistName = name[1];
          } else {
            user.fistName = name[0];
          }
        });
      }));
    console.log(payeeList);
    console.log('sort by lodash.......');
    const newPayeeList = orderBy(payeeList, [payee => payee.primary.isPrimary,
      payee => payee.payeeType === 'BPAY',
      payee => payee.payeeType === 'LINKED',
      payee => payee.payeeType === 'PAY_ANYONE',
      payee => payee.name], ['desc', 'asc', 'asc', 'asc', 'desc']);
    console.log(newPayeeList);
    console.log('sort by Vanilla Javascript.......');
    const newVanillaList = payeeList.sort(function (a) {
      return a.primary.isPrimary ? -1 : 1;
    }).slice(0, 1);
    const secondVanillaList = payeeList.slice(1, payeeList.length).sort(function (a, b) {
      return a.payeeType == 'PAY_ANYONE' && b.payeeType != 'PAY_ANYONE' ? -1 : 1;
    }).sort(function (a, b) {
      return a.payeeType != 'PAY_ANYONE' && b.payeeType == 'BPAY' ? -1 : 1;
    });
    console.log(newVanillaList.concat(secondVanillaList));
  }

  fetchPosts(user: User): void {
    this.selectedUser = user;
    this.isPostLoading = true;
    this.sub$.add(this.postsService.findAllPostsByUser(user.id)
      .pipe(finalize(() => (this.isPostLoading = false)))
      .subscribe(result => {
        this.actualPosts = result;
        this.dispalyedPosts = this.actualPosts.slice(0, 3);
      })
    )
  }

  loadAllPost(): void {
    this.dispalyedPosts = this.actualPosts;
  }

  loadAllComment(post: Post): void {
    this.selectedPost = post;
    this.isCommentLoading = true;
    this.comments = null;
    this.sub$.add(this.commentsService.findAllCommentsByPost(post.id)
      .pipe(finalize(() => (this.isCommentLoading = false)))
      .subscribe(result => this.comments = result)
    )
  }

  ngOnDestroy(): void {
    this.sub$.unsubscribe();
  }
}
