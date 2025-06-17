import {Meteor} from "meteor/meteor";
import {RoomsCollection} from "./RoomsCollection";
import type {RoomInsertInputType} from "/imports/types/RoomType";
import {check} from "meteor/check";


Meteor.methods({
    "rooms.insert"(doc: RoomInsertInputType) {
        // (doc)- Аргумент метода. Это будет объект, переданный клиентом.
        return RoomsCollection.insertAsync(doc);

    },
    "rooms.updateGrid"({_id, grid}: { _id: string; grid: number[][] }) {
        check(_id, String);
        check(grid, Array);
        return RoomsCollection.updateAsync(_id, {
            $set: {grid},
        });
    },
    "rooms.delete"({_id}: { _id: string }) {
        return RoomsCollection.removeAsync(_id);
    },
});