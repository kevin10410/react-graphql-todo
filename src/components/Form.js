import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Form = props => {
  const submitHandler = e => {
    e.preventDefault();
    props.addTaskHandler();
  };

  const inputChanged = e => {
    props.inputChangeHandler(e.target.value)
  };

  if (props.error) return <p>Error...</p>

  if (props.loading) return (
    <h2 className="label-wrapper">
      <FontAwesomeIcon
        spin
        size="2x"
        icon={faSpinner}
      />
    </h2>
  );

  return (
    <form onSubmit={submitHandler}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input className="input input__lg"
        id="new-todo-input"
        type="text"
        name="text"
        autoComplete="off"
        value={props.name}
        onChange={inputChanged}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
};

export default Form;
