import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Calendar, Clock, MapPin, Users, List, Grid } from 'lucide-react-native';

// Mock data for events
const eventsData = {
  '2024-08-20': [{ id: '1', title: 'Friday Prayers', time: '13:00', location: 'Masjid Al-Noor', attendees: 100 }],
  '2024-08-22': [{ id: '2', title: 'Quran Study Group', time: '17:00', location: 'Community Center', attendees: 20 }],
  '2024-08-24': [{ id: '3', title: 'Islamic Lecture', time: '19:00', location: 'Masjid Al-Hikmah', attendees: 50 }],
  '2024-08-27': [{ id: '4', title: 'Eid Celebration Planning', time: '10:00', location: 'Masjid Al-Istiqamah', attendees: 30 }],
  '2024-08-29': [{ id: '5', title: 'Charity Drive', time: '16:00', location: 'Community Hall', attendees: 60 }],
};

// EventItem component
const EventItem = ({ event }) => (
  <TouchableOpacity style={styles.eventItem}>
    <View style={styles.eventHeader}>
      <Text style={styles.eventTitle}>{event.title}</Text>
      {/* <View style={styles.eventBadge}>
        <Users size={14} color="#ffffff" />
        <Text style={styles.eventBadgeText}>{event.attendees}</Text>
      </View> */}
    </View>
    <View style={styles.eventDetails}>
      <View style={styles.eventDetail}>
        <Clock size={16} color="#6B7280" />
        <Text style={styles.eventDetailText}>{event.time}</Text>
      </View>
      <View style={styles.eventDetail}>
        <MapPin size={16} color="#6B7280" />
        <Text style={styles.eventDetailText}>{event.location}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

// DateHeader component
const DateHeader = ({ date }) => (
  <View style={styles.dateHeader}>
    <Calendar size={20} color="#4F46E5" />
    <Text style={styles.dateHeaderText}>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</Text>
  </View>
);

export const MyEventsScreen = () => {
  const [viewMode, setViewMode] = useState('calendar');
  const [selectedDate, setSelectedDate] = useState(Object.keys(eventsData)[0]);
  const [groupedEvents, setGroupedEvents] = useState({});

  useEffect(() => {
    setGroupedEvents(eventsData);
  }, []);

  const renderAgendaItem = (item) => (
    <View style={styles.agendaItemContainer}>
      <EventItem event={item} />
    </View>
  );

  const renderListItem = ({ item }) => (
    <View>
      <DateHeader date={item.date} />
      {item.events.map(event => <EventItem key={event.id} event={event} />)}
    </View>
  );

  const listData = Object.entries(groupedEvents).map(([date, events]) => ({ date, events }));

  const ToggleButton = ({ icon, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.toggleButton, isActive && styles.toggleButtonActive]}
      onPress={onPress}
    >
      {icon}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Upcoming Events</Text>
        <View style={styles.toggleContainer}>
          <ToggleButton
            icon={<Grid size={24} color={viewMode === 'calendar' ? '#4F46E5' : '#9CA3AF'} />}
            isActive={viewMode === 'calendar'}
            onPress={() => setViewMode('calendar')}
          />
          <ToggleButton
            icon={<List size={24} color={viewMode === 'list' ? '#4F46E5' : '#9CA3AF'} />}
            isActive={viewMode === 'list'}
            onPress={() => setViewMode('list')}
          />
        </View>
      </View>
      {viewMode === 'calendar' ? (
        <Agenda
          items={eventsData}
          renderItem={renderAgendaItem}
          selected={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          theme={{
            agendaDayTextColor: '#4F46E5',
            agendaDayNumColor: '#4F46E5',
            agendaTodayColor: '#4F46E5',
            agendaKnobColor: '#4F46E5',
            backgroundColor: '#F3F4F6',
            calendarBackground: '#ffffff',
            dayTextColor: '#1F2937',
            textSectionTitleColor: '#4B5563',
            monthTextColor: '#1F2937',
            selectedDayBackgroundColor: '#4F46E5',
            selectedDayTextColor: '#ffffff',
          }}
          renderEmptyDate={() => (
            <View style={styles.emptyDate}>
              <Text style={styles.emptyDateText}>No events scheduled for this day.</Text>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={listData}
          renderItem={renderListItem}
          keyExtractor={item => item.date}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    padding: 8,
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#E5E7EB',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
  },
  dateHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4F46E5',
    marginLeft: 8,
  },
  eventItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  eventBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  eventBadgeText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventDetailText: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 6,
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginRight: 16,
    marginTop: 16,
  },
  emptyDateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  agendaItemContainer: {
    marginTop: 32, // Add space above each agenda item
    marginBottom: 12, // Maintain some space below each item
  },
});
