

var initState = {  // tạo một state
        by: 'name1',
        value: 1
    }

// Tạo 1 reducer để xử lý state có 2 tham số truyền vào
// 1: state hiện tại
// 2 : action
var Reducer = (state = initState,action)=>{
    if(action.type == 'SORT'){
        return {
            sort:{
                by:action.sort.by,
                value:action.sort.value
            }
        }
    }
   return state;
}
export default Reducer;