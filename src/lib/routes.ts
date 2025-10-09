export const routes = {
  home: "/",
  products: "/products",
  product: (id: string) => `/product/${id}`,
  cart: "/cart",
  checkout: "/checkout",
  orderConfirmation: (orderId: string) => `/order-confirmation/${orderId}`,
  login: "/login",
  register: "/register",
}
