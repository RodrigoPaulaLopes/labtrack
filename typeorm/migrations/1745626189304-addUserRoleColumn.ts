import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUserRoleColumn1745626189304 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "role",
            type: "enum",
            enum: ["admin", "user"],
            default: "'user'",
            isNullable: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user", "role");
    }

}
