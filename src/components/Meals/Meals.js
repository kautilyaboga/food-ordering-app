// import classes from './Meals.module.css'
import { Fragment } from 'react';

import MealSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = () =>{
    return <Fragment>
        <MealSummary/>
        <AvailableMeals/>
    </Fragment>
}

export default Meals;