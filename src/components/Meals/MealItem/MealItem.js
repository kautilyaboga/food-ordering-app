import React, { Fragment, useContext } from 'react';
import classes from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
import CartContext from '../../../store/cart-context';

const MealItem = props => {
  const cartCtx = useContext(CartContext);

  const price = `$${props.mealData.price.toFixed(2)}`

  const addToCartHandler = (amount) => {
    cartCtx.addItem(
      {...props.mealData,amount:amount}
    )
  }

  return (
    <Fragment>
      <li className={classes.meal}>
        <div>
          <h3>{props.mealData.name}</h3>
          <div className={classes.description}>{props.mealData.description}</div>
          <div className={classes.price}>{price}</div>
        </div>
        <div>
          <MealItemForm onAddToCart={addToCartHandler} id={props.mealData.id}/>
        </div>
      </li>
    </Fragment>
  );

}

export default MealItem 