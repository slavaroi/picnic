import { Injectable } from '@angular/core';

@Injectable()
export class ListService {

    constructor() { }

    itemStatus = {
        danger: 'danger',
        warning: 'warning',
        success: 'success'
    };
}