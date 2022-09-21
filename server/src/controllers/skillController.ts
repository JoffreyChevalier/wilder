import dataSource from '../utils'
import Skill from '../entity/Skill';
import IController from '../types/IController';


const skillController: IController = {
  createSkill: async (req, res) => {
    const { name } = req.body;
    const isSkillExist = await dataSource
      .getRepository(Skill)
      .findOneBy({ name });

    if (isSkillExist !== null) {
      return res.status(409).send('This skill already exist');
    }

    if (name.length > 100 || name.length === 0) {
      return res.status(422).send('Min. 1 character , Max. 100 characters');
    }


    try {
      const createdSkill = await dataSource.getRepository(Skill).save({ name });
      res.status(201).send(createdSkill);
    } catch (err) {
      res.send('Error while created skill');
    }
  },

  getSkills: async (req, res) => {
    const skills = await dataSource.getRepository(Skill).find();

    try {
      res.send(skills);
    } catch (err) {
      res.send('error while finding skills');
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
      res.send('error while finding skill');
    }
  },

  updateSkill: async (req, res) => {
    const { name } = req.body;

    const isSkillExist = await dataSource
      .getRepository(Skill)
      .findOneBy({ id: parseInt(req.params.id) });

    if (isSkillExist === null) {
      return res.status(404).send("This skill don't exist");
    }

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
      res.send('error while updating skill');
    }
  },

  deleteSkill: async (req, res) => {

    const isSkillExist = await dataSource
      .getRepository(Skill)
      .findOneBy({ id: parseInt(req.params.id) });

    if (isSkillExist === null) {
      return res.status(404).send("This skill don't exist");
    }

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
      res.send('error while deleting skill');
    }
  },
};

export default skillController