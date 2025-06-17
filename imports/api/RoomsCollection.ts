import { Mongo } from 'meteor/mongo';
import {RoomType} from "/imports/types/RoomType";

// TasksCollection - база данных, в которую будут сохраняться задачи.
export const TasksCollection = new Mongo.Collection<RoomType>('tasks');