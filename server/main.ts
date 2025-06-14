import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import "../imports/api/TasksPublications";
import "../imports/api/TasksMethods";

const insertTask = async (taskText: string) => {
  await TasksCollection.insertAsync({ text: taskText });
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