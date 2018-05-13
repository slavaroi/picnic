import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    name: string;
    constructor() {
        this.getName();
    }

    getName() {
        this.name = window.localStorage.getItem("name");

        if (!this.name) {
            this.name = window.prompt("Please enter your name")
            window.localStorage.setItem("name", this.name);
        }
    }
}