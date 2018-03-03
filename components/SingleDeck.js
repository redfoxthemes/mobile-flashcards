// Individual Deck View
// displays the title of the Deck
// displays the number of cards in the deck
// displays an option to start a quiz on this specific deck
// An option to add a new question to the deck
import React, { Component } from 'react';
import { Text, View, TouchableHighlight, TouchableOpacity, Animated} from 'react-native';
import { styles } from './styles';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import thunk from 'redux-thunk';

class SingleDeck extends Component {

  static navigationOptions = ({ navigation }) => {
     const params = navigation.state.params || {};
     return {
       title: params ? params.deckTitle : 'Single Deck',
    }
   };

   constructor(props) {
      super(props);
       this.state={
       deck: this.props.deck
       }
      this.fadingTransitionValue = new Animated.Value();
      this.fadeAnimation = this.fadeAnimation.bind(this);
    }


  componentWillMount() {
      this.props.navigation.setParams({ deckTitle: this.props.deck.title  });

  }

  componentDidMount() {
      this.fadeAnimation();
    }

  fadeAnimation() {
    this.fadingTransitionValue.setValue(0);
      Animated.timing(
        this.fadingTransitionValue,
        {toValue: 1,
        duration: 800,
        }
      ).start();
  }

  render() {
    const { deck } = this.props;
    const { navigate } = this.props.navigation;

    return (
        <Animated.View  style={[{opacity: this.fadingTransitionValue}, styles.container]}>
          <View style={styles.paddedItem}>
          <TouchableHighlight style={styles.button} underlayColor="orange">
            <View style={styles.innerContainer}>
              <Text style={styles.largeFontText }>{deck.title}</Text>
              <Text style={styles.smallFontText}>{deck.cards.length} cards</Text>
            </View>
          </TouchableHighlight>
          </View>
          <View style={{flexDirection: 'column'}}>
            <TouchableOpacity style={styles.roundedButton} onPress={() => {
            navigate('AddCard', { deck: deck });
            }}>
            <Text style={styles.smallFontText}>ADD CARD</Text>
            </TouchableOpacity>
            {deck && deck.cards.length>0 &&(
            <TouchableOpacity style={styles.roundedButton} onPress={() => {
            navigate('Quiz', {cards: deck.cards});
            }}>
            <Text style={styles.smallFontText}>START QUIZ</Text>
            </TouchableOpacity>
             )}
          </View>
        </Animated.View>
    )
  }
}


function mapStateToProps (state) {
  return {deck: state.decks.deck}
}

export default connect(mapStateToProps)(SingleDeck);
