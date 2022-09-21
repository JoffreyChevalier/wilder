import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Grade from './Grade'

@Entity()
class Skill {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(() => Grade, (g) => g.skills)
  grades: Grade[]
}

export default Skill