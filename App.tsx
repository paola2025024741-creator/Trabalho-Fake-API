import React, {
  useState,
} from 'react';

import Home from './src/screens/Home';
import Detail from './src/screens/Detail';
import Cart from './src/screens/Cart/index';
import CreateProduct from './src/screens/CreateProduct';

import {
  Product,
  CartItem,
} from './src/types';


export default function App() {

  const [screen, setScreen] =
    useState<
      'home' | 'detail' | 'cart' | 'create'
    >('home');


  const [selectedProductId, setSelectedProductId] =
    useState<number | null>(null);


  const [cartItems, setCartItems] =
    useState<CartItem[]>([]);


  function openDetail(
    product: Product
  ) {

    setSelectedProductId(
      product.id
    );

    setScreen('detail');
  }


  function addToCart(
    product: Product,
    quantity: number
  ) {

    const itemAlreadyExists =
      cartItems.find(
        (item) =>
          item.id === product.id
      );


    if (itemAlreadyExists) {

      setCartItems(
        cartItems.map((item) => {

          if (
            item.id === product.id
          ) {

            return {
              ...item,
              quantity:
                item.quantity +
                quantity,
            };

          }

          return item;

        })
      );

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: quantity,
        },
      ]);

    }


    setScreen('cart');
  }


  function changeQuantity(
    id: number,
    quantity: number
  ) {

    if (quantity <= 0) {

      removeItem(id);

      return;
    }


    setCartItems(
      cartItems.map((item) => {

        if (item.id === id) {

          return {
            ...item,
            quantity: quantity,
          };

        }

        return item;

      })
    );
  }


  function removeItem(
    id: number
  ) {

    setCartItems(
      cartItems.filter(
        (item) =>
          item.id !== id
      )
    );
  }


  if (
    screen === 'detail' &&
    selectedProductId !== null
  ) {

    return (
      <Detail
        productId={
          selectedProductId
        }

        onBack={() =>
          setScreen('home')
        }

        onAddToCart={
          addToCart
        }
      />
    );
  }


  if (screen === 'cart') {

    return (
      <Cart

        items={cartItems}

        onBack={() =>
          setScreen('home')
        }

        onChangeQuantity={
          changeQuantity
        }

        onRemove={
          removeItem
        }

      />
    );
  }

  if (screen === 'create') {
        return (
        <CreateProduct
            onBack={() => setScreen('home')}
         />
       );
  }


  return (
    <Home

      onProductPress={
        openDetail
      }

      onCartPress={() =>
        setScreen('cart')
      }
      onCreateProduct={() =>
        setScreen('create')
      }

    />
  );
}