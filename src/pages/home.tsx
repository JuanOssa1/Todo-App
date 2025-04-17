import Box from "@mui/system/Box";
import styles from "./styles/Home.module.scss";
import AddButton from "../features/ui/AddButton";
function Home() {
  return (
    <div className={`${styles["main"]}`}>
      <section className={`${styles["home-header"]}`}>
        <div>Projects</div>
        <div>Filters</div>
      </section>
      <section className={`${styles["card-list"]}`}>A card</section>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"end"}
        sx={{
          position: "absolute",
          height: "50px",
          bottom: "0px",
          right: "0px",
          width: { xs: "100%", sm: `calc(100% - ${240}px)` },
          backgroundColor: "red"
        }}
      >
        <AddButton placeHolder="Test" />
      </Box>
    </div>
  );
}

export default Home;
