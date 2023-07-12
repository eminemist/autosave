import React from 'react'
import { useNavigate } from "react-router-dom";

import Wrapper from "../assets/wrappers/File"
import FileInfo from './FileInfo'

const File = ({title, updatedAt, _id}) => {

   const navigate = useNavigate();

   const handleChange = () => {
     return navigate("/editor", {state: {id: _id}});
   };

  return (
    <Wrapper>
      <FileInfo title={title} updatedAt={updatedAt} />
      <button onClick={handleChange}>Click to edit</button>
    </Wrapper>
  );
}

export default File