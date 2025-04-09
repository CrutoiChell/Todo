import s from './CheckBox.module.css'

interface CheckBoxProps {
    isChecked: boolean,
    id: string,
    handleCheckBox: Function,
}

export function CheckBox({ isChecked, id, handleCheckBox }: CheckBoxProps) {

    return (
        <>
            <input
                id={id + '!'}
                type="checkbox"
                className={s.checkboxElement}
                checked={isChecked}
                onChange={() => handleCheckBox((id))}
            />
            <label htmlFor={id + '!'} className={s.checkboxWrapper}></label>
        </>
    );
}