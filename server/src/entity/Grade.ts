import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import Skill from "./Skill"
import Wilder from "./Wilder"


@Entity()
class Grade {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: 1 })
    votes: number

    @Column()
    skillId: number

    @Column()
    wilderId: number


    @OneToMany(() => Wilder, (w) => w.grades)
    wilder: Wilder

    @OneToMany(() => Skill, (s) => s.grades)
    skill: Skill

}

export default Grade