import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('Cart', table => {
        table.string('UserID', 255);
        table.string('BookID', 255);
        table.integer('Quantity');
        table.primary(['UserID', 'BookID']);
        table.foreign('UserID').references('Users.ID');
        table.foreign('BookID').references('Books.ID');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('Cart');
}
