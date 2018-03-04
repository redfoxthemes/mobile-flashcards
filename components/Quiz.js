// Quiz View
// The Quiz view starts with a question from the selected deck.
// The question is display, along with a button to show the answer.
// Pressing the 'Show Answer' button displays the answer.
// Buttons are included to allow the student to mark their guess as 'Correct' or 'Incorrect'
// The view displays the number of questions remaining.
// When the last question is answered, a score is displayed. This can be displayed as a percentage of correct answers or just the number of questions answered correctly.
// When the score is displayed, buttons are displayed to either start the quiz over or go back to the Individual Deck view.
// Both the 'Restart Quiz' and 'Back to Deck' buttons route correctly to their respective views.
import React, { Component } from 'react';
import { Text, View, Animated, Easing, Modal, PanResponder, Dimensions, BackHandler, TouchableOpacity, Button } from 'react-native';
import { styles } from './styles';
import { StackNavigator } from 'react-navigation';
import thunk from 'redux-thunk';
export default class Quiz extends Component {
cardXPos = new Animated.Value();
fadingTransitionValue = new Animated.Value();

static navigationOptions = {
  title: 'Quiz',
}
constructor(props){
    super(props);
    this.state={
    card: this.props.navigation.state.params.cards[0],
    totalCardCount: 0,
    showAnswer: false,
    finishQuiz: false,
    correctAnswersCount: 0,
    cardIndex: 0,
    modalVisible: true
    }

    this.fadeAnimation = this.fadeAnimation.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.switchCard = this.switchCard.bind(this);
    this.checkQuizAnswer = this.checkQuizAnswer.bind(this);
    this.showHideAnswerQuestion = this.showHideAnswerQuestion.bind(this);
    this.startOver = this.startOver.bind(this);
}


componentDidMount() {
  this.fadeAnimation();
}

//prevents back button in Android from working during the quiz, forcing the user to move forward
handleBackButton() {
  return true;
}
switchCard() {
  const width = Dimensions.get('window').width;
  const { cards } = this.props.navigation.state.params;
// showAnswer is set to false for a new card
this.setState({showAnswer: false});
//animate card flip
this.cardXPos.setValue(0);
    Animated.timing(
      this.cardXPos,
      {toValue: width,
      duration: 10,}
    ).start(() => {
      this.setState((prevState) => ({
        card: cards[prevState.cardIndex + 1],
        cardIndex: prevState.cardIndex + 1
      }), () => {
        this.cardXPos.setValue(width);
          Animated.spring(
            this.cardXPos,
            {toValue: 0,}).start();
      })
    });
}

 closeModal() {
   this.setState({modalVisible:false});
 }

  checkQuizAnswer(value){
    if (value) {
      this.setState({
      correctAnswersCount: this.state.correctAnswersCount + 1
      })
    }
    if(this.props.navigation.state.params.cards.findIndex(card => card === this.state.card) < this.props.navigation.state.params.cards.length - 1) {
        this.switchCard();
    } else {
      this.setState({
        finishQuiz: true,
        totalCardCount: this.props.navigation.state.params.cards.length
      });
    }
  }


  fadeAnimation() {
    this.fadingTransitionValue.setValue(0);
      Animated.timing(
        this.fadingTransitionValue,
        {toValue: 1,
        duration: 600,
        }
      ).start();
  }

  showHideAnswerQuestion() {
    this.setState({
      showAnswer: !this.state.showAnswer
    });
  }

  startOver() {
    this.setState({
      card: this.props.navigation.state.params.cards[0],
      cardIndex: 0,
      finishQuiz: false,
      correctAnswersCount: 0
    });
  }

    render(){
      const {params} = this.props.navigation.state;
      const { navigate } = this.props.navigation;
      const { card } = this.state;
      return (
        <View style={styles.container}>
        <Modal
             visible={this.state.modalVisible}
             animationType={'slide'}
             onRequestClose={() => this.closeModal()}
         >
         <View style={styles.modalContainer}>
            {!this.state.finishQuiz &&(
                <Animated.View style={[{left: this.cardXPos}, styles.container]} key={card.cardId}>
                    <Text style={styles.counter}>{this.state.cardIndex+1}/{params.cards.length}
                    </Text>
                              <Animated.Text style={[{opacity: this.fadingTransitionValue}, styles.largeFontText]}>
                              {this.state.showAnswer ?  card.answer : card.question}
                              </Animated.Text>
                        <Text style={styles.textButton} onPress={() => {
                          this.fadeAnimation()
                          this.showHideAnswerQuestion()}}>
                        {!this.state.showAnswer ? 'Show Answer' : 'Show Question'}
                        </Text>

                    <View style={{flexDirection: 'column'}}>
                      <TouchableOpacity style={styles.roundedButton} onPress={() => {
                          this.fadeAnimation()
                        this.checkQuizAnswer(true)}}>
                      <Text style={styles.smallFontText}>Correct</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.roundedButton} onPress={() => this.checkQuizAnswer(false)}>
                      <Text style={styles.smallFontText}>Incorrect</Text>
                      </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

                {this.state.finishQuiz && (
                  <View style={styles.container}>
                  <Animated.Text style={[{opacity: this.fadingTransitionValue}, styles.largeFontText]}>You have completed the quiz! Your Total score: {this.state.correctAnswersCount}/{params.cards.length}</Animated.Text>
                  <TouchableOpacity style={styles.roundedButton} onPress={() => {
                    this.closeModal()
                    this.props.navigation.goBack()}}>
                  <Text style={styles.smallFontText}>BACK</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.roundedButton} onPress={() => this.startOver()}>
                  <Text style={styles.smallFontText}>START OVER</Text>
                  </TouchableOpacity>
                  </View>
                )}
          </View>
        </Modal>

  </View>
        )
  }
}
