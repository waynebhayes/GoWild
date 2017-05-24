import React from 'react';
import {Animated, Component, View, StyleSheet, Text} from 'react-native'

export class BarChart extends React.Component {
  constructor () {
    super()
    const width = {pts: 20, ast: 20, reb: 20}
    this.state = {
      pts: new Animated.Value(width.pts),
      ast: new Animated.Value(width.ast),
      reb: new Animated.Value(width.reb)
    }
  }

  handeleAnimation () {
    const timing = Animated.timing
    const width = {pts: 200, ast: 100, reb: 100}
    const indicators = ['pts', 'ast', 'reb']
    Animated.parallel(indicators.map(item => {
      return timing(this.state[item], {toValue: width[item], duration: 3000, delay: 500})
    })).start()
  }

  render () {
   const {pts, ast, reb, stl, blk, tov, min} = this.state
    this.handeleAnimation();

   return (
      <View>
       {pts &&
          <Animated.View style={[styles.bar, {width: pts}]} />
        }
        {ast &&
          <Animated.View style={[styles.bar, {width: ast}]} />
        }
        {reb &&
          <Animated.View style={[styles.bar, {width: reb}]} />
        }
      </View>
   )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 6
  },
  // Item
  item: {
    flexDirection: 'column',
    marginBottom: 5,
    paddingHorizontal: 10
  },
  label: {
    color: '#CBCBCB',
    flex: 1,
    fontSize: 12,
    position: 'relative',
    top: 2
  },
  data: {
    flex: 2,
    flexDirection: 'row'
  },
  dataNumber: {
    color: '#CBCBCB',
    fontSize: 11
  },
  // Bar
  bar: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    height: 20,
    backgroundColor: '#FFFFFF',
    margin: 10
  },
  // controller
  controller: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15
  },
  button: {
    flex: 1,
    position: 'relative',
    top: -1
  },
  chevronLeft: {
    alignSelf: 'flex-end',
    height: 28,
    marginRight: 10,
    width: 28
  },
  chevronRight: {
    alignSelf: 'flex-start',
    height: 28,
    marginLeft: 10,
    width: 28
  },
  date: {
    color: '#6B7C96',
    flex: 1,
    fontSize: 22,
    fontWeight: '300',
    height: 28,
    textAlign: 'center'
  }

})

