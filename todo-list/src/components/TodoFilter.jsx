import React from "react";
import { FaCircle, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";


function TodoFilter({ showAll, showPending, showCompleted, setShowAll, setShowPending, setShowCompleted }) {
    const handleShowAll = () => {
        setShowAll(true);
        setShowPending(false);
        setShowCompleted(false);
    };

    const handleShowPending = () => {
        setShowAll(false);
        setShowPending(true);
        setShowCompleted(false);
    };

    const handleShowCompleted = () => {
        setShowAll(false);
        setShowPending(false);
        setShowCompleted(true);
    };

    return (
        <div className="todo-formSearch">
            <button onClick={handleShowAll} className={showAll ? "todo-button active" : "todo-button filterButton"}>
                <FaCircle />
            </button>
            <button onClick={handleShowPending} className={showPending ? "todo-button active" : "todo-button filterButton"}>
                <FaExclamationCircle />
            </button>
            <button onClick={handleShowCompleted} className={showCompleted ? "todo-button active" : "todo-button filterButton"}>
                <FaCheckCircle />
            </button>
        </div>
    );
}

export default TodoFilter;
