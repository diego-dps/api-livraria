import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('Publisher', table => {
        table.string('ID', 255).primary();
        table.string('Name', 50);
        table.text('BriefDescription');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('Publisher');
}

