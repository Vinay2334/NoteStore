import React from "react";
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Box } from '@mui/material'

type Props = {};

function BannerRight({}: Props) {
  var items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "hello world",
    },
  ];

  return (
    <Carousel sx={{width:'20%', height: '20%'}}>
      {items.map((item, i) => (
        <Paper>
        <img src="tempBook.jpg" alt="" />
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <Button className="CheckButton">
            Check it out!
        </Button>
    </Paper>
      ))}
    </Carousel>
  );
}

function Item(props: any)
{
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}

export default BannerRight;
