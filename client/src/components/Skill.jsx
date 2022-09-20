function Skill({ name, level }) {
  return (
    <li>
      {name} <span className='votes'>{level}</span>
    </li>
  );
}

export default Skill;
