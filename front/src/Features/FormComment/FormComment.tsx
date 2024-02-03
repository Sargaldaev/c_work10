import { useState } from "react";
import { ICommentCreate } from "../../type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store.ts";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  fetchDataComments,
  postDataComments,
} from "../../store/comments/commentsThunk.ts";

const FormComment = () => {
  const [state, setState] = useState<ICommentCreate>({
    author: "",
    description: "",
  });
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { postLoad } = useSelector((state: RootState) => state.comments);

  const { id } = useParams();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(postDataComments(state));
    if (id) {
      await dispatch(fetchDataComments(id));
    }
    setState({ author: "", description: "" });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Add Comment
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Box
            component="form"
            onSubmit={onSubmit}
            display="flex"
            sx={{ "& > :not(style)": { m: 1 } }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <TextField
                id="input-with-sx"
                label="Author"
                name="author"
                sx={{ width: "100%" }}
                onChange={onChange}
                value={state.author}
              />

              <TextField
                id="filled-multiline-static"
                label="Description"
                multiline
                required
                rows={2}
                sx={{ width: "100%", marginTop: "5px", marginBottom: "5px" }}
                name="description"
                onChange={onChange}
                value={state.description}
              />

              <Button
                type={"submit"}
                sx={{
                  width: "100%",
                  marginTop: "5px",
                  background: "green",
                }}
                variant={"contained"}
              >
                add
              </Button>
            </Box>
          </Box>
          <DialogActions>
            <Button
              sx={{
                background: "red",
                color: "white",
              }}
              variant={"contained"}
              onClick={handleClose}
            >
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FormComment;
