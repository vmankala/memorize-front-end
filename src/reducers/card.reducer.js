import { GET_CARDSET, REMOVE_CARD, ADD_CARD, EDIT_CARD } from '../actions';

const initialState = {
    title: '',
    description: '',
    cards: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CARDSET:
            return {
                title: action.payload.title,
                description: action.payload.description,
                cards: action.payload.cards
            }
        case REMOVE_CARD:
            return {
                ...state,
                cards: state.cards.filter(card => card._id !== action.payload._id)
            }
        case ADD_CARD:
            return {
                ...state,
                cards: state.cards.concat([action.payload])
            }
        case EDIT_CARD:
            let newCards = [];
            for (let i = 0; i < state.cards.length; i++) {
                if (state.cards[i]._id === action.payload._id) {
                    let card = state.cards[i];
                    card.prompt = action.payload.prompt;
                    card.answer = action.payload.answer;
                    newCards.push(card);
                } else {
                    newCards.push(state.cards[i]);
                }
            }
            return {
                ...state,
                cards: newCards
            }
        default:
            return state;
    }
}