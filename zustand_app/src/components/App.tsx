import {useState} from "react";
import {useData, useUser} from "../store/userStore";
import {useFilter, useTodos} from "../store/todoStore";

// работа с стейтом в функциях, которые распологаются снаружи компонента
function getUser() {
    const user = useUser.getState().user;
    console.log(user)
}

function name() {
    useUser.getState().setName("Olga")
}

function setUser() {
    const user = {
        name: "Mark",
        age: 57,
    }
    useUser.setState({user: user})
}

export const App = () => {
    console.log("!!!")

    const [value, setValue] = useState("")

    // при таком способе получения данных из стейта, будет перерисовываться весь комонент,
    // даже если будут изменяться поля в стейте, которые мы не используем в текущем компоненте
    // const {todos} = useTodos()
    const todos = useTodos(state => state.todos)
    const addTodo = useTodos(state => state.addTodo)
    const toggleTodo = useTodos(state => state.toggleTodo)

    const {filter, setFilter} = useFilter()
    const filteredTodos = useTodos((state) => {
        switch (filter) {
            case 'completed':
                return state.todos.filter((todo) => todo.completed)
            case 'uncompleted':
                return state.todos.filter((todo) => !todo.completed)
            default:
                return state.todos
        }
    })

    const age = useUser(state => state.user.age)
    const setName = useUser(state => state.setName)

    const {loading, data, fetchData} = useData()

    return (
        <div>
            <div>
                <h3>Todos</h3>
                {todos && todos.map((todo) => (
                    <div key={todo.id}>
                        <span>{todo.id} </span>
                        <span>{todo.title} </span>
                        <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)}/>
                    </div>
                ))}
                <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
                <button onClick={() => addTodo(value)}>addTodo</button>
            </div>

            <div>
                <h3>Filtered todos</h3>
                <div>
                    <button disabled={filter === 'all'} onClick={() => setFilter('all')}>all</button>
                    <button disabled={filter === 'uncompleted'} onClick={() => setFilter('uncompleted')}>uncompleted
                    </button>
                    <button disabled={filter === 'completed'} onClick={() => setFilter('completed')}>completed</button>
                </div>
                {filteredTodos && filteredTodos.map((todo) => (
                    <div key={todo.id}>
                        <span>{todo.id} </span>
                        <span>{todo.title} </span>
                        <span>{todo.completed} </span>
                    </div>
                ))}
            </div>

            <div>
                <h3>User</h3>
                <span>age: {age}</span>
                {/*При изменении name, компонент не будет перерендываться(смотри на !!! в консоли), т.к. мы его не используем в компоненте.*/}
                {/*Мы используем age в компоненте, и не смотря на то, что name и age принадлежат одному объекту user, перересовки при изменении name не происходит */}
                <button onClick={() => setName("alex")}>setName</button>
            </div>

            <div>
                <h3>fetch data from server</h3>
                <button onClick={() => fetchData()}>get data</button>
                <div>{loading ? "loading..." : data}</div>
            </div>

            <div>
                <h3>user function out of component</h3>
                <button onClick={() => getUser()}>getUser</button>
                <button onClick={() => name()}>setName</button>
                <button onClick={() => setUser()}>setUser</button>
            </div>
        </div>
    );
};
