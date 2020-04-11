import Constants from 'expo-constants';
import React from 'react';
import { SectionList, Image, StyleSheet, Text, View } from 'react-native';

export default class BookingView extends React.Component {
    render() {
        const sections = [
            { data: [{ value: '₪ 50' }], title: 'IN - בפנים' },
            { data: [{ value: '₪ 50' }], title: 'OUT - בחוץ' },
            { data: [{ value: '₪ 75' }], title: 'IN&OUT - בפנים ובחוץ רגיל' },
            { data: [{ value: '₪ 85' }], title: 'IN&OUT - בפנים ובחוץ ג׳יפ/ג׳יפון' },
            { data: [{ value: '₪ 100' }], title: 'VIP - IN&OUT + וקס נוזלי + סיליקון גלגלים' }
        ];

        return (
            <SectionList
                style={styles.container}
                renderItem={this._renderItem}
                renderSectionHeader={this._renderSectionHeader}
                stickySectionHeadersEnabled={true}
                keyExtractor={(item, index) => index}
                ListHeaderComponent={ListHeader}
                sections={sections}
            />
        );
    }

    _renderSectionHeader = ({ section }) => {
        return <SectionHeader title={section.title} />;
    };

    _renderItem = ({ item }) => {
        return (
            <SectionContent>
                <Text style={styles.sectionContentText}>{item.value}</Text>
            </SectionContent>
        );
    };
}

const ListHeader = () => {

    return (
        <View style={styles.titleContainer}>
            <View style={styles.titleIconContainer}>
                <AppIconPreview iconUrl='./assets/images/splash.png' />
            </View>
            <View style={styles.titleTextContainer}>
                <Text style={styles.nameText}>שטיפות
                </Text>
            </View>
        </View>
    );
};

const SectionHeader = ({ title }) => {
    return (
        <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
        </View>
    );
};

const SectionContent = props => {
    return <View style={styles.sectionContentContainer}>{props.children}</View>;
};

const AppIconPreview = () => {
    return <Image source={require('../assets/images/splash.png')} style={{ width: 100, height: 64 }} resizeMode="cover" />;
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: Constants.statusBarHeight,
    },
    titleContainer: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    titleIconContainer: {
        marginRight: 15,
        paddingTop: 2,
        flexDirection: 'row-reverse',
    },
    sectionHeaderContainer: {
        backgroundColor: '#fbfbfb',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ededed',
        flexDirection: 'row'
    },
    sectionHeaderText: {
        fontSize: 14,
    },
    sectionContentContainer: {
        paddingTop: 8,
        paddingBottom: 12,
        paddingHorizontal: 15,
        flexDirection: 'row'
    },
    sectionContentText: {
        color: '#808080',
        fontSize: 14,
    },
    titleTextContainer: {
        flexDirection: 'row'
    },
    nameText: {
        fontWeight: '600',
        fontSize: 18,
    }
});
