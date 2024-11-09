import { Dimensions } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import {
  widthPercentageToDP as wp2dp,
  heightPercentageToDP as hp2dp,
} from 'react-native-responsive-screen';

const WIDTH_IN_FIGMA_DESIGN = 414;
const HEIGHT_IN_FIGMA_DESIGN = 896;

export const useResponsiveDimensions = () => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('window').width
  );
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get('window').height
  );

  const updateDimensions = useCallback(() => {
    setScreenWidth(Dimensions.get('window').width);
    setScreenHeight(Dimensions.get('window').height);
  }, []);

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      updateDimensions
    );
    return () => {
      if (subscription?.remove) {
        subscription.remove();
      } else {
        Dimensions.removeEventListener('change', updateDimensions);
      }
    };
  }, [updateDimensions]);

  const wp = useCallback(
    (dimension: number) => {
      return wp2dp((dimension / WIDTH_IN_FIGMA_DESIGN) * 100 + '%');
    },
    [screenWidth]
  );

  const hp = useCallback(
    (dimension: number) => {
      return hp2dp((dimension / HEIGHT_IN_FIGMA_DESIGN) * 100 + '%');
    },
    [screenHeight]
  );

  return { wp, hp };
};

