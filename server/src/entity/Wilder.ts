import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Grade from './Grade'

@Entity()
class Wilder {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name?: string

  @Column({ nullable: true, length: 100, type: "varchar" })
  city: string | null

  @Column({ nullable: true, length: 500, type: "text" })
  bio: string | null

  @OneToMany(() => Grade, (g) => g.wilders)
  grades: Grade[]
}

export default Wilder