import express from 'express';
import cors from 'cors';
import wilderController from './controllers/wilderController';
import skillController from './controllers/skillController';
import dataSource from './utils';

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.post('/wilders', wilderController.createWilder);
app.get('/wilders', wilderController.getWilders);
app.get('/wilders/:id', wilderController.getWilder);
app.patch('/wilders/:id', wilderController.updateWilder);
app.delete('/wilders/:id', wilderController.deleteWilder);
app.post('/wilders/:wilderId/skills', wilderController.addSkill);
app.delete('/wilders/:wilderId/skills/:skillId', wilderController.deleteSkill);

app.post('/skills', skillController.createSkill);
app.get('/skills', skillController.getSkills);
app.get('/skills/:id', skillController.getSkill);
app.patch('/skills/:id', skillController.updateSkill);
app.delete('/skills/:id', skillController.deleteSkill);

const start = async (): Promise<void> => {
  await dataSource.initialize();
  app.listen(5000, () => console.log('Server started on 5000'));
};

void start();
