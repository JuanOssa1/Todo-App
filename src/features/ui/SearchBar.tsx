import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

function SearchBar() {
  return (
    <>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for a project"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </>
  );
}

export default SearchBar;
