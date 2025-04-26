import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../enums/roles.enum';


@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', nullable: true })
    firstName?: string;

    @Column({ type: 'varchar', nullable: true })
    lastName?: string;

    @Column({ type: 'enum', enum: Roles, enumName: 'user_role_enum', default: Roles.USER })
    role: Roles;

    @Column({ type: 'varchar', nullable: true, length: 25 })
    codeResetPassword?: string;

    @Column({ type: 'timestamp', nullable: true })
    resetPasswordExpiresAt?: Date;

    @Column({ type: 'int', default: 3 })
    resetPasswordAttempts: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deletedAt?: Date;
}
