import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items : [],
    totalAmount : 0,
}


const cartReducer = (state,action) =>{
    if(action?.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action?.item.price * action?.item?.amount;

        const exisitngCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
        const exisitngCartItem = state.items[exisitngCartItemIndex];

        let updatedItem
        let updatedItems

        if (exisitngCartItem) {
            updatedItem = {
                ...exisitngCartItem,
                amount :exisitngCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[exisitngCartItemIndex] = updatedItem ;
        }
        else{
            updatedItems = state?.items.concat(action.item);
        }

        return {
            items : updatedItems,
            totalAmount : updatedTotalAmount,
        };

    }
    else if(action?.type === 'REMOVE'){
        
        const exisitngCartItemIndex = state.items.findIndex(item => item.id === action.id)
        const exisitngCartItem = state.items[exisitngCartItemIndex];
        
        const updatedTotalAmount = state?.totalAmount - exisitngCartItem?.price;

        let updatedItems;

        if(exisitngCartItem?.amount > 1){
            const updatedItem = {...exisitngCartItem, amount : exisitngCartItem?.amount-1}
            updatedItems = [...state.items]
            updatedItems[exisitngCartItemIndex] = updatedItem;
        }

        else {
            updatedItems = state.items.filter((item)=>{
                return item.id !== action.id;
            })
        }

        return {
            items : updatedItems,
            totalAmount : updatedTotalAmount,
        };

    }
    return defaultCartState
}

const CartProvider = props =>{

    const [cartState, dispatchCartAction] = useReducer(cartReducer,defaultCartState)


    const addItemToCartHandler = item =>{
        dispatchCartAction({type  : 'ADD', item : item});
    };
   
    const removeItemToCartHandler = id =>{
        dispatchCartAction({type  : 'REMOVE', id : id});

    };

    const cartContext = {
        items: cartState?.items,
        totalAmount : cartState?.totalAmount,
        addItem : addItemToCartHandler,
        removeItem : removeItemToCartHandler,
    }


    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;