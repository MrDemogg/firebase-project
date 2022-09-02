import React, { Component } from "react";
import './Todo.css';
import ServerService from "../API/ServerService";
class Todo extends Component {
  state = {
    tasks: [],
    newTaskText: 0,
    loading: false
  }
  componentDidMount() {
    let loading = true
    this.setState({
      loading
    })
    ServerService.get('/todo.json')
      .then((e) => {
        const tasks = [...Object.values(e.data)[0]];
        this.setState({
          tasks
        })
        console.log(this.state.tasks)
      })
      .catch((e) => {
        console.log(e)
      })
    loading = false
    this.setState({
      loading
    })
  }

  AddTaskForm = () => {
    let loading = true;
    this.setState({
      loading
    })
    let getId
    const newTasks = this.state.tasks;
    const nums = [];
    for (let i = 0; i < newTasks.length; i++) {
      nums.push(newTasks[i].id)
    }
    getId = Math.max(...nums) + 1
    if (newTasks.length === 0) {
      getId = 0
    }
    newTasks.push({text: this.state.newTaskText, id: getId})
    console.log(this.state.tasks)
    this.setState({
      tasks: newTasks
    })
    console.log(newTasks)
    console.log(this.state.tasks)
    console.log(JSON.stringify(newTasks))
    ServerService.delete(`/todo.json`).then((e) => {
      console.log(e)
      ServerService.post(`/todo.json`, JSON.stringify(this.state.tasks)).then((resp) => console.log(resp))
        .catch((e) => console.log(e))
    })
    loading = false;
    this.setState({
      loading
    })
  }
  constructor() {
    super()
    this.newMessage = ""
  }
  currentTask = () => {
    const newState = this.state;
    newState.newTaskText = this.newMessage
    this.setState({
      newState
    })
    this.AddTaskForm()
  }
  DelTaskForm = (event) => {
    const newTasks = this.state.tasks;
    let loading = true;
    this.setState({
      loading
    })
    for (let i = 0; i < newTasks.length; i++) {
      if (newTasks[i].text === event.currentTarget.id) {
        ServerService.delete(`/todo.json`).then((e) => console.log(e))
        newTasks.splice(i, 1)
        this.setState({
          tasks: newTasks
        })
        console.log(this.state.tasks)
        ServerService.post(`/todo.json`, newTasks).then((e) => console.log(e))
      }
    }
    loading = false;
    this.setState({
      loading
    })
  }
  Task = (props) => {
    return (
      <div className="tasks-menu__task" id={props.id}>
        <div className="tasks-menu__content">
          {props.text}
          <button className="tasks-menu__buket" onClick={(e) => {this.DelTaskForm(e)}} id={props.text}></button>
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className="tasks-menu">
        <div className="tasks-menu__create">
          <input type="text" className="tasks-menu__input" placeholder="Input text" onChange={(e) => {this.newMessage = e.currentTarget.value}} />
            <button className="tasks-menu__upload" onClick={() => this.currentTask()}>Add</button>
        </div>
        <div className="tasks-menu__tasks">
          {this.state.tasks.length > 0
            ? this.state.tasks.map((task) => {
              return <this.Task text={task.text} id={task.id} key={task.id}></this.Task>})
            : <p>Создайте новое задание</p>
          }
        </div>
      </div>
    )
  }
}

export default Todo;
