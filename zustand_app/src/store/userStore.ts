import {create} from "zustand";
import {persist, devtools} from "zustand/middleware";

type UserStore = {
    user: {
        name: string,
        age: number,
    },
    setName: (name: string) => void,

}

// пример использования middleware(devtools и persist)
// persist сохраняет стейт в localStore
export const useUser = create<UserStore>()(
    devtools(
        persist(
            set => ({
                user: {
                    name: "user1",
                    age: 25
                },
                setName: (name: string) => set(state => ({user: {...state.user, name: name}})),
            }),
            {name: 'userStore'},
        ),
    ),
)

type DataStore = {
    data: string,
    loading: boolean,
    error: any,
    fetchData: () => void,
}

export const useData = create<DataStore>(set => ({
    data: '',
    loading: false,
    error: null,
    fetchData: async () => {
        set({ loading: true})
        try {
            await new Promise(res => setTimeout(res, 1000))
            set({data: "data from server"})
        }catch (err) {
            set({error: err.message})
        } finally {
            set({ loading: false})
        }
    }
}))
