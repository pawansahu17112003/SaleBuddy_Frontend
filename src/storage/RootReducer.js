const initialState = {
       cart: {},
       user: {},
       admin: {}
}

export default function RootReducer(state = initialState, action) {
       switch (action.type) {
              case "ADD_CART":
                     state.cart[action.payload[0]] = action.payload[1]
                     localStorage.setItem('cart', JSON.stringify(state.cart))
                     return { cart: state.cart, user: state.user, admin: state.admin }
              case "DEL_CART":
                     delete state.cart[action.payload[0]]
                     localStorage.setItem('cart', JSON.stringify(state.cart))
                     return { cart: state.cart, user: state.user, admin: state.admin }
              case "ADD_USER":
                     state.user[action.payload[0]] = action.payload[1]
                     localStorage.setItem('user', JSON.stringify(state.user))
                     return { cart: state.cart, user: state.user, admin: state.admin }
              case "CLEAR_CART":
                     state.cart = {}
                     localStorage.removeItem('cart')
                     return { cart: state.cart, user: state.user, admin: state.admin }
              case "LOGOUT":
                     state.user = {}
                     localStorage.removeItem('user')
                     return { cart: state.cart, user: state.user, admin: state.admin }
              case "ADMIN_LOGIN":
                     state.admin[action.payload[0]] = action.payload[1]
                     localStorage.setItem('admin', JSON.stringify(state.admin))
                     return { cart: state.cart, user: state.user, admin: state.admin }
              case "ADMIN_LOGOUT":
                     state.admin = {}
                     localStorage.removeItem('admin')
                     return { cart: state.cart, user: state.user, admin: state.admin }
              default:
                     return { cart: state.cart, user: state.user, admin: state.admin }
       }

}