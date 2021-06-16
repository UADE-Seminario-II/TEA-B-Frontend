import React from "react";
import { makeStyles } from "@material-ui/styles/";
import { Card, CardContent, CardActions, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Rating from "@material-ui/lab/Rating";
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

const CartasExperiencia = (props) => {
  const useStyles = makeStyles((theme) => ({
    container: {
      backgroundColor: "#e2eeff",
    },
    root: {
      minWidth: 275,
      display: "inline-block",
      backgroundColor: "#e2eeff",
      color: "black",
      width: "92%",
      marginLeft: "4%",
      wordWrap: "break-word",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
      color: "black",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "black",
    },
    pos: {
      marginBottom: 3,
      color: "black",
    },
  }));
  const classes = useStyles();

  return (
    <div>
      {props.cartas.map((item, index) => (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="p" component="p">
              <PersonRoundedIcon/>  {item.usuario.usuario}
            </Typography>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              <Rating
                name="read-only"
                value={item.puntaje}
                size="small"
                readOnly
              />
              {"  ⇀  " + item.titulo}
            </Typography>
            <Typography variant="h5" component="h2">
              {item.detalleTipoExperiencia}
            </Typography>
            <Typography variant="body2" component="p" style={{fontStyle:"italic"}}>
              {'"' + item.comentario + '"'}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CartasExperiencia;
