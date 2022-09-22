import { Fragment, useState, useEffect } from 'react';
import {
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  Checkbox,
} from '@material-tailwind/react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { createWilder, addSkillToWilder } from '../services/wilder';
import { getSkills } from '../services/skill';
import { ISkill } from '../types/ISkills';

interface WilderFormProps {
  loadWildersData: () => void;
}

type FormValues = {
  name: string;
  city: string;
  bio: string;
  skills: number[];
};

function AddWilderForm({ loadWildersData }: WilderFormProps) {
  const [open, setOpen] = useState(false);
  const [skillsData, setSkillsData] = useState<ISkill[]>([]);
  const [processing, setProcessing] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setProcessing(true);
    try {
      const { id } = await createWilder(formData);
      await Promise.all(
        formData.skills.map((skillId) =>
          addSkillToWilder(id, parseInt(skillId as unknown as string))
        )
      );
      loadWildersData();
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const loadSkillsData = async () => {
    try {
      setSkillsData(await getSkills());
    } catch (err) {
      console.error(err);
    } finally {
    }
  };

  useEffect(() => {
    loadSkillsData();
  }, []);

  const handleOpen = () => setOpen(!open);

  return (
    <Fragment>
      <Button onClick={handleOpen} variant='gradient'>
        Add a Wilder
      </Button>
      <Dialog open={open} size={'xs'} handler={handleOpen}>
        <DialogHeader className='text-center'>Add a new Wilder</DialogHeader>
        <DialogBody divider className='flex justify-center'>
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
              label='City'
              type='text'
              id='City'
              disabled={processing}
              {...register('city')}
            />
            <Input
              label='Biography'
              type='text'
              id='bio'
              disabled={processing}
              {...register('bio')}
            />
            <div className='grid-flow-col space-x-3'>
              <p>Add skill to your Wilder</p>
              {skillsData.map((skill) => (
                <Checkbox
                  key={skill.id}
                  label={skill.name}
                  value={skill.id}
                  {...register('skills')}
                />
              ))}
            </div>
            <div className='flex items-end'>
              <Button
                variant='text'
                color='red'
                onClick={handleOpen}
                className='mr-1'
              >
                <span>Cancel</span>
              </Button>
              <Button
                type='submit'
                disabled={processing}
                variant='gradient'
                color='green'
                onClick={handleOpen}
              >
                <span>Confirm</span>
              </Button>
            </div>
          </form>
        </DialogBody>
      </Dialog>
    </Fragment>
  );
}

export default AddWilderForm;
