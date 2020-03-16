import {Component, OnInit} from '@angular/core';
import {UsersService} from "./config/users.service";
import {User} from "./shared/model/user.model";
import {Subscription} from "rxjs";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading = false;
  users: User[];
  private sub$: Subscription = new Subscription();

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.sub$.add(this.usersService.findAllUsers()
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(result => {
        this.users = result;
        this.users.forEach(user => {
          const name:string[] =  user.name.split(" ");
          if(name.length ==3){
            user.name = name[1];
          }else{
            user.name = name[0];
          }
        });
      }));
  }
}
