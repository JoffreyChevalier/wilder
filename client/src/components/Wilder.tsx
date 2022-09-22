import { useState } from 'react';
import { deleteWilder } from '../services/wilder';

import Skill from './Skill';

import blank_profile from './../assets/blank_profile.png';
import { IWilder } from '../types/IWilder';

interface WilderProps {
  wilder: IWilder;
  loadWildersData: () => void;
}

function Wilder({
  wilder: { id, name, bio, skills = [] },
  loadWildersData,
}: WilderProps) {
  const [processing, setProcessing] = useState(false);

  const deleteWilderById = async (id: number) => {
    setProcessing(true);
    try {
      await deleteWilder(id);
      loadWildersData();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <article className='card'>
      <button
        onClick={() => deleteWilderById(id)}
        disabled={processing}
        className='relative bottom-8 left-[12.8rem] w-6 rounded-full bg-red-600 font-bold text-white text-center hover:scale-110 focus:scale-100'
      >
        x
      </button>
      <img src={blank_profile} alt={`${name} Profile`} />
      <h3>{name}</h3>
      <p>{bio} </p>
      <h4>Wild Skills</h4>
      <ul className='skills'>
        {skills.map((skill) => (
          <Skill
            key={skill.id}
            id={skill.id}
            name={skill.name}
            votes={skill.votes}
          />
        ))}
      </ul>
    </article>
  );
}

export default Wilder;
