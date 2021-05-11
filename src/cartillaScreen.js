import React, {useState}  from "react";
import { makeStyles } from '@material-ui/core/styles';
//import { useHistory} from "react-router-dom";
import {LocalidadesB} from "./components/LocalidadesB";
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Top5entidades} from "./components/Top5entidades";
import imagen from "./components/assets/person-icon.png";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
export default function Cartilla() {
    const useStyles = makeStyles((theme) => ({
        Cartilla:{
          backgroundColor:"#F2EFEB",
        },
        footer:{
            marginTop:"21rem"
        },
        margin:{
            color:"white",
            backgroundColor:"#D27805",
            '&:hover': {
                backgroundColor:"#E89907",
            }
        },
        labels:{
            fontSize:"1rem",
        },
        input:{
            height:"2rem",
            width:"13.8rem",
        },
        divider:{
            backgroundColor:"black",
            marginTop:"1.5rem",
        },
        select:{
            width:"13.8rem",
            height:"2rem",
        },
        listdivider:{
            backgroundColor:"black",
            marginTop:"1.5rem",
            maxWidth:"35rem"
        },
        root:{
            width: '100%',
            maxWidth: 600,
            marginLeft:"6rem"
        }
    }));
    const classes = useStyles();
    //const history= useHistory();
    const [entidadSelected, setEntidadSelected]=useState("");
    const [localidadSelected, setLocalidadSelected]=useState("");
    const [ratingSelected, setRatingSelected]=useState("");
    const [disableSearch, setDisableSearch]=useState(true);
    const onEntidad = (value) =>{
        setEntidadSelected(value);
        if(value!==""){
            setDisableSearch(false);
        }
        console.log(value)
    }
    const onLocalidad= (value) =>{
        setLocalidadSelected(value);
    }
    const onRating = (value) =>{
        setRatingSelected(value);
    }
    const entidades = () =>{
        return(
            <div class="col-md-2 mb-md-1 my-auto offset-md-1">
                <label className={classes.labels} for="entidad">Seleccione una entidad</label><br />
                <select className={classes.select} value={entidadSelected} id="entidad" name="entidadlist" form="entidadform" onChange={(e) =>{onEntidad(e.target.value)}}>
                    <option value="" disabled selected>Seleccione una entidad</option>
                    <option value="especialista">Especialista</option>
                    <option value="instituto">Instituto</option>
                    <option value="actividad">Actividad</option>
                </select>
            </div>
        )
    }
    const localidades = () =>{
        return(
            <div class="col-md-2 mb-md-1 my-auto">
                <label className={classes.labels}for="localidad">Seleccione una localidad</label><br />
                <select className={classes.select} value={localidadSelected} id="localidad" name="localidadlist" form="localidadform" onChange={(e) =>{onLocalidad(e.target.value)}}>
                    <option value="" disabled selected>Seleccione una localidad</option>
                        {LocalidadesB.map((value) => (
                        <option value={value.localidad}>{value.localidad}</option>
                        ))}
                </select>
            </div>
        )
    }
    const ratings = () =>{
        return(
            <div class="col-md-2 mb-md-1 my-auto">
                <label className={classes.labels} for="rating">Valoración</label><br />
                <select className={classes.select} value={ratingSelected} id="rating" name="ratinglist" form="ratingform" onChange={(e) =>{onRating(e.target.value)}}>
                    <option value="" disabled selected>Seleccione una valoración</option>
                    <option value="1">1 estrella (&#9733;)</option>
                    <option value="2">2 estrellas (&#9733;&#9733;)</option>
                    <option value="3">3 estrellas (&#9733;&#9733;&#9733;)</option>
                    <option value="4">4 estrellas (&#9733;&#9733;&#9733;&#9733;)</option>
                    <option value="5">5 estrellas (&#9733;&#9733;&#9733;&#9733;&#9733;)</option>
                </select>
            </div>
        )
    }
    const search = () =>{
        return(
            <div class="col-md-3 mb-md-1 my-auto">
                    {entidadSelected === "especialista" ? (
                    <div>
                        <label className={classes.labels} for="search">Buscar por especialidad</label><br />
                    </div>) 
                    : <div />}
                    {entidadSelected === "actividad" ? (
                    <div>
                        <label className={classes.labels} for="search">Buscar por actividad</label><br />
                    </div>) 
                    : <div />}
                    {entidadSelected === "instituto" ? (
                    <div>
                        <label className={classes.labels} for="search">Buscar por grado</label><br />
                    </div>) 
                    : <div />}
                    {entidadSelected === "" ? (
                    <div>
                        <label className={classes.labels} for="search">Seleccione una entidad para comenzar a buscar</label><br />
                    </div>) 
                    : <div />}
                    <input
                        id="search"
                        name="searchlist" 
                        form="searchform"
                        type="text"
                        placeholder="Buscar"
                        disabled={disableSearch}
                        className={classes.input}
                        
                    />
            </div>
        )
    }
    const resetFilters = () =>{
        setEntidadSelected("");
        setDisableSearch(true);
        setLocalidadSelected("");
        setRatingSelected("");
    }
    const resetFilter = () =>{
        return(
            <div class="col-md-2 mb-md-1 my-auto">
                <Button variant="outlined" size="medium" color="primary" className={classes.margin} onClick={resetFilters}>
                    Resetear filtros
                </Button>
            </div>
        )
    }
    const listEntidades = () =>{
        return(
            <div class="mx-sm-auto" className={classes.root}>
                {Top5entidades.map((value) => (
                <List class="ml-md-auto">
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="imagen" src={imagen} />
                        </ListItemAvatar>
                            <ListItemText
                                primary={value.nombre + " " +value.apellido}
                                secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {"Especialidad médica: "+ " " + value.especialidad}
                                    </Typography>
                                    <br />
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        className={classes.inline}
                                        color="textPrimary"
                                    >
                                        {"Localidad: "+ " " + value.localidad}
                                    </Typography>
                                    {value.rating === "1" ?(
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >Valoración: &#9733;</Typography>
                                    ): <div />}
                                    {value.rating === "2" ?(
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >Valoración: &#9733;&#9733;</Typography>
                                    ): <div />}
                                    {value.rating === "3" ?(
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >Valoración: &#9733;&#9733;&#9733;</Typography>
                                    ): <div />}
                                    {value.rating === "4" ?(
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >Valoración: &#9733;&#9733;&#9733;&#9733;</Typography>
                                    ): <div />}
                                    {value.rating === "5" ?(
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >Valoración: &#9733;&#9733;&#9733;&#9733;&#9733;</Typography>
                                    ): <div />}
                                     <ListItemSecondaryAction>
                                        <IconButton >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                    </React.Fragment>
                                }
                            />
                    </ListItem>
                    <Divider className={classes.listdivider}/> 
                </List>
            ))}
            </div>
        )
    }
    return(
        <div className={classes.Cartilla}>
            <div class="col-12 row p-3">
                {entidades()}
                {localidades()}
                {ratings()}
                {search()}
                {resetFilter()}
                <Divider className={classes.divider}/>
            </div>
            {listEntidades()}
        </div>
    );
}