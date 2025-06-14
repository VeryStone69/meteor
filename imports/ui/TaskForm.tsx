import React, {FormEvent, useState} from "react";
import {Meteor} from 'meteor/meteor';

type InsertTaskArgsType = {
    text: string;
    createdAt: Date;
};

export const TaskForm = () => {
    const [text, setText] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!text) return;

        await Meteor.callAsync("tasks.insert", {
            text: text.trim(),
            createdAt: new Date(),
        } as InsertTaskArgsType);

        setText("");
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type to add new tasks"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button type="submit">Add Task</button>
        </form>
    );
};