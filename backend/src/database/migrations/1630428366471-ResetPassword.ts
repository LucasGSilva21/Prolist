import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ResetPassword1630428366471 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'password_reset_token',
            type: 'varchar',
            isNullable: true
        }));

        await queryRunner.addColumn('users', new TableColumn({
            name: 'password_reset_expires',
            type: 'timestamp',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'password_reset_expires');

        await queryRunner.dropColumn('users', 'password_reset_token');
    }

}
