import React from 'react';
import {StyleSheet} from 'react-native';
import {MotiView} from 'moti';

export const SkeletonLoader = ({width, height, borderRadius = 4}: any) => {
  return (
    <MotiView
      from={{opacity: 0.3}}
      animate={{opacity: 1}}
      transition={{
        type: 'timing',
        duration: 800,
        loop: true,
      }}
      style={[styles.skeleton, {width, height, borderRadius}]}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
});
