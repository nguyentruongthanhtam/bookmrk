
export const addItem = (state,item) => {
    state.items.push(item);
}
export const addLink = (state, link) => {
    state.links.push(link) ;
}
export const updateItem = (state,item,id) => {
  state.items[id] = item;
}
export const updateLink = (state,link,id) => {
  state.items[id] = link;
}
export const deleteItem = (state,id) => {
  state.items.splice(id,1);
}
export const deleteLink = (state,id) => {
  state.links.splice(id,1);
}
export const login = (state) => {
  state.user.isLogged = !state.user.isLogged;
}
export const logout = (state) => {
    state.user.isLogged = !state.user.isLogged;
}


