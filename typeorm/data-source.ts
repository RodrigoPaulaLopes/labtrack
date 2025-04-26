import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { CreateUserTable1744728352093 } from "./migrations/1744728352093-createUserTable";
import { User } from "src/users/entities/user.entity";
import { AddUserRoleColumn1745626189304 } from "./migrations/1745626189304-addUserRoleColumn";
import { AddCodeRestPasswordCodeColumnInUserTable1745677501661 } from "./migrations/1745677501661-addCodeRestPasswordCodeColumnInUserTable";
import { AddResetPasswordFielsInUsersTable1745680470817 } from "./migrations/1745680470817-addResetPasswordFielsInUsersTable";

dotenv.config();
const dataSource = new DataSource({
    type: "mysql",
    host: 'localhost',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: false,
    entities: [User],
    migrations: [
        CreateUserTable1744728352093, 
        AddUserRoleColumn1745626189304, 
        AddCodeRestPasswordCodeColumnInUserTable1745677501661,
        AddResetPasswordFielsInUsersTable1745680470817,
    ],
})

export default dataSource;