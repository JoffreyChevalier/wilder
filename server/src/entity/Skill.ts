import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import Grade from './Grade'
@Entity()
class Skill {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @OneToMany(() => Grade, (g) => g.skill)
}

export default Skill