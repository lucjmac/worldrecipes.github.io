import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useEffect } from "react";
import SliderCard from "./SliderCard";
import get from "../../utils/conexionAPI.js";

import "../../../src/variables.css";
import "../../../src/index.css"; 


const SliderGrid = () => {
    const [recetas, setRecetas] = useState([]);

    useEffect(() => {
        get("/search.php?s=").then((data) => {
            setRecetas(data.meals);
        });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    return (
        <Slider {...settings}>
            {recetas.map((receta) => (
                <SliderCard key={receta.idMeal} recetasMap={receta} />
            ))}
        </Slider>
    );
};

export default SliderGrid;