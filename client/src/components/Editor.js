//import { useEffect, useState, useCallback } from "react";

import {debounce} from 'lodash'


 //import { DebounceInput } from 'react-debounce-input';


const Editor = () => {
  //const [suggestions, setSuggestions] = useState("");

  // Method 1 - from scratch
  // const debounce = (func) => {
  //   let timer;
  //   return function (...args) {
  //     const context = this;
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       timer = null;
  //       func.apply(context, args);
  //     }, 500);
  //   };
  // };
  // const handleChange = (value) => {
  //   fetch(`https://demo.dataverse.org/api/search?q=${value}`)
  //     .then((res) => res.json())
  //     .then((json) => setSuggestions(json.data.items));
  // };
  //const optimizedFn = useCallback(debounce(handleChange), []);

 // Method 2 - using lodash
  const handleChangeWithLib = debounce((value) => {
    console.log(value)
  }, 500);
  return (
    <>
      <h2 style={{ textAlign: "center" }}>FileName</h2>

      {/* Method 1 - from scratch */}
      {/* <input
        type="text"
        className="search"
        placeholder="Enter something here..."
        onChange={(e) => optimizedFn(e.target.value)}
      /> */}

      {/* Method 2 - using lodash */}
      <textarea
        type="text"
        className="textInput"
        placeholder="Your text goes here..."
        onChange={(e) => handleChangeWithLib(e.target.value)}
      />

      {/* Method 3 - using react-debounce-input */}
      {/* <DebounceInput
        minLength={2}
        className="search"
        placeholder="Enter something here..."
        debounceTimeout={500}
        onChange={e => handleChange(e.target.value)} /> */}

      
    </>
  );
}

export default Editor