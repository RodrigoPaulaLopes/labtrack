import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCodeRestPasswordCodeColumnInUserTable1745677501661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "codeResetPassword",
            type: "varchar",
            length: "25",
            isNullable: true,
            default: null,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "codeResetPassword");
    }

}
