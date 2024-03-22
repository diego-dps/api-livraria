// eslint-disable-next-line

import { Knex } from "knex";

declare module "knex/types/tables" {
    export interface Tables {
        Users: {
            ID: string;
            FullName: string;
            Email: string;
            Password: string;
            Role: string;
            created_at: Date;
            session_id?: string;
            created_at: Date;
        },
        Authors: {
            ID: string;
            Name: string;
            BriefDescription: string;
            created_at: Date;
        },
        Books: {
            ID: string;
            Description: string;
            NumberOfPages: number;
            PublisherID: string;
            Category: string;
            created_at: Date;
        },
        BooksAuthors: {
            BookID: string;
            AuthorID: string;
            created_at: Date;
        },
        Cart: {
            UserID: string;
            BookID: string;
            Quantity: number;
            created_at: Date;
        }
    }
}