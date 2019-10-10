import { SecureStore } from 'expo';
import React, { Component } from 'react';
import moment from "moment";
import { Container, Content, Header, Body, Text, Button, Drawer, Item, Label } from 'native-base';
import { Dimensions, View, Picker } from 'react-native'
import { Actions } from 'react-native-router-flux';
import { LineChart } from 'react-native-chart-kit'
import DatePicker from 'react-native-datepicker'
import { getAnimalMove } from '../../actions/moveActions'
import Sidebar from '../sidebar/sidebar'
import { connect } from 'react-redux'
import store from '../../store/store'
import AppConfig from '../../../config.js'

const screenWidth = Dimensions.get('window').width
const styles = {
  bgstyle: {
    flex: 1,
    backgroundColor: AppConfig.Colors.Background
  },
  contentStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 40, 
    paddingHorizontal: 10
  },
  buttonStyle: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppConfig.Colors.ButtonColor, 
    marginBottom: 20
  },
  datePicker: {
    borderColor: AppConfig.Colors.Translucent,
    width: '100%',
    color: AppConfig.Colors.TextColorDark,
    marginBottom: 15
  },
  datePickerInput: {
    borderWidth: 2, 
    borderColor: AppConfig.Colors.Translucent
  },
  selector: {
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderColor: AppConfig.Colors.Translucent,
    marginBottom: 10,
  },
  formContainer: {
    padding: 10
  }
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: AppConfig.Colors.Background,
  backgroundGradientTo: AppConfig.Colors.Background,
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16
  }
}

class VariedChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startdate: '2019-01-01',
      enddate: moment().format("YYYY-MM-DD"),
      period: 'Hour',
      labels: [],
      datas: [{
        data: []
      }]
    };
  }

  closeDrawer = () => {
    this.drawer._root.close()
  }

  openDrawer = () => { 
    this.drawer._root.open() 
  }

  handleStartDate = (val) => {
    this.setState({ startdate: val })
  }

  handleEndDate = (val) => {
    this.setState({ enddate: val })
  }

  submit = () => {
    this.props.onSubmitClick(this.state.startdate, this.state.enddate, this.state.period)
  }

  componentDidMount() {

  }

  setData(source) {
    let labels = [];
    let datas = [];
    var index = 0;
    for (var record of source.data) {
      time = moment(record['time']).format("YYYY-MM-DD HH:MM")
      if (index == 0 || index == source.data.length-1 || index == Math.floor(source.data.length/2)){
        labels.push(time);
      }
      else {
        labels.push("");
      }
      index++;
      datas.push(record['steps']);
    }

    this.setState({ labels: labels })
    this.setState({ datas: [{
        data: datas
      }]
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.animalMovement != this.props.animalMovement) {
      this.setData(this.props.animalMovement)
    }
  }

  renderChart(screenWidth) {
    if (this.props.loading) {
      return <Text>Loading</Text>
    }
    if (this.state.labels.length == 0) {
      return <Text>No Chart</Text>
    }
    return <LineChart
              data={{
                labels: this.state.labels,
                datasets: this.state.datas
              }}
              style={{overflow: 'visible'}}
              width={screenWidth}
              height={300}
              fromZero={true}
              chartConfig={chartConfig}
            />
  }


  render() {
    
    return (
      <Container>
        <View style={styles.bgstyle}>
        <Drawer ref={(ref) => { this.drawer = ref}} content={<Sidebar navigator={this.navigator} />} onClose={() => this.closeDrawer()} > 
         <Content>
          <View style={styles.formContainer}>
            <DatePicker
              style={styles.datePicker}
              customStyles={{dateInput: {borderWidth: 2, borderColor: AppConfig.Colors.Translucent}}}
              date={this.state.startdate}
              mode="date"
              placeholder="select start date"
              format="YYYY-MM-DD"
              minDate="2019-01-01"
              maxDate={moment().format("YYYY-MM-DD")}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={this.handleStartDate}
            />
            <DatePicker
              style={styles.datePicker}
              customStyles={{dateInput:{borderWidth: 2, borderColor: AppConfig.Colors.Translucent}}}
              date={this.state.enddate}
              mode="date"
              placeholder="select end date"
              format="YYYY-MM-DD"
              minDate={this.state.startdate}
              maxDate={moment().format("YYYY-MM-DD")}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              onDateChange={this.handleEndDate}
            />

            <View style={styles.selector}> 
            <Picker
              selectedValue={this.state.period}
              style={styles.selectText}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ period: itemValue })
              }>
              <Picker.Item label="Hour" value="Hour" />
              <Picker.Item label="Day" value="Day" />
              <Picker.Item label="Week" value="Week" />
            </Picker>
            </View>
            <Button dark onPress= {this.submit} style= {styles.buttonStyle}>
              <Text>Submit</Text>
            </Button>
          </View>
            { this.renderChart(screenWidth) }
          </Content>
        </Drawer>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    loading: state.animalMovementReducer.loading,
    animalMovement : state.animalMovementReducer.animalMovement
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    onSubmitClick: (startdate, enddate, period) =>{
      dispatch(getAnimalMove(startdate, enddate, period))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VariedChart)
