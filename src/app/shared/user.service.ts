import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    name: string;
    constructor() {
        this.name = window.localStorage.getItem("name");
        if (!this.name) {
            this.showEnterNameForm();
        }
    }

    showEnterNameForm(){
        this.name = window.prompt("Please enter your name", this.name || '');
        window.localStorage.setItem("name", this.name);
    }

    deleteNameFromLocalStorage(){
        window.localStorage.removeItem("name");
    }

    changeName(){
        this.deleteNameFromLocalStorage();
        this.showEnterNameForm();
    }

}