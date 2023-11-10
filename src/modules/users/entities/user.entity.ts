import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Connection } from './connection.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 60 })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 255, select: false })
  password: string;

  @Column({ name: 'first_name', length: 50 })
  firstName: string;

  @Column({ name: 'last_name', length: 50 })
  lastName: string;

  @OneToMany(() => Connection, (connection) => connection.connectedUser)
  connections: Connection[];

  @BeforeInsert()
  @BeforeUpdate()
  emailAndUsernameToLowerCase() {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
  }
}
