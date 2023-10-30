import {useRef } from "react";
import { AiOutlineSearch, AiOutlineDelete } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

function TodoSearch(props) {

  const handleSearch = (event) => {
    event.preventDefault();
    props.setSearchTerm(event.target[0].value);
  };

  const handleReset = (event) => {
    event.preventDefault();
    event.target[0].value = "";
    props.setSearchTerm("");
  }

  const inputRef = useRef(null);

  return (
    <form onSubmit={handleSearch} onReset={handleReset} className="todo-formSearch">
      <input
        placeholder="Add a todo"
        name="text"
        className="todo-inputSearch"
        ref={inputRef}
      />
      <button  type="Submit" className="todo-button edit">
        <AiOutlineSearch />
      </button>
      <button  type="reset" className="todo-button delete">
        <MdDeleteOutline />
      </button>
    </form>
  );
}

export default TodoSearch;