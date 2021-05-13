import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory} from "react-router-dom";
import Footer from "./components/Footer";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';


export default function DetalleCartillaScreen(props) {
    const useStyles = makeStyles((theme) => ({
        DetalleEntidad:{
            backgroundColor:"#F2EFEB",
            width:"100%",
            height:"100%"
        },
        Titulo:{
          fontFamily:"Garamond", 
          fontWeight:'bold',
          fontSize:"35px",
          textAlign:"left",
          paddingLeft:"12.5rem",
          paddingTop:"2rem"
        },
        Titulo1:{
            fontFamily:"Garamond", 
            fontWeight:'bold',
            fontSize:"50px",
            textAlign:"left",
            color:"#7F3004",
          },
          Titulo2:{
            fontSize:"25px",
            textAlign:"left",
            textAlign:"left",
            marginLeft:"12rem",
          },
          footer:{
              marginTop:"6rem"
          },
          margin:{
            color:"white",
            backgroundColor:"#D27805",
            '&:hover': {
                backgroundColor:"#E89907",
            },
            marginLeft:"1rem"
        },
        typography: {
            padding: theme.spacing(2),
            backgroundColor:"#F2EFEB"
          },
      }));
    const [entidad]=useState(props.location.state)
    const history= useHistory();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      
      const handleClose = () => {
        setAnchorEl(null);
      };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const url = window.location.href
    return (
      <div className={classes.DetalleEntidad}>
        <div class="col-12 row mb-5">
            <div class="col-lg-3 col-md-8 col-sm-12 mt-5">
                <img src={entidad.image} style={{marginLeft:"5rem"}}height="500px" class="img-fluid" alt="Responsive image" />
            </div>
            <div class="col-lg-7 col-md-4 col-sm-12 row">
                <div className={classes.Titulo}>
                    {entidad.nombre} {entidad.apellido}   
                </div>
                <div className={classes.Titulo2} >
                    Especialidad: {entidad.especialidad}<br />
                    Dirreción: {entidad.direccion} {entidad.piso}<br />
                    Teléfono: {entidad.telefono}<br />
                    E-mail: {entidad.mail}<br />
                    Matrícula: {entidad.matricula}<br />
                    {entidad.rating === "1" ?
                        <div>
                            Valoración: 1 estrella (&#9733;)<br /> 
                        </div>: console.log("no")
                    }
                    {entidad.rating === "2" ?
                        <div>
                            Valoración: 2 estrellas (&#9733;&#9733;)<br /> 
                        </div>: console.log("no")
                    }
                    {entidad.rating === "3" ?
                        <div>
                            Valoración: 3 estrellas (&#9733;&#9733;&#9733;)<br /> 
                        </div>: console.log("no")
                    }
                    {entidad.rating === "4" ?
                        <div>
                            Valoración: 4 estrellas (&#9733;&#9733;&#9733;&#9733;)<br /> 
                        </div>: console.log("no")
                    }
                    {entidad.rating === "5" ?
                        <div>
                            Valoración: 5 estrellas (&#9733;&#9733;&#9733;&#9733;&#9733;)<br /> 
                        </div>: console.log("no")
                    }
                </div>
            </div>
        </div>
        <div class="col-md-11 mx-auto">
             <CopyToClipboard text={url}>
                <Button variant="outlined" size="medium" color="primary" className={classes.margin} onClick={handleClick} >
                    Copiar Link
                </Button>
            </CopyToClipboard>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                style={{marginTop:"1rem"}}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
            >
                <Typography className={classes.typography}>Se ha copiado el link al portapapeles!</Typography>
            </Popover>
                    <Button variant="outlined" size="medium" color="primary" className={classes.margin} onClick={() => history.push({pathname:'/Experiencias'})}>
                        Ver experiencias
                    </Button>
        </div>
        <div className={classes.footer}>
            <Footer />
        </div>
      </div>
    );
  }