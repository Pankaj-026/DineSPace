import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import DineSPaceHeader from '@/src/components/DineSPace-header';
import { Link } from 'expo-router';

const Verify_otp = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [timer, setTimer] = useState(120); // Timer in seconds (2 minutes)

  const inputRefs = useRef<Array<TextInput | null>>([]); // Correctly typed inputRefs

  // Animation effect for fade-in
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, []);

  // Timer countdown logic
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 0) {
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // Format timer into MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // OTP Input Change
  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
  
    if (value === '') {
      // Handle backspace: clear the current box and move focus to the previous input
      updatedOtp[index] = '';
      setOtp(updatedOtp);
      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (/^\d$/.test(value)) {
      // Accept only single numeric digits (0-9)
      updatedOtp[index] = value;
      setOtp(updatedOtp);
  
      // Move focus to the next input box
      if (index < otp.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  
    checkIfSignUpEnabled(updatedOtp);
  };
  

  // Handle backspace to move focus back
  const handleOtpKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Checkbox handler
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    checkIfSignUpEnabled(otp, !isChecked);
  };

  // Check if the button can be enabled
  const checkIfSignUpEnabled = (currentOtp = otp, checkbox = isChecked) => {
    const isOtpFilled = currentOtp.every((digit) => digit !== '');
    setIsButtonEnabled(isOtpFilled && checkbox);
  };

  return (
    <View style={styles.container}>
      <DineSPaceHeader route={'/(auth)/startPage'}/>

      <Text style={styles.title}>One Time Password</Text>
      <Text style={styles.infoText}>
        You will get a <Text style={styles.bold}>One Time Password</Text> regarding registration
        on your provided medium.
      </Text>

      {/* OTP Input Fields */}
      <Animated.View style={[styles.otpContainer, { opacity: fadeAnim }]}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleOtpChange(value, index)}
            onKeyPress={(e) => handleOtpKeyPress(e, index)}
          />
        ))}
      </Animated.View>

      {/* Timer */}
      <Text style={styles.resendText}>
        Resend One Time Password in{' '}
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
      </Text>

      {/* Terms and Conditions */}
      <View style={styles.termsContainer}>
        <TouchableOpacity style={styles.checkbox} onPress={toggleCheckbox}>
          {isChecked && <View style={styles.checkedBox} />}
        </TouchableOpacity>
        <Text style={styles.termsText}>
          I agree to <Text style={styles.bold}>Terms & Conditions</Text> and{' '}
          <Text style={styles.italic}>privacy Policy</Text>
        </Text>
      </View>


      {/* Benefits of Registration */}
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Benefits of Registration</Text>
        <Text style={styles.benefitItem}>
          ➤ You will get <Text style={styles.bold}>points on each booking</Text> and can use those
          points to get <Text style={styles.bold}>great discounts</Text>.
        </Text>
        <Text style={styles.benefitItem}>
          ➤ You will get amazing <Text style={styles.bold}>discounts</Text> and{' '}
          <Text style={styles.bold}>offers</Text>.
        </Text>
      </View>

      {/* Sign-Up Button */}
      <TouchableOpacity
        style={[styles.button, !isButtonEnabled && styles.buttonDisabled]}
        disabled={!isButtonEnabled}
      >
        <Link href={"/(main)/(tabs)"}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Link>
      </TouchableOpacity>

      {/* Sign In */}
      <Text style={styles.signInText}>
        Already a user? <Text style={styles.signInLink}> <Link href={"/(auth)/login"}>Login</Link></Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 5,
    color: '#333',
  },
  resendText: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  timerText: {
    color: '#F49B33',
    fontWeight: 'bold',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#666',
    marginRight: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    width: 12,
    height: 12,
    backgroundColor: '#F49B33',
  },
  termsText: { color: '#666', fontSize: 12 },
  benefitsContainer: {
    marginBottom: 30,
  },
  benefitsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  benefitItem: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#F49B33',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signInText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  signInLink: {
    color: '#F49B33',
    fontWeight: 'bold',
  },
  horizontal_line: {
    flex: 1,
    height: "100%",
    backgroundColor: '#F49B33',
  },
});

export default Verify_otp;
