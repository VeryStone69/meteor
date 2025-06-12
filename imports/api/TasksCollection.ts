import { Mongo } from 'meteor/mongo';
import {TaskType} from "/imports/ui/App";

export const TasksCollection = new Mongo.Collection<TaskType>('tasks');
