import dataSource from '../utils'
import Wilder from '../entity/Wilder'
import Skill from '../entity/Skill'
import IController from '../types/IController';
import Grade from '../entity/Grade';

const wilderController: IController = {
  // Créer un wilder
  createWilder: async (req, res) => {
    const { name, bio, city } = req.body;

    if (name?.length > 100 || name?.length === 0) {
      return res.status(422).send('Min. 1 character , Max. 100 characters');
    }

    if (city?.length > 100 || city?.length === 0) {
      return res.status(422).send('Min. 1 character , Max. 100 characters');
    }

    if (bio?.length > 500) {
      return res.status(422).send('Max. 500 characters');
    }

    try {
      const createdWilder = await dataSource
        .getRepository(Wilder)
        .save({ name, bio, city });
      res.status(201).send(createdWilder);
    } catch (err) {
      res.send('Error while created wilder');
    }
  },

  // Lister tout les Wilders
  getWilders: async (req, res) => {
    const wilders = await dataSource.getRepository(Wilder).find({ relations: { grades: { skills: true } } });

    try {
      res.send(wilders.map(w => ({ ...w, grades: undefined, skills: w.grades.map(g => ({ id: g.skills.id, name: g.skills.name, votes: g.votes })) })));
    } catch (err) {
      res.send('error while finding wilders');
    }
  },

  // Retrouver un Wilder par son ID
  getWilder: async (req, res) => {
    const wilder = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: parseInt(req.params.id, 10) });

    try {
      if (wilder === null) {
        res.sendStatus(404);
      } else {
        res.send(wilder);
      }
    } catch (err) {
      res.send('error while finding wilder');
    }
  },

  // Mettre à jour un Wilder
  updateWilder: async (req, res) => {
    const { name, bio, city } = req.body;

    const wilder = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: parseInt(req.params.id, 10) });

    if (wilder === null) {
      return res.sendStatus(404);
    }

    if (name?.length > 100 || name?.length === 0) {
      return res.status(422).send('Min. 1 character , Max. 100 characters');
    }

    if (city?.length > 100 || city?.length === 0) {
      return res.status(422).send('Min. 1 character , Max. 100 characters');
    }

    if (bio?.length > 500) {
      return res.status(422).send('Max. 500 characters');
    }

    try {
      const { affected } = await dataSource
        .getRepository(Wilder)
        .update(req.params.id, req.body);

      if (affected !== null) {
        res.send(`${wilder.name} has been updated 👍`);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.send('error while updating wilder');
    }
  },

  // Supprimer un Wilder
  deleteWilder: async (req, res) => {

    const wilder = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: parseInt(req.params.id, 10) });

    if (wilder === null) {
      return res.sendStatus(404);
    }

    try {
      const { affected } = await dataSource
        .getRepository(Wilder)
        .delete(req.params.id);

      if (affected !== null) {
        res.send(`${wilder.name} has been deleted ❌`);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.send('error while deleting wilder');
    }
  },

  // Ajouter un skill
  addSkill: async (req, res) => {
    const wilder = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: parseInt(req.params.wilderId, 10) });

    if (wilder === null) {
      return res.sendStatus(404);
    }

    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(req.params.wilderId, 10) });

      const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({ id: req.body.id });

      if (wilderToUpdate === null) {
        return res.sendStatus(404);
      }

      if (skillToAdd === null) {
        return res.sendStatus(404);
      }

      await dataSource.getRepository(Grade).insert({ wilders: wilderToUpdate, skills: skillToAdd });
      res.send(`${skillToAdd.name} skill has been added 👍`);

    } catch (err) {
      res.send('error while adding skill');
    }
  },

  // Supprimer un skill
  deleteSkill: async (req, res) => {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(req.params.wilderId, 10) });

      if (wilderToUpdate === null) {
        return res.sendStatus(404);
      }

      const skillToDelete = await dataSource
        .getRepository(Skill)
        .findOneBy({ id: parseInt(req.params.skillId, 10) });

      if (skillToDelete === null) {
        return res.sendStatus(404);
      }

      await dataSource.getRepository(Grade).delete({ wildersId: wilderToUpdate.id, skillsId: skillToDelete.id });
      res.send(`${skillToDelete.name} skill has been deleted ❌`);
    }
    catch (err) {
      console.log(err);
      res.send('error while deleting skill');
    }
  },
};


export default wilderController