import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  authors: string;

  @Column()
  @IsNotEmpty()
  dateUTC: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  @IsNotEmpty()
  departureDate: string;

  @Column()
  @IsNotEmpty()
  pages: number;

  @Column()
  @IsNotEmpty()
  sections: string;

  @Column()
  @IsNotEmpty()
  imageURL: string;

  @Column()
  @IsNotEmpty()
  senderEmail: string;

  @Column()
  @IsNotEmpty()
  senderId: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column('int', { array: true, default: {} })
  likes: number[];
}
