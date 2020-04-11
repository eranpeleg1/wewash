import React from 'react';
import BookingView from '../components/BookingView';
import FollowUpScreen from "./FollowUpScreen";

export default function BookingScreen() {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  return <BookingView />;
}

BookingScreen.navigationOptions = {
    header: null
};
