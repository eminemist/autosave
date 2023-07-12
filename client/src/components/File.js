import React from 'react'
import Wrapper from "../assets/wrappers/File"
import FileInfo from './FileInfo'
import Editor from "../pages/dashboard/Editor.js"
const handleChange = (()=>{
    Editor()
})

const File = ({name}) => {
  return (
    <Wrapper>
      <FileInfo />
      <button onClick={handleChange()}>Click to edit</button>
    </Wrapper>
  );
}

export default File