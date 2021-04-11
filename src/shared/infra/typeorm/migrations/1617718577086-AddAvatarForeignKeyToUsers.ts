import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddAvatarForeignKeyToUsers1617718577086 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createForeignKey(
			'users',
			new TableForeignKey({
				name: 'UserAvatar',
				columnNames: ['avatar_id'],
				referencedColumnNames: ['id'],
				referencedTableName: 'avatars',
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			}),
		);
	}

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey('users', 'UserAvatar');
    }

}
