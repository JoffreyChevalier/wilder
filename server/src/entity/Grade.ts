import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import Skill from "./Skill"
import Wilder from "./Wilder"


@Entity()
class Grade {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 1 })
    votes: number

    @Column()
    skillsId: number

    @Column()
    wildersId: number

    @ManyToOne(() => Wilder, (w) => w.grades)
    wilders: Wilder

    @ManyToOne(() => Skill, (s) => s.grades)
    skills: Skill

}

export default Grade