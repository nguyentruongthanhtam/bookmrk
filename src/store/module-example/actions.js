
export const login = ({commit,state},user) => {
  let result;
  if(state.user.username === user.username && user.username)
      {
        if(state.user.password === user.password)
        {
          result = {code: 'ok',msg: 'Logged in!'}
          commit('login')
        }
        else{
          result = {code: 'wrong',msg: 'Wrong username or password'}   
        }
      }
      else{
        result = {code: 'error',msg: 'Can\'t find that user'}          
        }
    return result;
}

export const logout = ({state,commit}) => {
  if(state.user.isLogged)
  {
    commit('logout');
    return true;
  }
  return ;

}