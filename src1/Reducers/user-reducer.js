import {UPDATE_USER} from '../Actions/user-action'

export default function userReducer(state='', {type, payload}){
    switch (type) {
      case UPDATE_USER:
          return payload.user;
        break;
      default:
          return state;
    }
}
