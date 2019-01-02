export default function inputReducer(state='0', {type, payload}){
    switch (type) {
      case "number":
          return payload;
        break;
      default:
          return state;
    }
}
