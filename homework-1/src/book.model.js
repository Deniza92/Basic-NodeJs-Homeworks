import { v4 as uuid } from uuid;

export class Book {
    id = uuid();
    constructor(title, author, publicitationYear, quantity) {
        this.title = title;
        this.author = author;
        this.publicitationYear = publicitationYear;
        this.quantity = quantity;
    }
}