import React, {
    useRef
} from 'react';

export default function EditWorker({
    SubmitForm,
    formRef,
    modalClose
}) {
    const dateOfEmployment = useRef();
    const dateOfDismissal = useRef();

    const validData = {
        name: true,
        surname: true,
        patronymic: true,
        dateOfBirth: true,
        dateOfEmployment: true,
        dateOfDismissal: true
    }

    const checkValid = (obj) => {
        for (let key in obj) {
            if (!obj[key])
                return (false)
        }
        return true
    };

    const validName = (e) => {
        const regEx = /^([А-Я]{1}[а-яё]{1,23}|[A-Z]{1}[a-z]{1,23})$/;
        if (e.target.value.length < 20 && regEx.test(e.target.value) === true) {
            validData[e.target.name] = true
            e.target.classList.remove('invalid');
        } else {
            validData[e.target.name] = false;
            e.target.classList.add('invalid');
        }
    };

    const validDate = e => {
        const minDate = new Date('1900-01-01');
        const now = new Date();
        const dateForm = new Date(e.target.value);
        if (dateForm <= now && dateForm > minDate) {
            validData[e.target.name] = true;
            e.target.classList.remove('invalid');
            if (e.target.name === 'dateOfEmployment')
                validDataOfEmployment(dateForm);
            if (e.target.name === 'dateOfDismissal')
                validDateOfDismissal(dateForm);
        } else if ((e.target.name === 'dateOfDismissal') && e.target.value === '') {
            validData[e.target.name] = true;
            e.target.classList.remove('invalid');
        } else {
            validData[e.target.name] = false;
            e.target.classList.add('invalid');
        }
    };

    const validDataOfEmployment = (dateForm) => {
        const formDateOfDismissal = new Date(dateOfDismissal.current.value);
        if (dateForm > formDateOfDismissal) {
            validData.dateOfDismissal = false;
            dateOfDismissal.current.classList.add('invalid');
        }
    }
    const validDateOfDismissal = (dateForm) => {
        const formDataOfEmployment = new Date(dateOfEmployment.current.value);
        if (dateForm < formDataOfEmployment) {
            validData.dateOfDismissal = false;
            dateOfDismissal.current.classList.add('invalid');
        }
    }

    const handlerForm = (e) => {
        e.preventDefault();
        if (checkValid(validData)) {
            SubmitForm(e.target);
            e.target.reset();
            modalClose(false);
        }
    };
    return (
        <div className='cardWorker'>
            <h2 className='form-title'>Добавить сотрудника</h2>
            <form ref={formRef} className='form' onSubmit = {handlerForm}>
                <label htmlFor='surname' > Фамилия:</label>
                <input  className='input' onBlur={validName} name='surname' type='text' required></input>
                <label className='label-input_marg' htmlFor='surname'>Имя:</label>
                <input className='input' onBlur={validName} name='name' type='text' required></input>
                <label className='label-input_marg' htmlFor='patronymic'>Отчество:</label>
                <input className='input' onBlur={validName} name='patronymic' type='text' required></input>
                <label className='label-input_marg' htmlFor='position'>Должность:</label>
                <select className='input' name='position' required>
                    <option>HR</option>
                    <option>developer JS</option>
                    <option>developer C#</option>
                    <option>developer Python</option>
                </select>              
                <label className='label-input_marg' htmlFor='dateOfBirth'>Дата рождения:</label>
                <input className='input' onBlur={validDate} name='dateOfBirth' type='date' required></input>
                <label className='label-input_marg title-radio' htmlFor='gender'>Пол:</label>
                    <div className='radio-box'>
                        <label htmlFor='gender'> Мужской:{'\u00A0'}
                        <input className='radio' type='radio' name='gender' value='Мужской' required />
                        </label>
                        <label htmlFor='gender'>Женский:{'\u00A0'}
                        <input className='radio' type='radio' name='gender' value='Женский' required/>
                        </label> 
                    </div>       
                <label className='label-input_marg'  htmlFor='dateOfEmployment'>Дата приема на работу:</label>
                <input className='input' ref={dateOfEmployment} onBlur={validDate} name='dateOfEmployment' type='date' required></input>
                <label className='label-input_marg' htmlFor='dateOfDismissal'>Дата увольнения:</label>
                <input className='input' ref={dateOfDismissal} onBlur={validDate} name='dateOfDismissal' type='date'></input>
                <label className='label-input_marg titlte-checbox' htmlFor='driver'>
                    Наличие прав:{'\u00A0'}
                    <input className='radio' name='driver' type='checkbox'></input>
                </label>
                <button className='btn btn-form' type='submit'>Добавить</button> 
            </form>
        </div>
    );
}