import React from 'react'
import Wrapper from "../assets/wrappers/FileInfo"

const FileInfo = ({name, updatedAt}) => {
  return (
    <div>
      <p>File Name: {name}</p>
      <p>Updated At: {updatedAt}</p>
    </div>
  );
}

export default FileInfo