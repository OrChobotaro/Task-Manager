export function InputBar({currTask, setCurrTask}){
    return <input value={currTask} onChange={(e) => setCurrTask(e.target.value)}/>
}