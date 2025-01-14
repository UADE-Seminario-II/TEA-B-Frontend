import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import Footer from "./components/Footer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import CartasExperiencia from "./components/CartasExperiencia";
import Rating from "@material-ui/lab/Rating";
import Avatar from '@material-ui/core/Avatar';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';
import Modal from 'react-modal';
export function DetalleCartillaScreen(props) {
  const useStyles = makeStyles((theme) => ({
    DetalleEntidad: {
      backgroundColor: "#e2eeff", // FONDOBLANCO: white  FONDOCELESTE: #e2eeff
      height: "100%",
      maxwidth:"100%",
      minHeight: "50vh",
      paddingTop:"3%",
    },
    Titulo: {
      fontFamily: "Open Sans",
      fontWeight: "bold",
      fontSize: "50px",
      paddingLeft: "1.5rem",
    },
    Titulo1: {
      fontFamily: "Open Sans",
      fontWeight: "bold",
      fontSize: "50px",
      textAlign: "left",
      color: "#7F3004",
    },
    Titulo2: {
      fontSize: "20px",
      marginLeft: "3rem",
    },
    footer: {
      marginTop: "16rem",
    },
    margin: {
      color: "white", // marron "#644100", naranja oscuro "#915e00", BLANCO QUEDA MUY CLARO
      fontWeight:"bold",
      backgroundColor: "#F9C25D",
      "&:hover": {
        backgroundColor: "#D27805",
      },
      marginLeft: "1rem",
    },
    typography: {
      padding: theme.spacing(2),
      backgroundColor: "white",
    },

    avatar: {
      width: "15rem",
      height: "15rem",
      marginLeft:"20%",
    },
    inline:{
      fontFamily: "Open Sans", color:"black", fontWeight:"bold", fontSize:"20px",
    },
   
  }));
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [entidad, setEntidad] = useState("");
  const [dataPasoExperiencia, setDataPasoExperiencia] = useState("");
  const [dataInstructivos, setDataInstructivos] = useState([]);
  const [hasInstructives, setHasInstructives] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  let [responseData, setResponseData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    let urlp = window.location.href.replace(
      "http://localhost:3000/Busqueda/",
      ""
    );
    setDataPasoExperiencia(props.location.state);
    let i = 0;
    let entidadd = "";
    let idd = "";
    let urlback = "https://sip2-backend.herokuapp.com/";
    while (i <= urlp.length) {
      if (urlp[i] !== "/") {
        if (isNaN(urlp[i])) {
          entidadd = entidadd + urlp[i];
        } else {
          idd = idd + urlp[i];
        }
      } else {
        console.log("");
      }
      i++;
    }
    console.log(entidadd.replace("undefined", "")); //guarde la entidad
    entidadd = entidadd.replace("undefined", "");
    entidadd = entidadd + "es";
    console.log(entidadd);
    console.log(idd); //guarde el id
    console.log(urlback + entidadd + "/" + idd);
    fetch(urlback + entidadd + "/" + idd)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          result.latitud=Number(result.latitud);
          result.longitud= Number(result.longitud)
          console.log(result)
          setEntidad(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    let urlp = window.location.href.replace(
      "http://localhost:3000/Busqueda/",
      ""
    );
    let i = 0;
    let entidadd = "";
    let idd = "";
    while (i <= urlp.length) {
      if (urlp[i] !== "/") {
        if (isNaN(urlp[i])) {
          entidadd = entidadd + urlp[i];
        } else {
          idd = idd + urlp[i];
        }
      } else {
        console.log("");
      }
      i++;
    }
    console.log(entidadd.replace("undefined", "")); //guarde la entidad
    entidadd = entidadd.replace("undefined", "");

      axios.get(
          `https://sip2-backend.herokuapp.com/${entidadd}es/experiencias/${idd}`
        )
        .then((response) => {
          console.log(response.data);
          setResponseData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  useEffect(() => {
    let urlp = window.location.href.replace(
      "http://localhost:3000/Busqueda/",
      ""
    );
    let i = 0;
    let entidadd = "";
    let idd = "";
    while (i <= urlp.length) {
      if (urlp[i] !== "/") {
        if (isNaN(urlp[i])) {
          entidadd = entidadd + urlp[i];
        } else {
          idd = idd + urlp[i];
        }
      } else {
        console.log("");
      }
      i++;
    }
    console.log(entidadd.replace("undefined", "")); //guarde la entidad
    entidadd = entidadd.replace("undefined", "");
    axios.get(
      `https://sip2-backend.herokuapp.com/${entidadd}es/${idd}/Instructivo`
    )
    .then((response) => {
      console.log("Instructivos: ###### ", response.data);
      let data = [];
      if(response.data){
        setHasInstructives(true);
        setDataInstructivos(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const[infoWindow,setInfoWindow]=useState(false);
  const[activeMarker,setActiveMarker]=useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
    setTimeout(() => {
      setAnchorEl(event.currentTarget)
    }, 1000);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openModal = () => {
    setIsOpen(true);
  }
  const closeModal = () => {
    setIsOpen(false);
  }
  const markerClick = (props, marker, e) =>{
    setActiveMarker(marker)
    setInfoWindow(true);
    //console.log(props,marker)
  }
  const closeInfoWindow = () =>{
    setActiveMarker(null);
    setInfoWindow(false);
  }
  const renderPhotos = (source) => {
    console.log('source: ', source);
   
    if(source.length != 0){
      return source.map((photo) => {
        return <img src={photo.imagen} alt="" key={photo.id} width="300" height="300"/>;
      });
    }
	};
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const url = window.location.href;
  return !isLoaded ? (
    <LinearProgress />
  ) : (
    <div className={classes.DetalleEntidad}>
     {/*  <div classes={classes.estiloNombre}>
        {entidad.nombre} {entidad.apellido}
      </div> */}
      <div style={{display: "flex", alignContent:"center", marginLeft:"0.5%"}}>
        <div style={{marginTop:"2%"}}>
          <Avatar className={classes.avatar} src={entidad.imagen} alt="Responsive image"/>
        </div>
        <div style={{marginLeft:"4%", width:"40%"}}>
          <div className={classes.Titulo}>
            {entidad.nombre} {entidad.apellido}
          </div>

          {entidad.entidad === "Profesional" && (
            <div className={classes.Titulo2}>
               <FiberManualRecordIcon style={{fontSize:"1rem", marginBottom:"0.5%", marginRight:"0.5%"}}/>
               <Typography component="span" variant="body2" className={classes.inline}> Especialidad:  </Typography>{entidad.especialidad}
              <br />
              <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
              <Typography component="span" variant="body2" className={classes.inline}> Dirección:  </Typography>{entidad.direccion} {entidad.piso},{" "}
              {entidad.localidad.localidad}
              <br />
              <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
              <Typography component="span" variant="body2" className={classes.inline}> Teléfono:  </Typography>{entidad.telefono}
              <br />
              <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
              <Typography component="span" variant="body2" className={classes.inline}> E-mail:  </Typography>{entidad.email}
              <br />
              <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
              <Typography component="span" variant="body2" className={classes.inline}> Matrícula:  </Typography>{entidad.matricula}
              <br />
              {entidad.valoracionPromedio === 0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:   </Typography><Rating value="0" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 1.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:   </Typography><Rating value="1" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 2.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:   </Typography><Rating value="2" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 3.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:  </Typography><Rating value="3" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 4.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:  </Typography><Rating value="4" name="read-only" size="medium" readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 5.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:  </Typography><Rating value="5" name="read-only" size="medium" readOnly/>
                  <br />
                </div>
              ) : null}
            </div>
          )}

          {entidad.entidad === "Institucion" && (
            <div className={classes.Titulo2}>
              <FiberManualRecordIcon style={{fontSize:"1rem", marginBottom:"0.5%", marginRight:"0.5%"}}/>
              <Typography component="span" variant="body2" className={classes.inline}> Nivel educativo: </Typography> {entidad.especialidad}
              <br />
              <FiberManualRecordIcon style={{fontSize:"1rem", marginBottom:"0.5%", marginRight:"0.5%"}}/>
              <Typography component="span" variant="body2" className={classes.inline}> Dirección:  </Typography> {entidad.direccion}, {entidad.localidad.localidad}
              <br />
              <FiberManualRecordIcon style={{fontSize:"1rem", marginBottom:"0.5%", marginRight:"0.5%"}}/>
              <Typography component="span" variant="body2" className={classes.inline}> Teléfono: </Typography>{entidad.telefono}
              <br />
              <FiberManualRecordIcon style={{fontSize:"1rem", marginBottom:"0.5%", marginRight:"0.5%"}}/>
              <Typography component="span" variant="body2" className={classes.inline}> E-mail:  </Typography> {entidad.email}
              <br />
              {entidad.valoracionPromedio === 0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:   </Typography><Rating value="0" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 1.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:   </Typography><Rating value="1" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 2.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:   </Typography><Rating value="2" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 3.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:  </Typography><Rating value="3" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 4.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:  </Typography><Rating value="4" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 5.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:  </Typography><Rating value="5" name="read-only" size="medium" readOnly/>
                  <br />
                </div>
              ) : null}
            </div>
          )}

          {entidad.entidad === "Actividad" && (
            <div className={classes.Titulo2}>
              <FiberManualRecordIcon style={{fontSize:"1rem", marginBottom:"0.5%", marginRight:"0.5%"}}/>
              <Typography component="span" variant="body2" className={classes.inline}> Descripción: </Typography>{entidad.descripcion}
              <br />
              <FiberManualRecordIcon style={{fontSize:"1rem", marginBottom:"0.5%", marginRight:"0.5%"}}/>
              <Typography component="span" variant="body2" className={classes.inline}> Dirección:  </Typography> {entidad.direccion}, {entidad.localidad.localidad}
              <br />
              <FiberManualRecordIcon style={{fontSize:"1rem", marginBottom:"0.5%", marginRight:"0.5%"}}/>
              <Typography component="span" variant="body2" className={classes.inline}> Teléfono: </Typography>{entidad.telefono}
              <br />
              <FiberManualRecordIcon style={{fontSize:"1rem", marginBottom:"0.5%", marginRight:"0.5%"}}/>
              <Typography component="span" variant="body2" className={classes.inline}> E-mail:  </Typography>{entidad.email}
              <br />
              {entidad.valoracionPromedio === 0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:   </Typography><Rating value="0" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 1.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:   </Typography><Rating value="1" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 2.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:   </Typography><Rating value="2" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 3.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:  </Typography><Rating value="3" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 4.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración: </Typography><Rating value="4" name="read-only"size="medium"  readOnly/>
                  <br />
                </div>
              ) : null}
              {entidad.valoracionPromedio === 5.0 ? (
                <div>
                  <FiberManualRecordIcon style={{fontSize:"1rem",marginBottom:"0.5%", marginRight:"0.5%"}}/>
                  <Typography component="span" variant="body2" className={classes.inline}> Valoración:  </Typography><Rating value="5" name="read-only" size="medium" readOnly/>
                  <br />
                </div>
              ) : null}
            </div>
          )}
        </div>
          {/*  ESPACIO PARA MAPA */}
        <div>
        </div>
        {isNaN(entidad.latitud)?
          <Map
            google={props.google}
            zoom={15}
            style={{width:"30rem", height:"20rem", marginLeft: "62%", borderRadius:"1rem"}}
            initialCenter={{ lat: -34.579425, lng: -58.490914}}>
          </Map>
          :
          <Map
            google={props.google}
            zoom={17}
            style={{width:"30rem", height:"20rem", marginLeft: "62%", borderRadius:"1rem"}}
            center={{ lat: entidad.latitud, lng: entidad.longitud}} >
            <Marker position={{ lat: entidad.latitud, lng: entidad.longitud}} title={entidad.direccion} onClick={markerClick}/>
            <InfoWindow visible={infoWindow} marker={activeMarker} onClose={closeInfoWindow}><div>
            <h6>{entidad.direccion}, {entidad.localidad.localidad}</h6>
            <div style={{margiin:"0 auto", textAlign:"center"}}>
              <a href={"https://www.google.com/maps/search/?api=1&query="+entidad.latitud+entidad.longitud} target="_blank">Ver más info</a>
            </div>
          </div></InfoWindow>
          </Map>
        }
      </div>
      <div class="col-md-11 mx-auto mt-4">
        <CopyToClipboard text={url}>
          <Button
            variant="outlined"
            size="medium"
            color="primary"
            className={classes.margin}
            onClick={handleClick}
          >
            Copiar Link
          </Button>
        </CopyToClipboard>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          style={{ marginTop: "0.5%"}}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <Typography className={classes.typography}>
            Se ha copiado el link al portapapeles!
          </Typography>
        </Popover>
        <Button
          variant="outlined"
          size="medium"
          color="primary"
          className={classes.margin}
          onClick={() =>
            props.history.push({
              pathname: "/Experiencia/Crear",
              state: dataPasoExperiencia,
            })
          }
        >
          Añadir experiencia
        </Button>
        {hasInstructives ? 
        <Button
          variant="outlined"
          size="medium"
          color="primary"
          className={classes.margin}
          onClick={openModal}
        >
          Ayuda con Pictogramas
        </Button>
        : null}
      </div>
      <br></br>
      <br></br>
      <div style={{display:"flex", alignContent:"center", justifyContent:"center"}}>
        <CartasExperiencia cartas={responseData}></CartasExperiencia>
      </div>
      <div className={classes.footer}>
        <Footer />
      </div>
      <div>
      <Modal
        isOpen={modalIsOpen}
        //onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{content: {
          marginTop: '200px',
          top: '200px',
          left: '50%',
          right: '400px',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        }}}
        contentLabel="Example Modal"
      >
        <div className="result">{renderPhotos(dataInstructivos)}</div>
        <br></br><br></br>
        <Button
          variant="outlined"
          size="medium"
          color="primary"
          className={classes.margin}
          onClick={closeModal}
        >
          Cerrar
        </Button>
      </Modal>
      </div>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyCHJTuTe3jqnByfXeNATnI5t2fmnF6htBY'
})(DetalleCartillaScreen);