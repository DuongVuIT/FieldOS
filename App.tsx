import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {screenName} from '@/constants/screenName';

const App = (): React.JSX.Element => (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <Text style={styles.title}>{screenName.title}</Text>
      <Text style={styles.subtitle}>{screenName.subtitle}</Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  safeArea: {flex: 1},
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  title: {fontSize: 32, fontWeight: '700'},
  subtitle: {fontSize: 18, marginTop: 8},
});

export default App;
