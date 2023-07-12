import React from 'react'
import Wrapper from "../assets/wrappers/FileInfo"

const FileInfo = ({title, updatedAt}) => {
  return (
    <div>
      <p>File Name: {title}</p>
      <p>Updated At: {updatedAt}</p>
    </div>
  );
}

export default FileInfo