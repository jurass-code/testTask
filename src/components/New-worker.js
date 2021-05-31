import React from 'react';

export default function ListWorker({
    array,
    deleteWorker,
    editWorker
}) {
    return (
            array.map((item, index) => {
                    const classRow = index%2===0?' evenRow': ' oddRow';
                    return (
                <tr className={classRow} key={'list' + index}>
                        <td key={'name' + index} className='table__td'>{item.surname +' ' + item.name + ' ' + item.patronymic}</td>
                        <td key={'position' + index} className='table__td'>{item.position}</td>
                        <td key={'dateOfBirth' + index} className='table__td'>{item.dateOfBirth}</td>
                        <td key={'gender' + index} className='table__td'>{item.gender}</td>
                        <td key={'dateOfEmployment' + index} className='table__td'>{item.dateOfEmployment}</td>
                        <td key={'dateOfDismissal' + index} className='table__td'>{item.dateOfDismissal}</td>
                        <td key={'driver' + index} className='table__td'>{item.driver}</td>
                        <td><button className={'btn btn-edit'+classRow} onClick={()=>editWorker(item.id)}><i className="fas fa-user-edit"></i></button></td>
                        <td><button className={'btn btn-del'+classRow} onClick={()=>deleteWorker(item.id)}><i className="fas fa-window-close"></i></button></td>
                </tr>
            )
        })
    )
}