import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Calendar, Clock, CheckCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Event = () => {
  // Example event data
  const { title, description, date, time } = {
    title: "BBQ Event - Start of School",
    description: "Join us for a day full of grilling and food, eat as much as you can and have fun!",
    date: "August 31, 2024",
    time: "10:00 AM - 4:00 PM",
  };

  const buttonScale = new Animated.Value(1);

  const handleRegister = () => {
    //after setting up the backend & Firebase
  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeRow}>
            <Calendar style={styles.icon} color="#4B5563" size={20} />
            <Text style={styles.dateTimeText}>{date}</Text>
          </View>
          <View style={styles.dateTimeRow}>
            <Clock style={styles.icon} color="#4B5563" size={20} />
            <Text style={styles.dateTimeText}>{time}</Text>
          </View>
        </View>
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <CheckCircle style={styles.icon} color="#FFFFFF" size={20} />
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
    lineHeight: 24,
    textAlign: 'center',
  },
  dateTimeContainer: {
    marginBottom: 32,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 12,
  },
  icon: {
    marginRight: 12,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  registerButton: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default Event;