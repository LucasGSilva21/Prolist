import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUserRole1637768512339 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('users', new TableColumn({
            name: 'role',
            type: 'varchar',
            isNullable: true,
            default: "'user'"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'role');
    }
}
