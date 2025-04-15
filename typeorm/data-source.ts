import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { CreateUserTable1744728352093 } from "./migrations/1744728352093-createUserTable";
import { User } from "src/users/entities/user.entity";
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
    migrations: [CreateUserTable1744728352093],
})

export default dataSource;