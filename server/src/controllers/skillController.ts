import dataSource from '../utils'
import Skill from '../entity/Skill';
import IController from '../../types/IController';


const skillController: IController = {
  createSkill: async (req, res) => {
    const { name } = req.body;
    const isNameExist = await dataSource
      .getRepository(Skill)
      .findOneBy({ name });

    console.log(isNameExist);

    if (name.length > 100 || name.length === 0) {
      return res.status(422).send('Min. 1 character , Max. 100 characters');
    }

    if (isNameExist !== null) {
      return res.status(409).send('This name already exist');
    }

    try {
      const createdSkill = await dataSource.getRepository(Skill).save({ name });
      res.status(201).send(createdSkill);
    } catch (err) {
      res.send('Error while created Skill');
    }
  },

  getSkills: async (req, res) => {
    const skills = await dataSource.getRepository(Skill).find();

    try {
      res.send(skills);
    } catch (err) {
      res.send('error while finding Skills');
    }
  },

  getSkill: async (req, res) => {
    const skill = await dataSource
      .getRepository(Skill)
      .findOneBy({ id: parseInt(req.params.id) });

    try {
      if (skill === null) {
        res.sendStatus(404);
      } else {
        res.send(skill);
      }
    } catch (err) {
      res.send('error while finding Skill');
    }
  },

  updateSkill: async (req, res) => {
    const { name } = req.body;

    if (name?.length > 100 || name?.length === 0) {
      return res.status(422).send('Min. 1 character , Max. 100 characters');
    }

    try {
      const { affected } = await dataSource
        .getRepository(Skill)
        .update(req.params.id, req.body);

      if (affected !== null) {
        res.send('Skill updated 👍');
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.send('error while updating Skill');
    }
  },

  deleteSkill: async (req, res) => {
    try {
      const { affected } = await dataSource
        .getRepository(Skill)
        .delete(req.params.id);

      if (affected !== null) {
        res.send('Skill deleted ❌');
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.send('error while updating Skill');
    }
  },
};

export default skillController