export function Input(type, value1, value2){
  return {
    type: type,
    payload:{
      num1 : value1,
      num2 : value2
    }
  }
}
