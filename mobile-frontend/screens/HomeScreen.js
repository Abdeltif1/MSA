import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';
import { Moon, Sun, Cloud, Sunrise, Coffee, Sunset, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const PrayerIcon = ({ name, size = 24, color = '#FFFFFF' }) => {
  const icons = {
    Fajr: <Sunrise size={size} color={color} />,
    Sunrise: <Sun size={size} color={color} />,
    Dhuhr: <Sun size={size} color={color} />,
    Asr: <Cloud size={size} color={color} />,
    Maghrib: <Sunset size={size} color={color} />,
    Isha: <Star size={size} color={color} />,
  };
  return icons[name] || <Sun size={size} color={color} />;
};

export const HomeScreen = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextPrayer, setNextPrayer] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const prayerTimes = {
    Fajr: new Date(currentTime.setHours(5, 30, 0, 0)),
    Sunrise: new Date(currentTime.setHours(6, 45, 0, 0)),
    Dhuhr: new Date(currentTime.setHours(12, 30, 0, 0)),
    Asr: new Date(currentTime.setHours(15, 45, 0, 0)),
    Maghrib: new Date(currentTime.setHours(18, 15, 0, 0)),
    Isha: new Date(currentTime.setHours(19, 45, 0, 0)),
  };

  const getBackgroundColors = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18
      ? ['#87CEEB', '#E0F7FA'] // Light blue to very light cyan for day
      : ['#191970', '#4B0082']; // Midnight blue to indigo for night
  };

  const isDaytime = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const now = new Date();
    const next = Object.entries(prayerTimes).find(([_, time]) => time > now);
    setNextPrayer(next ? next[0] : 'Fajr');
  }, [currentTime]);

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getIqamaTime = (prayerTime) => {
    if (!prayerTime) return '';
    const iqamaTime = new Date(prayerTime.getTime() + 5 * 60000);
    return formatTime(iqamaTime);
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <LinearGradient colors={getBackgroundColors()} style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.currentTime}>{formatTime(currentTime)}</Text>
        </View>
        <View style={styles.nextPrayerContainer}>
          <Text style={styles.nextPrayerLabel}>Next Prayer</Text>
          <View style={styles.nextPrayerInfo}>
            <PrayerIcon name={nextPrayer} size={36} color="#FFFFFF" />
            <View style={styles.nextPrayerTextContainer}>
              <Text style={styles.nextPrayerName}>{nextPrayer}</Text>
              <Text style={styles.nextPrayerTime}>
                {formatTime(prayerTimes[nextPrayer])}
              </Text>
            </View>
          </View>
          <View style={styles.iqamaContainer}>
            <Text style={styles.iqamaLabel}>Iqama:</Text>
            <Text style={styles.iqamaTime}>{getIqamaTime(prayerTimes[nextPrayer])}</Text>
          </View>
        </View>
        <ScrollView style={styles.prayerList}>
          {Object.entries(prayerTimes).map(([name, time]) => (
            <View key={name} style={styles.prayerItem}>
              <View style={styles.prayerItemContent}>
                <PrayerIcon name={name} size={24} color="#FFFFFF" />
                <View style={styles.prayerInfo}>
                  <Text style={styles.prayerName}>{name}</Text>
                  <Text style={styles.prayerTime}>{formatTime(time)}</Text>
                </View>
                <View style={styles.prayerIqamaContainer}>
                  <Text style={styles.prayerIqamaLabel}>Iqama:</Text>
                  <Text style={styles.prayerIqamaTime}>{getIqamaTime(time)}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.View>
    </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  currentTime: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  nextPrayerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
  },
  nextPrayerLabel: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  nextPrayerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  nextPrayerTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  nextPrayerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nextPrayerTime: {
    fontSize: 22,
    color: '#E0F7FA',
  },
  iqamaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 10,
    padding: 10,
  },
  iqamaLabel: {
    fontSize: 16,
    color: '#FFD700',
    marginRight: 5,
  },
  iqamaTime: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  prayerList: {
    flex: 1,
  },
  prayerItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  prayerItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  prayerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  prayerTime: {
    fontSize: 16,
    color: '#E0F7FA',
  },
  prayerIqamaContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  prayerIqamaLabel: {
    fontSize: 14,
    color: '#FFD700',
  },
  prayerIqamaTime: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
