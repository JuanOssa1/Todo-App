import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { close, selectOpen } from "../../app/slice";
import { selectProject } from "../../app/slice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { ModalProps } from "./types";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function TransitionsModal({ children }: ModalProps) {
  const dispatch = useDispatch();
  const isOpen = useAppSelector(selectOpen);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        aria-hidden={!isOpen}
        open={isOpen}
        onClose={() => {
          dispatch(close());
          dispatch(selectProject(undefined));
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}
