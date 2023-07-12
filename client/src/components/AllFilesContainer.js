import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import File from "./File";
import Wrapper from "../assets/wrappers/AllFilesContainer";

const AllFilesContainer = () => {
  const { getAllFiles, isLoading, totalFiles } = useAppContext();

  useEffect(() => {
    getAllFiles();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  
  if (Object.keys(totalFiles).length === 0) {
    return <h2>No Files to display....</h2>;
  }


  return (
    <Wrapper>
      <h5>
        {totalFiles.length}
        {totalFiles.length > 1 && "s"} Found.....
      </h5>
      <div>
        {totalFiles.map((file) => {
          return <File key={file._id} {...file} />;
        })}
      </div>
    </Wrapper>
  );
};

export default AllFilesContainer;