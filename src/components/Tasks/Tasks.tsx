import { Task } from "../Task/Task";
import { ITask } from "../../App";

interface TasksProps {
    arr: ITask[],
    handleDelete: (id: string) => void,
    handleEdit: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void,
    handleToggle: (id: string) => void,
    handleCheckBox: (id: string) => void,
}

export function Tasks({ arr, handleDelete, handleEdit, handleToggle, handleCheckBox }: TasksProps) {
    return (
        <ul>
            {arr.map(el => {
                return (
                    <Task
                        key={el.id}
                        id={el.id}
                        text={el.text}
                        isEdit={el.isEdit}
                        isChecked={el.isChecked}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        handleToggle={handleToggle}
                        handleCheckBox={handleCheckBox}
                    />
                )
            })}
        </ul>
    );
}