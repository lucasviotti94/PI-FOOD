// import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';

import foto1 from '../../assets/FotoJet.jpg';
import foto2 from '../../assets/FotoJet2.jpg';
import foto3 from '../../assets/FotoJet3.jpg';

export default function CarouselComponent () {    


    return (
        <>
        <Carousel>
        <Carousel.Item interval={2000}>
            <img
            className="d-block"
            style={{ height: 600, width: "100%", opacity: 0.8 }}
            src={foto1}
            alt="First slide"
            />
            <Carousel.Caption>
            <h3
            style= {{
                color: "#638e4c",
                textShadow: "1px 1px 1px black"
                }}>
                Spicy chicken with stir-fried vegetables
                </h3>
            <p
            style= {{color: "#638e4c",
            textShadow: "1px 1px 1px black"}}>For lovers of spicy and cold salads</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
            <img
            className="d-block"
            style={{ height: 600, width: "100%", opacity: 0.8 }}
            src={foto2}
            alt="Second slide"
            />
            <Carousel.Caption>
            <h3 style= {{color: "#638e4c",
                textShadow: "1px 1px 1px black"}}>Pepper Lime Bruschetta</h3>
            <p style= {{color: "#638e4c",
                textShadow: "1px 1px 1px black"}}>Refreshing lime-based first course to start a dinner in the best way</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
            <img
            className="d-block"
            style={{ height: 600, width: "100%", opacity: 0.8 }}
            src={foto3}
            alt="Third slide"
            />
            <Carousel.Caption>
            <h3 style= {{color: "#638e4c",
                textShadow: "1px 1px 1px black"}}>Slice of pork in vinegar with asparagus</h3>
            <p style= {{color: "#638e4c",
                textShadow: "1px 1px 1px black"}}>For those pork lovers, accompanied by a light spicy asparagus salad</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
        </>
  );
}
