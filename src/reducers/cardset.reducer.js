import { GET_CARDSETS, REMOVE_CARDSET, ADD_CARDSET, EDIT_CARDSET } from '../actions';

const initialState = {
    sets: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CARDSETS:
            return {
                sets: action.payload
            }
        case REMOVE_CARDSET:
            return {
                sets: state.sets.filter(set => set._id !== action.payload)
            }
        case ADD_CARDSET:
            return {
                sets: state.sets.concat([action.payload])
            }
        case EDIT_CARDSET:
            let newSets = [];
            for (let i = 0; i < state.sets.length; i++) {
                if (state.sets[i]._id === action.payload._id) {
                    let set = state.sets[i];
                    set.title = action.payload.title;
                    set.description = action.payload.description;
                    newSets.push(set);
                } else {
                    newSets.push(state.sets[i]);
                }
            }
            return {
                sets: newSets
            }
        default:
            return state;
    }
}