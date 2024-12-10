import { createSlice } from '@reduxjs/toolkit';
import { StyleSheet } from 'react-native';

const lightTheme = { background: '#F9FAFB',
    backgroundSecondary: '#FFFFFF',
    textPrimary: '#111827',
    textSecondary: '#6B7280',
    primary: '#2563EB',
    secondary: '#F97316',
    success: '#10B981',
    error: '#EF4444',
    shadow: 'rgba(0, 0, 0, 0.1)',
    tabs: {
      background: '#FFFFFF', 
      activeTab: '#2563EB',  
      inactiveTab: '#6B7280',
      border: '#E5E7EB',
  }};

const darkTheme = { background: '#1F2937',
    backgroundSecondary: '#111827',
    textPrimary: '#F9FAFB',
    textSecondary: '#9CA3AF',
    primary: '#3B82F6',
    secondary: '#F59E0B',
    success: '#34D399',
    error: '#F87171',
    shadow: 'rgba(0, 0, 0, 0.4)',
    tabs: {
      background: '#111827',
      activeTab: '#3B82F6', 
      inactiveTab: '#9CA3AF', 
      border: '#374151',
  }};

const generateStyles = (theme) => {
    return StyleSheet.create({
        success: {
          color:'#34D399'
        },
        error: {
          color: '#F87171'
        },
        container: {
          flex: 1,
          backgroundColor: theme.background,
          padding: 10,
        },
        textPrimary: {
          color: theme.textPrimary,
          fontSize: 16,
        },
        textSecondary: {
          color: theme.textSecondary,
          fontSize: 14,
        },
        button: {
          backgroundColor: theme.primary,
          padding: 10,
          borderRadius: 8,
          alignItems: 'center',
          marginVertical: 10,
        },
        buttonText: {
          color: theme.backgroundSecondary,
          fontWeight: 'bold',
        },
        card: {
          backgroundColor: theme.backgroundSecondary,
          shadowColor: theme.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          padding: 15,
          borderRadius: 10,
          marginBottom: 10,
        },
        tabs: {
          background: theme.tabs.background,
          activeTab: theme.tabs.activeTab, 
          inactiveTab: theme.tabs.inactiveTab, 
          border: theme.tabs.border
        }
      });
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: 'light',
    styles: generateStyles(lightTheme),
  },
  reducers: {
    toggleTheme: (state) => {
      if (state.mode === 'light') {
        state.mode = 'dark';
        state.styles = generateStyles(darkTheme);
      } else {
        state.mode = 'light';
        state.styles = generateStyles(lightTheme);
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;