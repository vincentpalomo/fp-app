import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, Text } from 'react-native';

const MapPinSvg = ({ color, width = 20, height = 26, emoji }) => (
  <View style={{ 
    width: width, 
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible'
  }}>
    <Text style={{ 
      position: 'absolute', 
      zIndex: 1, 
      top: height * 0.2,
      fontSize: width * 0.6,
      textAlign: 'center'
    }}>
      {emoji}
    </Text>
    <Svg 
      width={width} 
      height={height} 
      viewBox="0 0 20 26" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <Path 
        d="M8.97222 25.4802C1.40444 14.779 0 13.6815 0 9.75009C0 4.36479 4.47667 0 10 0C15.5233 0 20 4.36479 20 9.75009C20 13.6815 18.5956 14.7768 11.0278 25.4759C10.9129 25.6373 10.7596 25.7692 10.5812 25.8605C10.4027 25.9517 10.2043 25.9996 10.0028 26C9.80132 26.0004 9.6027 25.9534 9.42384 25.8629C9.24499 25.7724 9.0912 25.6411 8.97556 25.4802L8.97333 25.4759L8.97222 25.4802Z" 
        fill={color} 
        stroke="black" 
        strokeWidth="2"
      />
    </Svg>
  </View>
);

export default MapPinSvg;
