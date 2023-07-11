import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import Loading from "./Loading";
import File from "./File";
import Wrapper from "../assets/wrappers/Navbar";

const AllFilesContainer = () => {
  const { getAllFiles, isLoading, files, totalFiles } = useAppContext();

  useEffect(() => {
    getAllFiles();
  }, []);
  //console.log(totalFiles.data[0]);
  if (isLoading) {
    return <Loading center />;
  }
  if (Object.keys(totalFiles).length === 0) {
    return <h2>No Files to display....</h2>;
  }
  return (
    <>
      <File />
      <h5>
        {Object.keys(totalFiles).length} File
        {Object.keys(totalFiles).length > 1 && "s"} Found.....
      </h5>
      <div>
        {Object.keys(totalFiles).map((totalFile) => {
          return <File key={totalFile._id} {...totalFiles} />;
        })}
      </div>
    </>
  );
};

export default AllFilesContainer;