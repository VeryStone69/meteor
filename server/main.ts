import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/RoomsCollection';
import "../imports/api/RoomsPublications";
import "../imports/api/RoomsMethods";
import {RoomType} from "/imports/types/RoomType";

type NewTask = Omit<RoomType, '_id'>;

const insertRoom = async (taskText: string):Promise<void> => {
  const task: NewTask = {
    text: taskText,
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
    ].forEach(insertRoom);
  }
});