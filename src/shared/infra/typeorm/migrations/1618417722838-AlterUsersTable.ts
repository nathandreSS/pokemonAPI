import {MigrationInterface, QueryRunner, Table, TableColumn} from "typeorm";

export default class AlterUsersTable1618417722838
	implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('users', 'username', 
            new TableColumn({ 
                name: 'username',
                type: 'varchar',
                default: "'ash'",
            })
        )
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('users', 'username', new TableColumn({
            name: 'username',
            type: 'varchar',
            isUnique: true,
        }));
	}
}

