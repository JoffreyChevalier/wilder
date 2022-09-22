import { ISkill } from '../types/ISkills';

function Skill({ name, votes }: ISkill) {
  return (
    <li>
      {name} <span className='votes'>{votes}</span>
    </li>
  );
}

export default Skill;
