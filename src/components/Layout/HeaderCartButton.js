import { Fragment, useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css'
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {
    const [btnBump,setBtnBump] = useState(false);
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx?.items?.reduce((curNumber,item) => {
        return curNumber+item?.amount
    },0)


    const btnClasses =`${classes.button} ${ btnBump ? classes.bump : ''}`

    useEffect(()=>{
        if(numberOfCartItems) setBtnBump(true);

        const timer = setTimeout(() => {
            setBtnBump(false)
        }, 300);

        return()=>{
            clearTimeout(timer);
        }
    },[numberOfCartItems])

 return(
    <Fragment>
        <button onClick={props.onClick} className={btnClasses} >
        <span className={classes.icon}><CartIcon/></span> 
        <span>Your Cart</span> 
        <span className={classes.badge}>{numberOfCartItems}</span>         
        </button>
    </Fragment>
 )
}

export default HeaderCartButton;