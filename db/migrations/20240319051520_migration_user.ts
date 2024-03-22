import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('Users', table => {
        table.string('ID').primary();
        table.string('FullName', 100).notNullable();
        table.string('Email', 50).notNullable().unique();
        table.string('Password', 50).notNullable();
        table.string('Role', 20).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('Users');
}

