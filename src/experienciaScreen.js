import React, { useState } from "react";
import NavBar from "./components/NavBar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { BoxUpload, ImagePreview } from "./style";
import { useHistory } from "react-router-dom";
import FolderIcon from "./components/assets/folder_icon_transparent.png";
import CloseIcon from "./components/assets/CloseIcon.svg";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container:{
    backgroundColor: "#F2EFEB",
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  },
}));

function Experiencias(props) {
    // console.log("props   ", props);
    // useEffect(() => {
    //     // will be true
    //     console.log("props   ", props);
    //   });
    const classes = useStyles();
    const history = useHistory();
    const [isTwoImage, setIsTwoImage] = useState(false);
    const [isThreeImage, setIsThreeImage] = useState(false);
    const [image, setImage] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [isUploaded, setIsUploaded] = useState(false);
    const [isUploaded2, setIsUploaded2] = useState(false);
    const [isUploaded3, setIsUploaded3] = useState(false);
    const [imageValue, setImageValue] = useState([]);
    const [typeFile, setTypeFile] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [valueNew, setValueNew] = useState();
    const [open, setOpen] = React.useState(false);
    const [rating, setRating] = React.useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setIsUploaded(false);
        setIsUploaded2(false);
        setIsUploaded3(false);
        setIsTwoImage(false);
        setIsThreeImage(false);
        setValueNew("");
        setOpen(false);
        props.history.push({ pathname: `/Cartilla/${props.location.state.entidad}/${props.location.state.id}`, state: props.location.state});   
    };

  function handleTitleChange(data) {
    setTitle(data);
  }

  function handleDescriptionChange(data) {
    setDescription(data);
  }

  function handleImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();
      setImageValue(e.target.files[0]);
      reader.onload = function (e) {
        setImage(e.target.result);
        setIsUploaded(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
    setIsTwoImage(true);
  }

  function handleImageChange2(e) {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage2(e.target.result);
        setIsUploaded2(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
    setIsThreeImage(true);
  }

  function handleImageChange3(e) {
    if (e.target.files && e.target.files[0]) {
      setTypeFile(e.target.files[0].type);
      let reader = new FileReader();

      reader.onload = function (e) {
        setImage3(e.target.result);
        setIsUploaded3(true);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  }

  function handleSubmit(event) {
    console.log("presione publicar");
    let exp = {
        titulo: title,
        comentario: description,
        puntaje: rating,
        tipoExperiencia: '',
        usuario: {
            idUsuario: 1
        }
    }; 
    
    if(props.location.state.entidad === "Profesional"){
        exp.profesional = {};
        exp.profesional.id = props.location.state.id;
    }
    if(props.location.state.entidad === "Institucion"){
        exp.institucion = {};
        exp.institucion.id = props.location.state.id;
    }
    if(props.location.state.entidad === "Actividad"){
        exp.actividad = {};
        exp.actividad.id = props.location.state.id;
    }

    axios.post(`https://sip2-backend.herokuapp.com/Experiencias`, exp )
      .then(res => {
        console.log(res);
        console.log(res.data);
        // guardar imagenes
        const formData = new FormData();
        formData.append('image',imageValue);
        let array = [];
        array.push(formData);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        console.log("Array: ", array, "config: ", config);
    
        axios.post(`https://sip2-backend.herokuapp.com/Experiencias/${res.data.id}/uploadImages`, array, config
        )
        .then(res => {
            console.log(res);
            console.log(res.data);
            handleClickOpen();
        })
        .catch(error => {
            console.log(error);
            return error;
        });
        // fin
        handleClickOpen();
      });
    }

  return (
    <div className={classes.container}>
      <NavBar></NavBar>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <form className={classes.root} noValidate autoComplete="off">
          <div>
            <h1>Contanos tu experiencia 😁</h1>
        </div>
        <Grid item xs = {12}>
        {props.location.state.entidad === "Profesional" &&
        <div>
            <TextField style={{ width: 300 }}
                id="filled-read-only-input"
                label="Nombre"
                defaultValue={props.location.state.nombre + " " + props.location.state.apellido}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            <TextField style={{ width: 300 }}
                id="filled-read-only-input"
                label="Especialidad"
                defaultValue={props.location.state.especialidad}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
        </div>
        }
        {props.location.state.entidad === "Institucion" &&
        <div>
            <TextField style={{ width: 300 }}
                id="filled-read-only-input"
                label="Nombre"
                defaultValue={props.location.state.nombre}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            <TextField style={{ width: 300 }}
                id="filled-read-only-input"
                label="Nivel educativo"
                defaultValue={props.location.state.especialidad}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
        </div>
        }
        {props.location.state.entidad === "Actividad" &&
        <div>
            <TextField style={{ width: 300 }}
                id="filled-read-only-input"
                label="Actividad"
                defaultValue={props.location.state.nombre}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
            <TextField style={{ width: 300 }}
                id="filled-read-only-input"
                label="Tipo de recreación"
                defaultValue={props.location.state.especialidad}
                InputProps={{
                    readOnly: true,
                }}
                variant="filled"
            />
        </div>
        }
        <TextField style={{ width: 300 }}
            id="filled-read-only-input"
            label="Dirección"
            defaultValue={props.location.state.direccion + " " + props.location.state.localidad.localidad}
            InputProps={{
                readOnly: true,
            }}
            variant="filled"
        />
        </Grid>
        <Grid item xs = {12}>
        <TextField style={{ width: 930 }}
          required
          id="outlined-required"
          label="Título"
          value={valueNew}
          variant="outlined"
          onChange= {(event) => handleTitleChange(event.target.value)}
        />
        </Grid>
        <Grid item xs = {12}>
        <TextField style={{ width: 930 }}
          id="outlined-multiline-static"
          label="Experiencia"
          value={valueNew}
          multiline
          rows={10}
          variant="outlined"
          onChange= {(event) => handleDescriptionChange(event.target.value)}
        />
        </Grid>
        <Grid container
          alignItems="center"
          style={{ minHeight: '20vh' }}>
        <BoxUpload>
          <div className="image-upload">
            {!isUploaded ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 70, height: 70 }}
                  />
                  <p style={{ color: "#444" }}>Hacer Click</p>
                </label>

                    <input
                      id="upload-input"
                      type="file"
                      accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                      onChange={handleImageChange}
                    />
                  </>
                ) : (
                  <ImagePreview>
                    <img
                      className="close-icon"
                      src={CloseIcon}
                      alt="CloseIcon"
                      onClick={() => {
                        setIsUploaded(false);
                        setImage(null);
                      }}
                    />
                    {typeFile.includes("video") ? (
                      <video
                        id="uploaded-image"
                        src={image}
                        draggable={false}
                        controls
                        autoPlay
                        alt="uploaded-img"
                      />
                    ) : (
                      <img
                        id="uploaded-image"
                        src={image}
                        draggable={false}
                        alt="uploaded-img"
                      />
                    )}
                  </ImagePreview>
            )}
          </div>
        </BoxUpload>
        {isTwoImage ? (
        <BoxUpload>
          <div className="image-upload" if={false}>
            {!isUploaded2 ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 70, height: 70 }}
                  />
                  <p style={{ color: "#444" }}>Hacer Click</p>
                </label>

                <input
                  id="upload-input"
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                  onChange={handleImageChange2}
                />
              </>
            ) : (
              <ImagePreview>
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => {
                    setIsUploaded2(false);
                    setImage2(null);
                    setIsTwoImage(false);
                  }}
                />
                {typeFile.includes("video") ? (
                  <video
                    id="uploaded-image"
                    src={image2}
                    draggable={false}
                    controls
                    autoPlay
                    alt="uploaded-img"
                  />
                ) : (
                  <img
                    id="uploaded-image"
                    src={image2}
                    draggable={false}
                    alt="uploaded-img"
                  />
                )}
              </ImagePreview>
            )}
          </div>
        </BoxUpload>
        ) : (null)}
        {isThreeImage ? (
        <BoxUpload>
          <div className="image-upload" if={false}>
            {!isUploaded3 ? (
              <>
                <label htmlFor="upload-input">
                  <img
                    src={FolderIcon}
                    draggable={"false"}
                    alt="placeholder"
                    style={{ width: 70, height: 70 }}
                  />
                  <p style={{ color: "#444" }}>Hacer Click</p>
                </label>

                <input
                  id="upload-input"
                  type="file"
                  accept=".jpg,.jpeg,.gif,.png,.mov,.mp4"
                  onChange={handleImageChange3}
                />
              </>
            ) : (
              <ImagePreview>
                <img
                  className="close-icon"
                  src={CloseIcon}
                  alt="CloseIcon"
                  onClick={() => {
                    setIsUploaded3(false);
                    setImage3(null);
                    setIsThreeImage(false);
                  }}
                />
                {typeFile.includes("video") ? (
                  <video
                    id="uploaded-image"
                    src={image3}
                    draggable={false}
                    controls
                    autoPlay
                    alt="uploaded-img"
                  />
                ) : (
                  <img
                    id="uploaded-image"
                    src={image3}
                    draggable={false}
                    alt="uploaded-img"
                  />
                )}
              </ImagePreview>
            )}
          </div>
        </BoxUpload>
        ) : (null)}
        </Grid>
        <Grid container alignItems="center" justify="center" style={{minHeight: "7vh" }}> 
            <Typography component="legend">
              De 1 a 5 estrellas, ¿Cómo valorarías la experiencia?.
            </Typography>
          </Grid>
          <Grid container alignItems="center" justify="center">
            <Rating
              name="experiencia-rating"
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
            ></Rating>
          </Grid>
        <Grid container
          alignItems="center"
          justify="center"
          style={{ minHeight: '10vh' }}>
              <Grid item xs = {2}>
                <Button variant="contained" size="medium" className={classes.margin} style={{color: "white",backgroundColor: "#D27805"}}
                    onClick={() =>
                        props.history.push({
                        pathname: `/Cartilla/${props.location.state.entidad}/${props.location.state.id}`, state: props.location.state
                    })}>
                    Cancelar
                </Button>
              </Grid>
              <Grid item xs = {2}>
                <Button variant="contained" size="medium" color="primary" className={classes.margin} style={{color: "white",backgroundColor: "#D27805"}} onClick={() => handleSubmit()}>
                    Publicar
                </Button>
              </Grid>
        </Grid>
        </form>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Experiencia Publicada 👍 "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tu publicación se realizó con éxito!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" style={{color: "white",backgroundColor: "#D27805"}} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Experiencias;