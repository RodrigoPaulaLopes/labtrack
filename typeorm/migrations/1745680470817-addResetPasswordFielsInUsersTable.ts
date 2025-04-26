import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddResetPasswordFielsInUsersTable1745680470817 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', [
            new TableColumn({
                name: 'resetPasswordExpiresAt',
                type: 'timestamp',
                isNullable: true,
                default: null,
            }),
            new TableColumn({
                name: 'resetPasswordAttempts',
                type: 'int',
                isNullable: true,
                default: 0,
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "resetPasswordAttempts");
        await queryRunner.dropColumn("users", "resetPasswordExpiresAt");
        
    }

}
