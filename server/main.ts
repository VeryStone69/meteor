import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import "../imports/api/TasksPublications";
import "../imports/api/TasksMethods";
import {TaskType} from "/imports/types/TaskType";

type NewTask = Omit<TaskType, '_id'>;

const insertTask = async (taskText: string):Promise<void> => {
  const task: NewTask = {
    text: taskText,
    isChecked: false,
    createdAt: new Date(),
  };
  await TasksCollection.insertAsync(task);
};

Meteor.startup(async () => {
  if ((await TasksCollection.find().countAsync()) === 0) {
    [
      'Смайлик',
      'Цветок',
      'Солнце',
      'Футбол',
      'Айтигеник',
    ].forEach(insertTask);
  }
});