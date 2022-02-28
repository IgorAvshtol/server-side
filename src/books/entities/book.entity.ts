import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  authors: string;

  @Column({ nullable: true })
  dateUTC: number;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  departureDate: string;

  @Column({ nullable: true })
  pages: number;

  @Column({ nullable: true })
  sections: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  senderEmail: string;

  @Column({ nullable: true })
  senderId: number;

  @Column({ nullable: true })
  title: string;

  @Column('int', { array: true, default: {} })
  likes: number[];
}
