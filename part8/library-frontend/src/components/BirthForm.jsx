import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries";

const BirthForm = () => {
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");

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
    changeBirth({ variables: { name, setBornTo: bornToInt } });

    setName("");
    setBorn("");
  };

  return (
    <div>
      <h2>Set birthyear</h2>

      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
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
