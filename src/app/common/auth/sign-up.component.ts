import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './sign-up.component.html',
})
export class SignUpComponent {

    firstName = '';
    lastName = '';
    phoneNumber = '';
    email = '';
    password = '';
    isTrainer = false;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    signUp(): void {
        const newUser = {
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            email: this.email,
            password: this.password,
            isTrainer: this.isTrainer,
        }; console.log(this.isTrainer);
        
        if (newUser.firstName && newUser.lastName && newUser.email && newUser.password) {
            this.authService.signUp(newUser.firstName, newUser.lastName, newUser.phoneNumber,
                newUser.email, newUser.password, newUser.isTrainer).subscribe(
                (response) => this.router.navigateByUrl('/login')
            );
            document.getElementsByName("labelError")[0].innerText = '';
        } else {
            console.log('Broken form; not valid');
            document.getElementsByName("labelError")[0].innerText = 'First Name, Last Name, Email, and Password are required.';
        }
    }
}
