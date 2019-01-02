export const UPDATE_USER = 'users:updateUser'

export function updateUser(newUser, type){
  return {
    type: type,
    payload:{
      user : newUser
    }
  }
}
