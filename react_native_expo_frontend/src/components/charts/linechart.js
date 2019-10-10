import React, { Component } from 'react';
import { Dimensions } from 'react-native'
import { Container, Content, Header, Left, Right, Body, Text, Title, Button} from 'native-base';
import { LineChart } from 'react-native-chart-kit'
import { connect } from 'react-redux'


class Linechart extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			labels: ['January', 'February', 'March', 'April', 'May', 'June'],
			datasets: [{
				data: [
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100
				]
			}],
			chartConfig: {
				backgroundColor: '#e26a00',
				backgroundGradientFrom: '#fb8c00',
				backgroundGradientTo: '#ffa726',
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
				<Header>
					<Left />
					<Body>
						<Title>Line Chart</Title>
					</Body>
					<Right />
				</Header>
				<Content>
					<Text>Line chart example</Text>
					<LineChart
						data={{
							labels: this.state.labels,
							datasets: this.state.datasets
						}}
						width={screenWidth}
						height={220}
						chartConfig={this.state.chartConfig}
					/>
				</Content>
			</Container>
		);
	}
}

export default Linechart;