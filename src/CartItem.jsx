import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = () => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => {
            const itemCost = parseFloat(item.cost.replace('$', ''));
            return total + item.quantity * itemCost;
        }, 0);
    };

    return (
        <div className="cart-container">
            <h2>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
            {cart.map((item) => (
                <div key={item.name}>
                    <img src={item.image} alt={item.name} />
                    <div>{item.name}</div>
                    <div>Cost: {item.cost}</div>
                    <div>
                        <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }))}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }))}>+</button>
                    </div>
                    <button onClick={() => dispatch(removeItem(item.name))}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default CartItem;
