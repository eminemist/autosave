
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/SearchContainer";
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
      
        <h4>search form</h4>

    </Wrapper>
  );
};

export default SearchContainer;
