import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useMemo} from 'react';
import {AppDataContext} from '../../../context';
import {useResponsiveDimensions} from '../../../hooks';

const Name = () => {
  const {hp, wp} = useResponsiveDimensions();
  const {appTheme} = useContext(AppDataContext);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        flex: 1,
        padding: 20,
      },
      inputContainer: {
        marginBottom: 15,
      },
      label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
      },
      inputContainerWithImage: {
        position: 'relative',
      },
      input: {
        height: hp(50),
        borderWidth: 0.5,
        borderColor: '#ca5a5a',
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingRight: hp(30),
      },
      savebuttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      savebutton: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttontext: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ca5a5a',
        padding: 10,
        borderRadius: 9,
        width: hp(294),
        height: hp(70),
      },
      text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
      },
      image: {
        position: 'absolute',
        right: 10, // Place image on the right side
        top: '50%', // Center the image vertically
        transform: [{translateY: -hp(10)}], // Adjust to fine-tune vertical alignment
        width: hp(20),
        height: hp(20),
      },
    });
  }, [hp, wp, appTheme]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Enter your name" />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry={true}
        />
      </View>
      <View>
        <Text style={styles.label}>Date of Birth</Text>
        <View style={styles.inputContainerWithImage}>
          <TextInput style={styles.input} placeholder="11/12/2024" />
          <Image
            style={styles.image}
            source={require('../../../assets/images/down.png')}
          />
        </View>
      </View>
      <View>
        <Text style={styles.label}>Country/Region</Text>
        <View style={styles.inputContainerWithImage}>
          <TextInput style={styles.input} placeholder="Pakistan" />
          <Image
            style={styles.image}
            source={require('../../../assets/images/down.png')}
          />
        </View>
      </View>
      <View style={styles.savebuttonContainer}>
        <View style={styles.savebutton}>
          <TouchableOpacity style={styles.buttontext}>
            <Text style={styles.text}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Name;
