import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helpers/Wrapper";

const AddUser = (props) => {
  //Refs set up a connection between an HTML element and our other
  // javascript code. Can only be used in functional components.
  // uncontrolled metod as inputs on ref are not controlled by react
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    //Set value you received from the ref
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (no empty values).",
      });
      return;
    }
    // by putting a plus in front of the string, it ensures it is an int.
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid Age",
        message: "Please enter a valid age (must be greater than zero).",
      });
      return;
    }
    // need to lift up the state to the app.js component
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      <div className={classes.backdrop}>
        {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            onConfirm={errorHandler}
          />
        )}
        <Card className={classes.input}>
          <form onSubmit={addUserHandler}>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" ref={nameInputRef} />
            <label htmlFor="age">Age (years)</label>
            <input id="age" type="number" ref={ageInputRef} />
            <Button type="submit">Add User</Button>
          </form>
        </Card>
      </div>
    </Wrapper>
  );
};
export default AddUser;
