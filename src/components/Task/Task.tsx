import { CheckBox } from "../CheckBox/CheckBox"
import s from './Task.module.css'

interface TaskProps {
  id: string,
  text: string,
  isEdit: boolean,
  isChecked: boolean,
  handleDelete: (id: string) => void,
  handleEdit: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void,
  handleToggle: (id: string) => void,
  handleCheckBox: (id: string) => void,
}

export function Task({ id, text, isEdit, isChecked, handleDelete, handleEdit, handleToggle, handleCheckBox }: TaskProps) {
  return (
    <li className={s.container} key={id}>
      <div className={s.right}>
        <CheckBox isChecked={isChecked} id={id} handleCheckBox={handleCheckBox} />
        {isEdit ? (
          <input
            className={isChecked ? s.inputCheked : s.input}
            value={text}
            onChange={(event) => handleEdit(id, event)}
          />
        ) : (
          <p className={isChecked ? s.cheked : s.nocheked}><b>{text}</b></p>
        )}
      </div>
      <div className={s.left}>
        <button className={s.btnEdit} onClick={() => handleToggle(id)}>{isEdit ? 'Save' : 'Edit'}</button>
        <button className={s.btnTrash} onClick={() => handleDelete(id)}>Delete</button>
      </div>
    </li>
  )
}