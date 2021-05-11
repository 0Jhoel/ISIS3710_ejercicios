import { useState } from "react";

const CreateForm = (schema) => {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState("");

  const url = "/offers";

  const handleSubmit = (event) => {
    event.preventDefault();
    const { error } = validate();
    if (!error) {
        
        fetch(url,{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(inputs)})
          .then(res => {
            console.log( res.json());
            console.log("Form submitted");
          });
    } else {
      console.log(error);
      setErrors(error);
    }
  };

  const handleInputChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const validate = () => {
    return schema.validate(inputs);
  };

  return { handleSubmit, handleInputChange, errors };
};

export default CreateForm;
