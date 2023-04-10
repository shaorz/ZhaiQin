import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';

const Home = () => {
  const [photos, setPhotos] = useState([]);

  const selectPhotos = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedPhotos = response.assets.map((asset) => ({
          uri: asset.uri,
          width: asset.width,
          height: asset.height,
        }));
        setPhotos(selectedPhotos);
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <FastImage
        source={{ uri: item.uri }}
        style={{ width: item.width, height: item.height }}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text onPress={selectPhotos}>Select Photos</Text>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.uri}
        renderItem={renderItem}
