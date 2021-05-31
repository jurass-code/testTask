import React from 'react';

export default function ListWorker({
    setActive,
    content
}) {
    return (
    <div>
        <table className='table' cols='10'>
            <thead>
                <tr className='table__title-row'>
                    <td className="table__td table__title">ФИО</td>
                    <td className="table__td table__title">Должность</td>
                    <td className="table__td table__title">Дата рождения</td>
                    <td className="table__td table__title">Пол</td>
                    <td className="table__td table__title">Дата приема на работу</td>
                    <td className="table__td table__title">Дата увольнения</td>
                    <td className="table__td table__title">Наличие прав</td>
                    <td colSpan='2' ><button className='btn btn-add' onClick={()=>{setActive(true)}}><i className="fas fa-user-plus"></i></button></td>
                </tr>
            </thead>
            <tbody>
                {content}
            </tbody>
        </table>
    </div>)
}