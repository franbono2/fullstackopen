/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import Select from "react-select";
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries";

const BirthForm = (props) => {
  const [selectedName, setSelectedName] = useState(null);
  const [born, setBorn] = useState("");
  const options = props.authorNames.map((name) => {
    return { value: name, label: name };
  });
  const [changeBirth, result] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.error("person not found");
    }
  }, [result.data]);

  const submit = (event) => {
    event.preventDefault();

    const bornToInt = Number(born);
    changeBirth({
      variables: { name: selectedName.value, setBornTo: bornToInt },
    });

    setSelectedName(null);
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={selectedName}
            onChange={setSelectedName}
            options={options}
          />
        </div>
        <div>
          born{" "}
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default BirthForm;
