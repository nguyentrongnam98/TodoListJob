import * as types from './../Contanst/index'


export const status = ()=> {
    // Thuc hien công việc thay đổi status
   return {
      type: types.CHANGESTATUS
   }
}
// Thuc hien Sort
// Truyền các thay đổi trong action
export const sort = (sort) => {
    return {
        type:types.SORT,
        sort,
    }
}