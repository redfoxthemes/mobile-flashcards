import { StyleSheet } from 'react-native';

var bgColor = [
      '#CDF7F6',
      '#8FB8DE',
      '#9A94BC',
      '#9B5094',
    ];
var color = bgColor[Math.floor(Math.random()*bgColor.length)];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0F0',
    justifyContent: 'center',
  },
modalContainer: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  justifyContent: 'center',
  backgroundColor: '#F1F0F0',
},
innerContainer: {
  flexDirection: 'column',
  alignItems: 'stretch',
  borderWidth: 0,
  borderRadius: 5,
  backgroundColor: color,
},
scrollList: {
  flex: 1,
  paddingTop: 20,
},
paddedItem: {
  borderWidth: 0,
  paddingTop: 20,
  paddingLeft: 10,
  paddingRight: 10,
},
largeFontText: {
  paddingTop: 10,
  paddingBottom: 20,
  fontSize: 30,
  textAlign: 'center',
},
mediumFontText: {
  paddingTop: 10,
  paddingBottom: 20,
  fontSize: 18,
  color: color,
  textAlign: 'center',
},
smallFontText: {
  fontSize: 18,
  color: '#141211',
  paddingTop: 10,
  paddingBottom: 10,
  textAlign: 'center',
},
button: {
  padding: 20,
  borderWidth: 0,
  alignSelf: 'stretch',
  backgroundColor: 'rgba(255,255,255,.8)',
},
stretchedButton: {
  alignItems: 'center',
  backgroundColor: '#A09997',
  padding: 5,
},
roundedButton: {
  marginLeft: 20,
  marginRight: 20,
  marginTop: 30,
  padding: 10,
  borderColor: color,
  borderWidth: 1,
  borderRadius: 5,
  alignSelf: 'stretch',
  backgroundColor: 'transparent',
},
counter: {
  fontSize: 18,
  color: 'black',
  alignSelf: 'flex-end',
  paddingRight: 20,
  paddingBottom: 30,
},
textButton: {
  color: '#9A94BC',
  fontSize: 18,
  paddingTop: 10,
  paddingBottom: 10,
  textAlign: 'center',
},
form: {
  flex: 1,
  height: 100,
  backgroundColor: '#C8C5C3',
},
txtInput: {
  margin: 5,
  padding: 5,
  borderWidth: 1,
  borderColor: color,
  borderRadius: 5,
  fontSize: 20,
  backgroundColor: color,
},
androidBtn: {
  margin: 5,
  backgroundColor: color,
  padding: 5,
  height:30,
  width: 30,
  borderRadius: 15,
  alignItems: 'center',
},
iosBtn: {
  backgroundColor: 'white',
  height: 30,
  width: 30,
  borderRadius: 15,
  borderWidth: 0,
  padding: 5,
  marginRight: 20,
}
});


export { styles}
