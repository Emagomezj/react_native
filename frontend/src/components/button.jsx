import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Button = ({ title, onPress }) => {
  const styles = useSelector(state => state.themeReducer.styles);

  return (
    <Pressable
      style={[styles.button, { backgroundColor: styles.button.backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default Button;
