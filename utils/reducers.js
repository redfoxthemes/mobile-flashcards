import { combineReducers} from  'redux';
 import { GET_DECKS_COMPLETED, GET_DECK_COMPLETED, ADD_DECK_COMPLETED, DELETE_DECK_COMPLETED, ADD_CARD_COMPLETED, DELETE_CARD_COMPLETED, GET_EMPTY_DECKS } from './actions';
var sortBy = require('sort-by');

 const initialState = {
   decks: [],
   deck: []
 }

function decks(state = initialState, action) {
  switch(action.type){
        case GET_DECKS_COMPLETED:
        const unsortedDecks = action.payload.decks.slice();
        const sortedDecks = unsortedDecks.sort(sortBy('title'));
          return {
            ...state,
            decks: sortedDecks
          }
        case GET_DECK_COMPLETED:
        console.log('got to GET_DECK_COMPLETED: ', action.payload.deck)
        return {
          ...state,
          deck: action.payload.deck,
        }
        case ADD_DECK_COMPLETED:
        return {
        decks: state.decks.concat(action.payload.deck)
        }
        case ADD_CARD_COMPLETED:
        const editedDecks = state.decks.map(deck => {
           if(deck.deckId === action.payload.deck.deckId) {
             const newCards = deck.cards.concat(action.payload.newCard);
             console.log('New Cards array is: ', newCards)
             deck['cards'] = newCards;
             console.log('New Deck is: ', deck);
             return deck
           }
           return deck;
         });
         return {
           ...state,
           decks: editedDecks
         }
        default:
        {
        return state;
        }
        }
      }

//////////////////
// case DELETE_DECK_COMPLETED:
//   return {
//     decks: state.decks.filter(deck => deck.deckId !== action.payload.deckId)
// }
//
// case DELETE_CARD_COMPLETED:
// const editedDecks = state.decks.map(deck => {
//   if(deck.deckId === action.payload.deckId) {
//   return  deck.cards.filter(card => card.cardId !== action.payload.card.cardId)
//   }
//   return deck;
// });
//   return {
//   ...state,
//     decks: editedDecks
// }
//////////////////
export default combineReducers({
  decks
})
