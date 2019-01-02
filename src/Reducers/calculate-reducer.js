export default function calculateReducer(state='0', {type, payload}){
    switch (type) {
      case "+":
          return payload.currentValue + payload.nextValue;
        break;
      case "-":
          return payload.currentValue - payload.nextValue;
        break;
      case "/":
          return payload.currentValue / payload.nextValue;
        break;
      case "*":
          return payload.currentValue * payload.nextValue;
        break;
      case "=":
          return payload.nextValue;
        break;
      case "single":
          return payload.num1;
        break;
      case "double":
          return String(payload.num2) + String(payload.num1) ;
        break;
      default:
          return state;
    }
}
