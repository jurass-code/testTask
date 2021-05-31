import React from 'react';

export default function Modal({
    active,
    setActive,
    content
}) {
    return (
    <div className={active ? 'modal active':'modal'} onClick={() => setActive(false)}>
        <div className={active ? 'modal__content active':'modal__content'} onClick={e=> e.stopPropagation()}>
            {content}
        </div>
    </div>
    );
}