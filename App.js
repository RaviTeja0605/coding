import React, {Component} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch(
      'http://api.weatherstack.com/current?access_key=b76678f2d31bb92ee521d0a35358ed6f&query=india',
    )
      .then(response => response.json())
      .then(json => {
        this.setState({data: json});
        console.log(json.request.query);
      })

      .catch(error => console.error(error))
      .finally(() => {
        this.setState({isLoading: false});
      });
  }

  render() {
    const {data, isLoading} = this.state;

    return (
      <View style={{flex: 1, padding: 24}}>
        {/* <Text>{this.state.data.request.query}</Text> */}
        {/* <Text>{data.request.location.current.temperature}</Text> */}
        {/* {isLoading ? (
          <ActivityIndicator
            size="large"
            color="yellow"
            animating={isLoading}
          />
        ) : ( */}
        <FlatList
          data={data}
          keyExtractor={({id}, index) => id}
          renderItem={({item, index}) => <Text>{item.request}</Text>}
        />
      </View>
    );
  }
}
