
export function Calculation(type, value1, value2){
  return {
    type: type,
    payload:{
      currentValue : value1,
      nextValue    : value2
    }
  }
}
