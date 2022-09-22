import { useState, useEffect, Fragment } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import {
  Input,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';

import { createWilder } from '../services/wilder';
import { getSkills } from '../services/skill';
import { ISkill } from '../types/ISkills';

interface WilderFormProps {
  loadWildersData: () => void;
}

type FormValues = {
  name: string;
  bio: string;
};

function NewWilderForm({ loadWildersData }: WilderFormProps) {
  const [skillsData, setSkillsData] = useState<ISkill[]>([]);
  const [isLaoding, setIsLaoding] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [open, setOpen] = useState(0);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setProcessing(true);
    try {
      await createWilder(formData);
      reset();
      loadWildersData();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const loadSkillsData = async () => {
    setIsLaoding(true);
    try {
      setSkillsData(await getSkills());
    } catch (err) {
      console.error(err);
    } finally {
      setIsLaoding(false);
    }
  };

  useEffect(() => {
    loadSkillsData();
  }, []);

  const skillsDataSelectOptions = skillsData.map((skill) => {
    return { value: skill.id, label: skill.name };
  });

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <div className='absolute left-44'>
      <Fragment>
        <Accordion open={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)}>
            Add a new Wilder
          </AccordionHeader>
          <AccordionBody className='h-96 w-64'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col items-center justify-center space-y-5'
            >
              <Input
                label='Name'
                type='text'
                id='name'
                disabled={processing}
                {...register('name')}
              />
              <Input
                label='Biography'
                type='text'
                id='bio'
                disabled={processing}
                {...register('bio')}
              />
              <Select
                className='w-64'
                options={skillsDataSelectOptions}
                isDisabled={isLaoding}
              />
              <Button type='submit' disabled={processing}>
                Add
              </Button>
            </form>{' '}
          </AccordionBody>
        </Accordion>
      </Fragment>
    </div>
  );
}

export default NewWilderForm;
