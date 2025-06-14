import React, {FormEvent, useState} from "react";
import {Meteor} from 'meteor/meteor';
import {TaskInsertInput} from "/imports/types/TaskType";

export const TaskForm = () => {
    const [text, setText] = useState<string>("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!text) return;

        const doc: TaskInsertInput = {
            text: text.trim(),
            isChecked: false,
            createdAt: new Date(),
        };

        await Meteor.callAsync("tasks.insert", doc);
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