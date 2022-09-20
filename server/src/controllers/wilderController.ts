import dataSource from '../utils'
import Wilder from '../entity/Wilder'
import Skill from '../entity/Skill'
import IController from '../../types/IController';

const wilderController: IController = {
  // Créer un wilder
  createWilder: async (req, res) => {
    const { name, bio } = req.body;

    if (name.length > 100 || name.length === 0) {
      return res.status(422).send('Min. 1 character , Max. 100 characters');
    }

    if (bio.length > 500) {
      return res.status(422).send('Max. 500 characters');
    }

    try {
      const createdWilder = await dataSource
        .getRepository(Wilder)
        .save({ name, bio });
      res.status(201).send(createdWilder);
    } catch (err) {
      res.send('Error while created wilder');
    }
  },

  // Lister tout les Wilders
  getWilders: async (req, res) => {
    const wilders = await dataSource.getRepository(Wilder).find();

    try {
      res.send(wilders);
    } catch (err) {
      res.send('error while finding wilders');
    }
  },

  // Retrouver un Wilder par son ID
  getWilder: async (req, res) => {
    const wilder = await dataSource
      .getRepository(Wilder)
      .findOneBy({ id: parseInt(req.params.id) });

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
    const { name } = req.body;

    if (name.length > 100 || name.length === 0) {
      return res.status(422).send('Min. 1 character , Max. 100 characters');
    }

    try {
      const { affected } = await dataSource
        .getRepository(Wilder)
        .update(req.params.id, req.body);

      if (affected !== null) {
        res.send('wilder updated 👍');
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.send('error while updating wilder');
    }
  },

  // Supprimer un Wilder
  deleteWilder: async (req, res) => {
    try {
      const { affected } = await dataSource
        .getRepository(Wilder)
        .delete(req.params.id);

      if (affected !== null) {
        res.send('wilder deleted ❌');
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      res.send('error while deleting wilder');
    }
  },

  // Ajouter un skill
  addSkill: async (req, res) => {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(req.params.wilderId) });

      if (wilderToUpdate === null) {
        return res.sendStatus(404);
      }

      const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({ id: req.body.id });

      if (skillToAdd === null) {
        return res.sendStatus(404);
      }

      if (
        wilderToUpdate.skills.map((skill) => skill.id).includes(skillToAdd.id)
      ) {
        res
          .status(409)
          .send(`The Wilder already have ${skillToAdd.name} skill`);
      } else {
        wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
        await dataSource.getRepository(Wilder).save(wilderToUpdate);
        res.send(`${skillToAdd.name} skill has been added 👍`);
      }
    } catch (err) {
      res.send('error while adding skill');
    }
  },

  // Supprimer un skill
  deleteSkill: async (req, res) => {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(req.params.wilderId) });

      if (wilderToUpdate === null) {
        return res.sendStatus(404);
      }

      const skillToDelete = await dataSource
        .getRepository(Skill)
        .findOneBy({ id: parseInt(req.params.skillId) });

      if (skillToDelete === null) {
        return res.sendStatus(404);
      }

      if (
        wilderToUpdate.skills
          .map((skill) => skill.id)
          .includes(skillToDelete.id)
      ) {
        const skillToDeleteiD = parseInt(req.params.skillId, 10);

        wilderToUpdate.skills = wilderToUpdate.skills.filter(
          (s: number) => s.id !== skillToDeleteiD
        );

        await dataSource.getRepository(Wilder).save(wilderToUpdate);
        res.send(`${skillToDelete.name} skill has been deleted ❌`);
      } else {
        res.status(409).send(`The Wilder don't have ${skillToDelete.name} skill`);
      }
    } catch (err) {
      console.log(err);
      res.send('error while deleting skill');
    }
  },
};


export default wilderController