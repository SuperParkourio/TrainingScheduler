import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {
  
  updateUserForm = new FormGroup({
    first: new FormControl(),
    last: new FormControl(),
    email: new FormControl(),
    phone: new FormControl(),
    aboutMe: new FormControl(),
    password: new FormControl(),
    labelError: new FormControl(),
  });
  userId: Number;
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      (data) => {
        console.log(data);
        this.userId = data.id;
        this.updateUserForm.controls.first.setValue(data.first);
        this.updateUserForm.controls.last.setValue(data.last);
        this.updateUserForm.controls.email.setValue(data.email);
        this.updateUserForm.controls.phone.setValue(data.phone);
        this.updateUserForm.controls.aboutMe.setValue(data.aboutMe);
      },
      (error) => {
        console.log('Failed to get current user info');
      }
    );
  }

  save(): void {
    const userInfo = {
      first: this.updateUserForm.controls.first.value,
      last: this.updateUserForm.controls.last.value,
      email: this.updateUserForm.controls.email.value,
      phone: this.updateUserForm.controls.phone.value,
      aboutMe: this.updateUserForm.controls.aboutMe.value,
      password: this.updateUserForm.controls.password.value,
    }
    if (userInfo.first && userInfo.last && userInfo.email && userInfo.password) {
      if (!userInfo.phone) userInfo.phone = null;
      if (!userInfo.aboutMe) userInfo.aboutMe = null;
      this.authService.updateUserInfo(this.userId, userInfo).subscribe(
        (response) => this.router.navigateByUrl('/home')
      );
    } else {
      document.getElementsByName("labelError")[0].innerText ='First, Last, Email, & Password required';
    }
  }
}
