import React from "react";
import { FaCircle, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";


function TodoFilter({ showAll, showPending, showCompleted, showReminders, setShowAll, setShowPending, setShowCompleted, setShowReminders }) {
    const handleShowAll = () => {
        setShowAll(true);
        setShowPending(false);
        setShowCompleted(false);
        setShowReminders(false);
    };

    const handleShowPending = () => {
        setShowAll(false);
        setShowPending(true);
        setShowCompleted(false);
        setShowReminders(false);
    };

    const handleShowCompleted = () => {
        setShowAll(false);
        setShowPending(false);
        setShowCompleted(true);
        setShowReminders(false);
    };

    const handleShowReminders = () => {
        setShowAll(false);
        setShowPending(false);
        setShowCompleted(false);
        setShowReminders(true);
    };
      

    return (
        <div className="todo-formSearch">
            <button onClick={handleShowAll} className={showAll ? "todo-button active" : "todo-button filterButton"}>
                <FaCircle />
            </button>
            <button onClick={handleShowPending} className={showPending ? "todo-button active" : "todo-button filterButton"}>
                <FaExclamationCircle />
            </button>            
            <button onClick={handleShowReminders} className={showReminders ? "todo-button active" : "todo-button filterButton"}
                ><FaExclamationCircle />
            </button>
            <button onClick={handleShowCompleted} className={showCompleted ? "todo-button active" : "todo-button filterButton"}>
                <FaCheckCircle />
            </button>
        </div>
    );
}

export default TodoFilter;
