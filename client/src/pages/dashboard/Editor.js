import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { useLocation } from "react-router-dom";

import { useAppContext } from "../../context/appContext";

const Editor = () => {
  const [file, setFile] = useState({
    title: "",
    content: "",
    id: "",
  });

  const { getFile, isLoading, files, editFile, createFile } = useAppContext();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.id) {
      getFile(state?.id);
    }
  }, [state]);

  useEffect(() => {
    if ((files && !isLoading) || state?.id) {
      setFile({
        title: files?.title,
        content: files?.content,
        id: files?._id,
      });
    }
  }, [files?.title, files?._id, files?.content, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFile({ ...file, [name]: value });

    debouncedChangeHandler(
      name === "title" ? value : file.title,
      name === "content" ? value : file.content
    );
  };

  const debouncedChangeHandler = useCallback(
    debounce((title, content) => {
      if (file?.id || state?.id) {
        editFile(file?.id || state?.id, title, content);
      } else {
        createFile(title, content);
      }
    }, 1000),
    []
  );

  return (
    <div className="editorPage">
      <input
        value={file?.title || ""}
        name="title"
        type="text"
        className="title"
        placeholder="Enter Title here..."
        onChange={(e) => handleChange(e)}
      />

      <textarea
        value={file?.content || ""}
        name="content"
        type="text"
        className="search"
        placeholder="Enter something here..."
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default Editor;
