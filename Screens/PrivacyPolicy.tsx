import { ScrollView, StyleSheet, Text } from 'react-native'
import React from 'react'

const PrivacyPolicy = () => {
    const privacyPolicy = `
This Privacy Policy describes how your Gmail address, Gmail photo, and name (collectively referred to as "Gmail-related information") are collected, used, and shared when you use the FlashcardQuiz mobile application (the "App").

-> Personal Information We Collect

When you use the App and choose to log in using your Gmail account, we may collect the following Gmail-related information:

- Gmail Address: We collect your Gmail address to uniquely identify you within the App.

- Gmail Photo: We collect your Gmail photo to personalize your experience within the App.

- Name: We collect your name associated with your Gmail account to address you within the App.

-> How We Use Your Personal Information

We use the Gmail-related information we collect to:

- Provide personalized features within the App;
- Display your Gmail photo and name within the App;
- Communicate with you about the App.

-> Sharing Your Personal Information

We do not share your Gmail-related information with third parties except as described below:

- With your explicit consent: We may share your Gmail-related information with third parties if you explicitly consent to such sharing.

- Legal Compliance: We may share your Gmail-related information to comply with applicable laws and regulations, to respond to a subpoena, search warrant, or other lawful requests for information we receive, or to otherwise protect our rights.

-> Data Retention

We will retain your Gmail-related information for as long as necessary to fulfill the purposes outlined in this Privacy Policy unless a longer retention period is required or permitted by law.

-> Your Rights

If you have logged in using your Gmail account, you may have certain rights regarding your Gmail-related information. Please contact us using the contact information provided below to exercise your rights.

-> Changes to This Privacy Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page.

-> Contact Us

If you have any questions or concerns about this Privacy Policy, please contact us at (bilalattari1409l@gmail.com)
`;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Pravacy Policy for Quiz App</Text>
      <Text style={styles.text}>{privacyPolicy}</Text>
    </ScrollView>
  )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:10,

    },
    heading:{
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center',
        marginVertical:10,
        color:'#000'
    },
    text:{
        fontSize:16,
        fontWeight:'bold',
        color:'#666'
    }
})