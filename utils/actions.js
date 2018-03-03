//import * as api from './api';
import { AsyncStorage } from 'react-native';

const FLASHCARDS_KEY = '@Flashcards:decks';


export const GET_EMPTY_DECKS = 'GET_EMPTY_DECKS';
export const GET_DECKS_COMPLETED = 'GET_DECKS_COMPLETED';
export const GET_DECK_COMPLETED = 'GET_DECK_COMPLETED';
export const ADD_DECK_COMPLETED = 'ADD_DECK_COMPLETED';
export const DELETE_DECK_COMPLETED = 'DELETE_DECK_COMPLETED';
export const ADD_CARD_COMPLETED = 'ADD_CARD_COMPLETED';
export const DELETE_CARD_COMPLETED = 'DELETE_CARD_COMPLETED';
//////////////////////////////////////////////////////////////
//USER OR VIEW ACTIONS - initiated by User
//////////////////////////////////////////////////////////////
////getDecks() gets the items from AsyncStorage and sets the initial dummy data if needed
 export function getDecks() {
  const dummyDeck= [
      {
        deckId: '120708478054',
        title: 'React',
        cards: [
          {
            cardId: '90880704869086',
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          },
          {
            cardId: '90867704869086',
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event'
          }
        ]
      },
      {
        deckId: '297880854908',
        title: 'JavaScript',
        cards: [
          {
            cardId: '90880324869086',
            question: 'What is a closure?',
            answer: 'The combination of a function and the lexical environment within which that function was declared.'
          }
        ]
      }
  ]

  return dispatch => {
    AsyncStorage.getItem(FLASHCARDS_KEY)
    .then(response => {
      response === null
      ? AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify(dummyDeck), () => {
          AsyncStorage.getItem(FLASHCARDS_KEY, (err, result) => {
          dispatch(getDecksCompleted(JSON.parse(result)))
          })
        })
      : dispatch(getDecksCompleted(JSON.parse(response)));})
    .catch((err) => console.log('Error in getDecks()', err));
  }
}
// addDeck: takes in a single title argument and adds it to the decks
export function addDeck( value ) {
  return dispatch => {
    AsyncStorage.getItem(FLASHCARDS_KEY, (err, results) => {
      AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify((JSON.parse(results)).concat(value)), () => {
        dispatch(addDeckCompleted(value))
      })
    })
    .catch((err) => console.log('error in addDeck():', err))
  };
}

// addCardToDeck: takes in two arguments, deckId and card, and will add the card to the list of questions for the deck with the associated title
export function addCardToDeck(deck, newCard) {
  return dispatch => {
    AsyncStorage.getItem(FLASHCARDS_KEY).then((results) => {
      const newCards = deck.cards.concat(newCard);
      deck['cards'] = newCards;
     const editedDecks = (JSON.parse(results)).map(storedDeck => {
            if(storedDeck.deckId === deck.deckId) {
              return deck;
            }
            return storedDeck;
          });
          AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify(editedDecks), () =>
          {dispatch(getDecksCompleted(editedDecks))})
          .catch((err) => console.log('Error in addCardToDeck()', err));
    })
  }
}
export function getDeck(deckId) {
  return dispatch => {
    AsyncStorage.getItem(FLASHCARDS_KEY).then((results) => {
    (JSON.parse(results)).map(storedDeck => {
            if(storedDeck.deckId === deckId) {
              dispatch(getDeckCompleted(storedDeck))
            }
          });
        })
          .catch((err) => console.log('Error in getDeck()', err));
  }
}
// deleteDeck: takes in a single argument, deckId, and deletes the deck associated with that id
export function deleteDeck(deckId) {
  return dispatch => {
    AsyncStorage.getItem(FLASHCARDS_KEY).then((results) => {
      const filteredDecks = JSON.parse(results).filter(deck => deck.deckId !== deckId);
        AsyncStorage.setItem(FLASHCARDS_KEY, JSON.stringify(filteredDecks), () =>
          {dispatch(getDecksCompleted(filteredDecks))})
          .catch((err) => console.log('Error in deleteDeck()', err));
    })
  }
}


///////////////////////////////////////////////////////////////////
//SERVER actions
///////////////////////////////////////////////////////////////////

//getDecksCompleted(decks) is an action creator that returns new decks objects array to reducer
function getDecksCompleted(decks) {
  return {
    type: GET_DECKS_COMPLETED,
    payload: {
      decks,
    },
  };
}
//getSingleDeckCompleted(decks) is an action creator that returns a selected deck object to reducer
export function getDeckCompleted(deck) {
  console.log('dispatched getDeckCompleted')
  return {
    type: GET_DECK_COMPLETED,
    payload: {
      deck,
    },
  };
}
//addDeckCompleted(deck) is an action creator that returns new deck object to reducer
function addDeckCompleted(deck) {
  return {
      type: ADD_DECK_COMPLETED,
      payload: {
        deck,
      },
    };
}
//addCardCompleted(card) is an action creator that returns new card object to reducer
function addCardCompleted(deck, newCard) {
  return {
    type: ADD_CARD_COMPLETED,
    payload: {
      deck,
      newCard
    },
  };
}
//deleteDeckCompleted(deckId) is an action creator that returns deckId of deck object to be filtered to reducer
function deleteDeckCompleted(deckId) {
  return {
    type: DELETE_DECK_COMPLETED,
    payload: {
      deckId,
    },
  };
}
