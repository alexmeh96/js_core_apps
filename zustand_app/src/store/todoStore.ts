import {create} from "zustand";
import {persist, devtools} from "zustand/middleware";

type TodoStore = {
    todos: {
        id: number,
        title: string,
        completed: boolean
    }[],
    addTodo: (title: string) => void,
    toggleTodo: (todoId: number) => void,
}
export const useTodos = create<TodoStore>((set, get) => ({
    todos: [
        {id: 1, title: "title1", completed: true},
        {id: 2, title: "title2", completed: false},
    ],

    loading: false,
    error: null,

    // примеры разных способов обнавления состояния

    // addTodo: (title: string) => set(state => {
    //     const newTodo = { id:  Date.now(), title, completed: false}
    //     return { todos: [...state.todos, newTodo] }
    // }),
    // addTodo: (title: string) => {
    //     const newTodo = { id:  Date.now(), title, completed: false}
    //     set(state => ({todos: [...state.todos, newTodo]}))
    // },
    addTodo: (title: string) => {
        const newTodo = {id: Date.now(), title, completed: false}
        set({todos: [...get().todos, newTodo]})
    },
    toggleTodo: (todoId: number) => set({
        todos: get().todos.map(todo => todoId === todo.id ? {...todo, completed: !todo.completed} : todo)
    }),
}))


type FilterStore = {
    filter: string,
    setFilter: (value: string) => void,

}
export const useFilter = create<FilterStore>(set => ({
    filter: 'all',
    setFilter: (value: string) => set({filter: value})
}))
