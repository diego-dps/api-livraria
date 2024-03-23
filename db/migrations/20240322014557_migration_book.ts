import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('Books', table => {
        table.string('ID', 255).primary();
        table.string('Name', 255);
        table.text('Description');
        table.integer('NumberOfPages');
        table.string('PublisherID', 255);
        table.string('Category', 50);
        table.string('ImageUrl', 255);
        table.foreign('PublisherID').references('Publishers.ID');
        table.timestamp('created_at').defaultTo(knex.fn.now());

    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('Books');
}
