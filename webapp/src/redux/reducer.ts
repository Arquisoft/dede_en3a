import {
    INCREASE,
    DECREASE,
    REMOVE,
    CLEAR_CART,
    GET_TOTALS,
} from './actions';

function reducer(state, action) {
    if (action.type === DECREASE) {
        return {
            ...state, cart: state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    if (item.amount === 0) {
                        return item;
                    } else {
                        item.amount--;
                    }
                }
                return item;
            })
        }
    }
    if (action.type === INCREASE) {
        return {
            ...state, cart: state.cart.map((item) => {
                if (item.id === action.payload.id) {
                    item.amount++;
                }
                return item;
            })
        }
    }
    if (action.type === CLEAR_CART) {
        return { ...state, cart: [] };
    }
    if (action.type === REMOVE) {
        return {...state, cart: state.cart.filter(item => item.id !== action.payload.id)}
    }
    if (action.type === GET_TOTALS) {
        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem;
            cartTotal.amount += amount;
            cartTotal.total += Math.floor(amount * price);
            return cartTotal;
        }, { amount: 0, total: 0 });
        return { ...state, total, amount };
    }
    return state;
}

export default reducer;