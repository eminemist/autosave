
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
import AllFiles from "./AllFiles";
const SearchContainer = () => {
  const {
    isLoading,
    
    handleChange,
   
  } = useAppContext();

  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <Wrapper>
      <AllFiles />
      <AllFiles />
      <AllFiles />
      <AllFiles />
      <AllFiles />
      <AllFiles />
      <AllFiles/>
    </Wrapper>
  );
};

export default SearchContainer;
