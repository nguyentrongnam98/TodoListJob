import React, { Component } from 'react';
import './App.css'
import TaskForm from './Component/TaskForm'
import Control from './Component/Control'
import TaskList from './Component/TaskList'
import demoRedux from './demo/demoRedux'
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      tasks : [],
      isDisplayForm: false,
      tasksEdit:null,
      filter:{
        name:'',
        status:-1
      },
      keyword:''
    }
  }
  componentWillMount(){
     if(localStorage && localStorage.getItem('tasks')){
       var arr = JSON.parse(localStorage.getItem('tasks'))
       this.setState({
         tasks:arr
       })
     }
  }
  generateData=()=> {
      var tasks = [
        {
          id: 1,
          name:'Học lập trình',
          status:true
        },
        {
          id: 2,
          name:'Đi bơi',
          status:true
        },
        {
          id: 3,
          name:'Đi xem phim',
          status:false
        }
      ]
      this.setState({
        tasks:tasks
      })
      localStorage.setItem('x',JSON.stringify(tasks))
  }
  onToggle = ()=>{
    if(this.state.isDisplayForm && this.state.tasksEdit){
      console.log('TH1')
      this.setState({
        isDisplayForm:true,
        tasksEdit:null
      })
    }else{
    this.setState({
      isDisplayForm:!this.state.isDisplayForm,
      tasksEdit:null
    })
  }
  }
  onCloseform=()=>{
    this.setState({
      isDisplayForm:false
    })
  }
  onSubmit = (data)=>{
   
    var {tasks} = this.state;
    if(data.id == ''){
      tasks.push(data);
    }else{
      var index =   this.findindex(data.id)
      this.state.tasks[index] = data
    }
    this.setState({
      tasks:tasks,
      tasksEdit:null
   });
      localStorage.setItem('tasks',JSON.stringify(tasks))
  }
  onUpdateStatus = (id)=>{
      var index =   this.findindex(id)
      console.log(index)
      if(index !== -1){
        this.state.tasks[index].status = !this.state.tasks[index].status;
        this.setState({
          tasks:this.state.tasks
        });
        localStorage.setItem('tasks',JSON.stringify(this.state.tasks))
      }
  }
  findindex = (id)=>{
    var result = -1;
    this.state.tasks.forEach((task,index)=>{
      if(task.id === id){
        result = index
      }
    });
    return result;
  }
  onDelete = (id)=>{
    var index =   this.findindex(id)
    if(index !== -1){
      this.state.tasks.splice(index,1)
      this.setState({
        tasks:this.state.tasks
      });
      localStorage.setItem('tasks',JSON.stringify(this.state.tasks))
    }
    this.onCloseform()
  }
  onUpdate = (id)=>{
    var index =   this.findindex(id)
    var tasksEdit = this.state.tasks[index]
    this.setState({
      tasksEdit:tasksEdit
    })
    this.onShowform()
  }
  onShowform = ()=>{
    this.setState({
      isDisplayForm:true
    })
  }
  onFilter=(filterName,filterStatus)=>{
      filterStatus = parseInt(filterStatus,10);
      this.setState({
        filter:{
          name:filterName,
          status:filterStatus
        }
      })
  }
  onSearch = (keyword)=>{
    this.setState({
      keyword:keyword
    })
  }
  render() {
    var {tasks, isDisplayForm,filter,keyword} = this.state;
     
    if(filter){
      if(filter.name){
        tasks = tasks.filter((task)=>{
            return task.name.toLowerCase().indexOf(filter.name) !== -1;
          })
      }
      if(filter.status){
       tasks = tasks.filter((task)=>{
           if(filter.status === -1){
             return task;
           }else{
             return task.status === (filter.status === 1 ? true : false)
           }
        })
      }
      if(keyword){
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(keyword) !== -1;
        })
      }
    }
    var elementForm = isDisplayForm == true ? <TaskForm onSubmit= {this.onSubmit} onClose = {this.onCloseform} task= {this.state.tasksEdit}/>:'';
    return (
      <div className="container">
        <div className="text-center">
          <h1>Quản Lý Công Việc</h1>
          <hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4':''}>
             {elementForm}
          </div>
          <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
            <button type="button" className="btn btn-primary"
                    onClick= {this.onToggle} 
            >
              <span className="fa fa-plus mr-5" />Thêm Công Việc
            </button>
            <button type="button" className="btn btn-danger" onClick = {this.generateData}>
              <span className="fa fa-plus mr-5" />Generate Data
            </button>
               <Control onSearch = {this.onSearch}/>
            <div className="row mt-15">
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList tasks = {tasks} onUpdateStatus = {this.onUpdateStatus} onDelete = {this.onDelete} onUpdate = {this.onUpdate}
                  onFilter= {this.onFilter}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

