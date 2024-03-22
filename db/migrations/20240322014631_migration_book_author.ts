import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('BooksAuthors', table => {
        table.string('BookID', 255);
        table.string('AuthorID', 255);
        table.primary(['BookID', 'AuthorID']);
        table.foreign('BookID').references('Books.ID');
        table.foreign('AuthorID').references('Authors.ID');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('BooksAuthors');
}
