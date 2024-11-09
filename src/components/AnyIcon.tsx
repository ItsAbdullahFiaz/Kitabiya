import React from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Feather from 'react-native-vector-icons/Feather';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Entypo from 'react-native-vector-icons/Entypo';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

import Octicons from 'react-native-vector-icons/Octicons';

import Foundation from 'react-native-vector-icons/Foundation';

import Fontisto from 'react-native-vector-icons/Fontisto';
import EvilIcons from 'react-native-vector-icons/Fontisto';

export const IconType = {
  MaterialCommunityIcons,

  MaterialIcons,

  Ionicons,

  Feather,

  FontAwesome,

  FontAwesome5,

  AntDesign,

  Entypo,

  SimpleLineIcons,

  Octicons,

  Foundation,

  Fontisto,
  EvilIcons,
};

interface AnyIconProps {
  type: any;
  name: string;
  color: string;
  size: number;
  style?: any;
}

export const AnyIcon = (props: AnyIconProps) => {
  const { type, name, color, size = 25, style } = props;
  const Tag = type;
  return (
    <>
      {type && name && (
        <Tag name={name} size={size} color={color} style={style} />
      )}
    </>
  );
};
