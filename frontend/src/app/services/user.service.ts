import { Injectable } from '@angular/core';
import { User } from '../shared/models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { LOGIN_URL, REGISTER_URL } from '../shared/constants/url';
import { ToastrService } from 'ngx-toastr';
import { IRegisterUser } from '../shared/interfaces/IUserRegister';
const USER_KEY='user';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage())
  public userObservable: Observable<User>
  constructor(private http: HttpClient,private toastrService: ToastrService) {
    this.userObservable = this.userSubject.asObservable();
   }
   login(userLogin: IUserLogin):Observable<User> {

    return this.http.post<User>(LOGIN_URL,userLogin).pipe(
      tap({
        next: (user)=> {

          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to Food Mine ${user.name}`,"Login Successful")
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,"Login Failed")
        }
      })
    );
   }
  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }
  private getUserFromLocalStorage():User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
    return JSON.parse(userJson) as User;
    }
    return new User();
  }
  register(userRegister: IRegisterUser):Observable<User> {
    return this.http.post<User>(REGISTER_URL,userRegister).pipe(
      tap({
        next: (user)=> {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(`Welcome to the food Mine ${user.name}`,"Registration successful")
        },
        error: (error)=> {
          this.toastrService.error(error,'Registration Failed');

        }
      })
    )


  }
  logout() {
  this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

}
