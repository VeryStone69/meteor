import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';


const insertTask = (taskText:string) => TasksCollection.insert({ text: taskText });

Meteor.startup(() => {
  if (TasksCollection.find().count() === 0) {
    [
      'Смайлик',
      'Цветок',
      'Third Task',
      'Солнце',
      'Футбол',
      'Айтигеник',
    ].forEach(insertTask)
  }
});