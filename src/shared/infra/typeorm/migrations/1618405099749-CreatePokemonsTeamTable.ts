import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreatePokemonsTeamTable1618405099749 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
			new Table({
				name: 'pokemons_teams',
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						generationStrategy: 'uuid',
						default: 'uuid_generate_v4()',
					},
                    {
                        name: 'pokemon_id',
                        type: 'int',
                    },
                    {
                        name: 'team_id',
                        type: 'uuid'
                    },
                    {
                        name: 'color',
                        type: 'varchar',
                    },
                    {
						name: 'created_at',
						type: 'timestamp',
						default: 'now()',
					},
					{
						name: 'updated_at',
						type: 'timestamp',
						default: 'now()',
					},
                ]
            })
        );
        await queryRunner.createForeignKey(
			'pokemons_teams',
			new TableForeignKey({
				name: 'pokemon_team',
				columnNames: ['team_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'teams',
				onDelete: 'CASCADE',
				onUpdate: 'CASCADE',
			}),
		);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('pokemons_teams', 'pokemon_team');
        await queryRunner.dropTable('pokemons_teams');
    }
}
