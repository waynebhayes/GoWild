import React, { Component } from 'react';
import { Dimensions, View, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import { Container, Content, Header, Left, Right, Body, Text, Title, Button, Drawer} from 'native-base';
import { LineChart } from 'react-native-chart-kit'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Sidebar from '../sidebar/sidebar'
import Hamburger from '../hamburger/hamburger'
import Swiper from 'react-native-swiper'
import AppConfig from '../../../config.js'

const records1 = [{'month': 'June', 'step': 50000}, {'month': 'May', 'step': 30000},
                 {'month': 'April', 'step': 60000}, {'month': 'March', 'step': 50000}, 
                 {'month':'February', 'step': 65000}, {'month':'January', 'step': 73000}]

const records2 = [{'month': 'December', 'step': 45000}, {'month': 'November', 'step': 1040000},
                 {'month': 'October', 'step': 120000}, {'month': 'September', 'step': 50000}, 
                 {'month':'August', 'step': 95000}, {'month':'July', 'step': 66000}]

const styles = {
  h1: {
    fontSize: 40
  },
  bgstyle: {
    flex: 1,
    backgroundColor: AppConfig.Colors.Background
  },
  headerStyle: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0
  },
  barStack: {
    flex: 1,
    display:'flex',
    flexDirection: 'column',
  },
  iconContainer: {
    flex: 1,
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  listItem: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 10,
    width: '80%',
    padding: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    backgroundColor: AppConfig.Colors.Translucent,
    boxSizing: 'border-box',
    color: AppConfig.Colors.TextColorDark
  },
  recordWrap: {
    marginBottom: 20
  },
  wrapper: {
  },
  text: {
    color: AppConfig.Colors.TextColorLight,
    fontSize: 30,
    fontWeight: 'bold',
  },
  slide: {
    flex: 1
  }
};

class Monthly extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  }

  openDrawer = () => { 
    this.drawer._root.open() 
  }

  navigator = (target) => {
    Actions[target]();
  }

  constructor(props) {
    super(props);
    labels1 = [];
    data1 = [];
    for (var record of records1) {
      labels1.push(record['month']);
      data1.push(record['step']);
    }
    labels2 = [];
    data2 = [];
    for (var record of records2) {
      labels2.push(record['month']);
      data2.push(record['step']);
    }
    this.state = { 
      labels1: labels1,
      labels2: labels2,
      datasets1: [{
        data: data1
      }],
      datasets2: [{
        data: data2
      }],
      chartConfig: {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: AppConfig.Colors.Background,
        backgroundGradientTo: AppConfig.Colors.Background,
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16
        }
      }
    };
  }

  render() {
    const screenWidth = Dimensions.get('window').width
    return (
      <Container>
      <View style={styles.bgstyle}>
        <Drawer ref={(ref) => { this.drawer = ref}} content={<Sidebar navigator={this.navigator} />} onClose={() => this.closeDrawer()} > 
          <Header style={styles.headerStyle}>
            <Left>
               <TouchableOpacity onPress= {this.openDrawer}>
                <Hamburger/>
               </TouchableOpacity>
            </Left>
            <Body>
              <Title>Monthly Activity</Title>
            </Body>
            <Right />
          </Header>

        <Swiper style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide}>
          <LineChart
            data={{
              labels: this.state.labels1,
              datasets: this.state.datasets1
            }}
            width={screenWidth}
            height={220}
            chartConfig={this.state.chartConfig}
          />
          <ScrollView style={styles.recordWrap}>
            <FlatList
              data={records1}
              numColumns={1}
              renderItem={({item}) => {
                  return <View style={styles.listItem}>
                    <Text style={styles.rowText}>{item['month']}</Text>
                    <Text style={styles.rowText}>{item['step']}</Text>
                  </View>
                }
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
          </View>
          <View style={styles.slide}>
            <LineChart
            data={{
              labels: this.state.labels2,
              datasets: this.state.datasets2
            }}
            width={screenWidth}
            height={220}
            chartConfig={this.state.chartConfig}
          />
          <ScrollView style={styles.recordWrap}>
            <FlatList
              data={records2}
              numColumns={1}
              renderItem={({item}) => {
                  return <View style={styles.listItem}>
                    <Text style={styles.rowText}>{item['month']}</Text>
                    <Text style={styles.rowText}>{item['step']}</Text>
                  </View>
                }
              }
              keyExtractor={(item, index) => index.toString()}
            />
          </ScrollView>
          </View>
        </Swiper>


        </Drawer>
        </View>
      </Container>
    );
  }
}

export default Monthly
