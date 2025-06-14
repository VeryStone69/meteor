import { Mongo } from 'meteor/mongo';
import {TaskType} from "/imports/types/TaskType";

// TasksCollection - база данных, в которую будут сохраняться задачи.
export const TasksCollection = new Mongo.Collection<TaskType>('tasks');
