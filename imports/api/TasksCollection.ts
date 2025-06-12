import { Mongo } from 'meteor/mongo';

export type TasksCollectionType = {
  _id: number;
  text: string;
}

export const TaskCollection = new Mongo.Collection<TasksCollectionType>('tasks');
