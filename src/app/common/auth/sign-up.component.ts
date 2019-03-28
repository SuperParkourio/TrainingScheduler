import { Component } from '@angular/core';

@Component({
    templateUrl: './sign-up.component.html',
})
export class SignUpComponent {

    firstName = '';
    lastName = '';
    phoneNumber = '';
    email = '';
    password = '';

    constructor(
    ) { }

    signUp(): void {
        const newUser = {
            firstName: this.firstName,
            lastName: this.lastName,
            phoneNumber: this.phoneNumber,
            email: this.email,
            password: this.password,
        };
        
        if (newUser.firstName && newUser.lastName && newUser.email && newUser.password) {
            console.log(newUser);
        } else {
            console.log('Broken form, not valid YO');
            document.getElementsByName("labelError")[0].innerText = 'First Name, Last Name, Email, and Password are required.';
        }
    }
}
