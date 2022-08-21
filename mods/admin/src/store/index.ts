
import {configureStore, createSlice} from '@reduxjs/toolkit'


const ZoneState: string[] = [] 

const zoneSlice = createSlice({
    name: `zones`,
    initialState: ZoneState,
    reducers: {
        add: (state, action) => {
            return [...state, action.payload]
        },
        remove: (state, action) => {
            return state.filter(x => x !== action.payload)
        },
        setAll:(state, action) => {
            return action.payload
        }
    }
})

export const dispatch = {
    zone: {...zoneSlice.actions}
}
export const store = configureStore({
    reducer: {
        zones: zoneSlice.reducer
    }
})