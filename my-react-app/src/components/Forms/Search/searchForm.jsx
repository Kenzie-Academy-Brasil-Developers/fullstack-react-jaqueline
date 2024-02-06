import { useForm } from "react-hook-form";
import { useContext } from "react";
import { ClientsContext } from "../../../providers/clientsContext";
import { MdSearch } from "react-icons/md";

export const SearchForm = ({contactOrClient}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { setSearchItem, searchItem } = useContext(ClientsContext);

  const submitSearch = (data) => {
    reset({ searchItem: "" });
    setSearchItem(searchItem);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitSearch)}>
        <input
          type="text"
          {...register("searchItem")}
          value={searchItem}
          placeholder={`Digite nome do ${contactOrClient}`}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <button type="submit">
          <MdSearch size={21} />
        </button>
      </form>
    </>
  );
};
