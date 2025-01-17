import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { MotiView } from 'moti';

const SkeletonLoading = ({ children, style }) => {
  return (
    <MotiView
      from={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      transition={{ loop: true, duration: 1000, type: 'timing' }}
      style={style}
    >
      <SkeletonPlaceholder>
        <View style={style}>
          {children}
        </View>
      </SkeletonPlaceholder>
    </MotiView>
  );
};

export default SkeletonLoading;
