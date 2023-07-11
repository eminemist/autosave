import { useState } from "react";

import { debounce } from "lodash";


const Editor = () => {
  //const history = useHistory();

  const [file, setFile] = useState({
    title: "",
    content: "",
    date: "",
  });

const handleChangeWithLib = debounce((e) => {
    //fetch(`https://demo.dataverse.org/api/search?q=${value}`)
    //  .then((res) => res.json())
    //  .then((json) => setSuggestions(json.data.items));
     const { name, value } = e.target;
     setFile({ ...file, [name]: value });
    console.log(e.target.value)
  }, 500);

  

  return (
    <div className="editorPage">
      <textarea
        type="text"
        className="title"
        placeholder="Enter Title here..."
        onChange={(e) => handleChangeWithLib(e)}
      />
      <textarea
        type="text"
        className="search"
        placeholder="Enter something here..."
        onChange={(e) => handleChangeWithLib(e)}
      />
    </div>
  );
};

export default Editor;
