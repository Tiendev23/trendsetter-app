import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomDirectionButton from '../ChevronButton';
import { Props } from '../../screens/stacks/Profile';

const Backnav = ({ navigation, route }: Props) => {
  const  title  = route?.params?.title;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <CustomDirectionButton direction="back" onPress={() => navigation.goBack()} />
        <View style={styles.titleWrapper}>
          {title ? <Text style={styles.titleText}>{title}</Text> : null}
        </View>
        <View style={{ width: 32 }} />
      </View>
    </View>
  );
};

export default Backnav;
const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#fff',
    paddingVertical: 22,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '600',
    fontStyle: 'italic',
    fontSize: 20,
    color: '#006340',
    textAlign: 'center',
  },
});
