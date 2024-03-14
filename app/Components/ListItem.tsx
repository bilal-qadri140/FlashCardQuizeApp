import { StyleSheet, Text, TouchableHighlight} from 'react-native'
import React from 'react'
import Swipeable from 'react-native-gesture-handler/Swipeable';

type ListItemProps = {
    item: {
        id: string
        title: string
    },
    onPress: () => void
    renderRightActions?: () => React.ReactNode
    renderLeftActions?: () => React.ReactNode
    visible: boolean
    modalVisible:boolean
}

const ListItem = ({ item, onPress, renderLeftActions, renderRightActions, visible,modalVisible }: ListItemProps) => {

    return (
        <Swipeable
            friction={1}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}
            containerStyle={styles.container}
            key={item.title}
        >
            <TouchableHighlight underlayColor={'#f8f4f4'} activeOpacity={0.5}
                onPress={onPress}
                disabled={visible}
                style={[styles.touchable, modalVisible ? { backgroundColor: '#666' } : {}]}
                key={item.title}
            >
                <Text key={item.title} style={styles.listText}>{item.title}</Text>
            </TouchableHighlight>
        </Swipeable>
    )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
    },
    touchable: {
        justifyContent: 'center',
        backgroundColor: '#fff',
        height: '100%',
        paddingHorizontal:10
    },
    listText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 10,
        textTransform: 'capitalize'
    },
})