import React from 'react';
import Svg, { Path } from 'react-native-svg';

const MapPinSvg = ({ color, width = 20, height = 26 }) => (
  // <Svg 
  //   width={width} 
  //   height={height} 
  //   viewBox="0 0 384 512"
  //   style={{ overflow: 'visible' }}
  // >
  //   <Path
  //     fill={color}
  //     stroke="black"
  //     strokeWidth="40"
  //     d="M192 0C86 0 0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0C267 435 384 279.4 384 192C384 86 298 0 192 0z"
  //   />
  // </Svg>

  <Svg width={width} height={height}  viewBox="0 0 20 26" xmlns="http://www.w3.org/2000/svg">
    <Path d="M8.97222 25.4802C1.40444 14.779 0 13.6815 0 9.75009C0 4.36479 4.47667 0 10 0C15.5233 0 20 4.36479 20 9.75009C20 13.6815 18.5956 14.7768 11.0278 25.4759C10.9129 25.6373 10.7596 25.7692 10.5812 25.8605C10.4027 25.9517 10.2043 25.9996 10.0028 26C9.80132 26.0004 9.6027 25.9534 9.42384 25.8629C9.24499 25.7724 9.0912 25.6411 8.97556 25.4802L8.97333 25.4759L8.97222 25.4802Z" fill={color} stroke="black" strokeWidth="2"/>
</Svg>

);

export default MapPinSvg;
