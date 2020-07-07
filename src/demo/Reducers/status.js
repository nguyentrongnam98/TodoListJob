

var initState = false;
// Tạo 1 reducer để xử lý state có 2 tham số truyền vào
// 1: state hiện tại
// 2 : action
var Reducer = (state = initState,action)=>{
    if(action.type == 'CHANGESTATUS'){
        state = ! state;
        return state;
    }  
    return state;
}
export default Reducer;