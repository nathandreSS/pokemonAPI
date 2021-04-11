import {getConnection, MigrationInterface, QueryRunner} from "typeorm";
import fs from 'fs';
import {profilePics} from '@config/upload';
import Avatar from "@modules/avatars/infra/typeorm/entities/Avatar";
export class InsertStandardAvatars1617718770273 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const files = fs.readdir(profilePics, async (err, files) => {
            await getConnection()
            .createQueryBuilder()
            .insert()
            .into(Avatar)
            .values(files.map(file => { return {name: file}}))
            .execute();

          });
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
