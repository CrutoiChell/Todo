import s from './Input.module.css'
interface InputProps {
    list: string,
    setList: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: Function,
}

export function Input({ list, setList, handleAdd }: InputProps) {

    return (
        <section className={s.container}>
            <input
                type="text"
                value={list}
                onChange={e => setList(e.target.value)}
                placeholder="Create a new note..."
                className={s.input} 
            />
            <button className={s.btn} onClick={() => handleAdd(list)}>
                Add
            </button>
        </section>

    );
}