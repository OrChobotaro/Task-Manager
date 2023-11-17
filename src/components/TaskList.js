import { useState } from "react"
import { Button } from "./Button";

export function TaskList({taskList, setTaskList, isDone, setIsDone, idsList, setIdsList}) {
    
    async function handleDone (number) {

        const response = await fetch('/api/tasks/' + idsList[number], {
            method: 'PATCH'
        })

        if(response.ok){
            const newIsDone = isDone.slice();
            newIsDone[number]=true;
            setIsDone(newIsDone);
        }
    
    }

    async function handleDelete(number) {

        const response = await fetch('/api/tasks/' + idsList[number], {
            method: 'DELETE'
        })
        const json = await response.json();

        if(response.ok){

            const newList = taskList.slice();
            newList.splice(number, 1);
            setTaskList(newList);
            
            const newDone = isDone.slice();
            newDone.splice(number, 1);
            setIsDone(newDone);
    
            const newIds = idsList.slice();
            newIds.splice(number, 1);
            setIdsList(newIds);
        }
    }

    const tasks = taskList.map((task, number) => {
        return (
            <li key={number} style={{textDecoration: isDone[number]? 'line-through': ''}}>
                {task}
                <Button type="button" text="Done" handleClick={() => handleDone(number)} />
                <Button type="button" text="Delete" handleClick={() => handleDelete(number)} />
            </li>
        )
    });

    return (
        <ol>
            {tasks}
        </ol>
    )
    
}