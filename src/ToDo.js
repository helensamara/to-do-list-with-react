import React from 'react'

export default function ToDo({toDo, toggleToDo}) {
    function handleToDoClick() {
        toggleToDo(toDo.id);
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={toDo.completed} onChange={handleToDoClick} />
                {toDo.name}
            </label>
        </div>
    )
}
