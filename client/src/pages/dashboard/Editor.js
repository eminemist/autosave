  import { useEffect, useState, useCallback } from "react";
  import { debounce } from "lodash";
  import { useLocation } from "react-router-dom";

  import { useAppContext } from "../../context/appContext";

  const Editor = () => {
    const [file, setFile] = useState({
      title: "",
      content: "",
      id: ""
    });

    const { getFile, isLoading, files, editFile } = useAppContext();
    const { state } = useLocation();

    useEffect(() => {
      if (state?.id) {
        getFile(state?.id)
      } else {
        // call create file api -
        // retrive id, setfile(id)
      }
    }, [state]);

    useEffect(() => {
      if (state?.id) {
        if (files && !isLoading) {
          setFile({
            title: files?.title,
            content: files?.content,
          })
        }
      }
    }, [files?.title, files?.content, isLoading])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFile({...file, [name]: value})

    debouncedChangeHandler(
      name === 'title' ? value : file.title,
      name === 'content' ? value : file.content
    )
  }

    const debouncedChangeHandler = useCallback(debounce((
      title, content
    ) => {
            editFile(
          state?.id || file?.id,
          title,
          content
        )
    }, 500), []);

    return (
      <div className="editorPage">
        <input
          value={file?.title || ''}
          name="title"
          type="text"
          className="title"
          placeholder="Enter Title here..."
          onChange={(e) => handleChange(e)}
        />

        <textarea
          value={file?.content || ''}
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
