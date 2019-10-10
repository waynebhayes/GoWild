import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'native-base';

import AppConfig from '../../../config.js'

const styles = {
	window: {
		backgroundColor: AppConfig.Colors.Background,
		width: '70%',
		height: '50%',
		marginLeft: 'auto',
		marginRight: 'auto',
		flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
	}
}

class Window extends Component {

    render() {
        return (
            <View style={styles.window}>
                <Text>Successful!</Text>
                <Button block onPress={this.props.onclick}><Text>OK</Text></Button>
            </View>
        );
    }
};

export default Window
