import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const UserSchema = yup.object().shape({
  name: yup
    .string()
    .required("⚠️ Provide your name")
    .min(3)
    .max(10, "Keep it short"),
  pic: yup.string().required().url(),
  joinyear: yup.string().required().min(4)
});

export function AddUser() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(UserSchema)
  });
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const adduser = (data) => {
    setOpen(true);
    fetch("https://60c83c0fafc88600179f6657.mockapi.io/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((data) => data.json())
      .then((data) => {
        setOpen(true);
        history.push("/listusers");
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="form">
      <TextField
        id="outlined-basic"
        label="Enter Name"
        variant="outlined"
        {...register("name")}
        error={errors?.name?.message}
        helperText={errors?.name?.message}
      />
      <br />
      <br />
      <TextField
        id="outlined-basic"
        label="Enter profile Picture"
        variant="outlined"
        {...register("pic")}
        error={errors?.pic?.message}
        helperText={errors?.pic?.message}
      />
      <br />
      <br />
      <TextField
        id="outlined-basic"
        label="Enter year of join"
        variant="outlined"
        {...register("joinyear")}
        error={errors?.joinyear?.message}
        helperText={errors?.joinyear?.message}
      />
      <br />
      <br />
      <Button
        onClick={handleSubmit(adduser)}
        variant="contained"
        color="primary"
      >
        Create User
      </Button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          successfully Added {getValues("name")}
        </Alert>
      </Snackbar>
    </div>
  );
}
