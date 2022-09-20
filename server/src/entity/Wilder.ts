import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Grade from './Grade'

@Entity()
class Wilder {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true, length: 100 })
  city: string | null

  @Column({ length: 100 })


  @OneToMany(() => Grade, (g) => g.wilder)
  grade: Grade[]

}

export default Wilder