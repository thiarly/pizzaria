import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import SignIn from './src/pages/SignIn';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1d1d2e" barStyle="light-content" translucent={false} />
      <SignIn />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e', // Ajuste conforme necessário
  },
});
