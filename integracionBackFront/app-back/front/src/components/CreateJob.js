import CreateForm from "./CustomHooks";
import React, {useEffect} from 'react';
import * as Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  company: Joi.string().required(),
  city: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  salary : Joi.number().required()
}).with("password", "repeat_password");

function CreateJob() {

  useEffect(() => {
    const url = "/offers";
    fetch(url)
      .then(res => {
        return res.json();
      });
  },[])

    const { handleSubmit, handleInputChange } = CreateForm(schema);

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={handleInputChange}
              name="name"
            />
          </div>
  
          <div>
          <label htmlFor="company">Company</label>
            <input
              type="text"
              id="company"
              name="company"
              onChange={handleInputChange}
            />
          </div>

          <div>
          <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              onChange={handleInputChange}
            />
          </div>
  
          <div>
          <label htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
  
  export default CreateJob;