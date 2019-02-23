import React, { Component } from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { bindActionCreators } from 'redux';
import AppView from './AppView';
import AppText from './AppText';
import AppIcon from './AppIcon';
import AppInput from './AppInput';
import Colors from '../utils/Colors';
import { responsiveWidth, responsiveHeight, moderateScale } from '../utils/Responsive';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
import I18n from "react-native-i18n";

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;


class AppHeader extends Component {
    static propTypes = {
        showBurger: PropTypes.bool,
        showBack: PropTypes.bool,
    };

    static defaultProps = {
        showBurger: false,
        showBack: true,
    };
    state = {
        lastSearchVisiable:false
    }
    renderLastSearch = () =>{
        return(
            <AppView
                style = {{
                    alignSelf:"stretch",
                    position:"absolute",
                    // bottom:150,
                    backgroundColor: "red",
                    width:200,
                    height:200
                }}
            >
                <AppText>ss</AppText>
            </AppView>
        )
    }
    renderSearchBar = () => {
        return (
            <AppView
                style={styles.searchBarContainer}
            >
                <AppInput
                    returnKeyType="done"
                    name="search"
                    value=""
                    //send request search
                    // onChangeText={() => alert("change")}
                    // onBlur={setFieldTouched}
                    placeholder={I18n.t('search-about')}
                    placeholderTextColor="grey"
                    // containerStyle={styles.borderInput}
                    // outerContainerStyle={styles.fieldStyle}
                    // errors={errors}
                    // touched={touched}
                    leftIcon={<AppIcon type="Ionicons" name="md-search" style={{color:"grey"}}/>}
                    onSubmitEditing={() => {
                        //   this.emailField.getWrappedInstance().focus();
                    }}
                    onFocus={()=>{
                        this.setState({
                            lastSearchVisiable : true
                        })
                    }}
                />   
         </AppView>
        )
    }



    renderLeft = () => (
        <AppView row style={{ marginHorizontal: 15 }}>
            {this.props.hideCart ? null : (
                <TouchableOpacity
                    onPress={() => {
                    }}
                >
                    <AppIcon
                        name="md-cart"
                        type="Ionicons"
                        style={{ color: "#fff" }}
                        size={12}
                    />
                </TouchableOpacity>
            )}

        </AppView>
    );

    renderCenter = () => (
        <AppView style={styles.centerContainer}>
            <AppText size={9} numberOfLines={1} style={styles.text}>
                {this.props.title}
            </AppText>
        </AppView>
    );

    renderRight = () => {
        const { navigator, modal, backAction, rtl } = this.props;
        return (
            <AppView row width={14} style={{ justifyContent: "center" }}>
                {this.props.showBurger ? (
                    <TouchableOpacity
                        onPress={() =>
                            navigator.toggleDrawer({
                                side: this.props.rtl ? 'right' : 'left',
                            })
                        }
                    >
                        <AppIcon name="md-menu" type="Ionicons" size={12} style={{ color: "#fff" }} />
                    </TouchableOpacity>
                ) : this.props.showBack ? (
                    <TouchableOpacity
                        onPress={() => {
                            if (backAction) {
                                backAction();
                                return;
                            }
                            if (modal) {
                                Navigation.dismissModal();
                            } else {
                                navigator.pop({
                                    animated: true,
                                });
                            }
                        }}
                    >
                        <AppIcon
                            name="arrow-forward"
                            type="MaterialIcons"
                            style={{ color: "#fff" }}
                            size={12}
                        // flip
                        />
                    </TouchableOpacity>
                ) : null}
            </AppView>
        )
    };

    render() {

        const { title, showBurger, showBack, showCart, flat, navigator, rtl,showSearch } = this.props;
        return (
            <AppView style={[
                styles.container,
                {
                    height: showSearch ?
                                STATUSBAR_HEIGHT + APPBAR_HEIGHT+responsiveHeight(12) 
                            :   STATUSBAR_HEIGHT + APPBAR_HEIGHT,
                }
                ]}
            >
                <AppView
                    style={{}}
                    row
                >
                    {this.renderRight()}
                    {this.renderCenter()}
                    {this.renderLeft(navigator)}
                    {/* {this.props.currentUser && this.renderLeft(navigator)} */}

                </AppView>
                {showSearch && this.renderSearchBar()}
                {/* {this.state.lastSearchVisiable && this.renderLastSearch()} */}
            </AppView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: STATUSBAR_HEIGHT,
        backgroundColor: Colors.primary,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
        },
        elevation: 4,
        zIndex: 7000,
    },
    centerContainer: {
        flex: 1,
        justifyContent: Platform.OS === 'android' ? 'flex-end' : 'center',
    },
    text: {
        color: 'white',
    },
    searchBarContainer:{
        width: responsiveWidth(95),
        height: responsiveHeight(9),
        backgroundColor: "#fff",
        elevation: 5,
        borderRadius: moderateScale(2),
        marginHorizontal:moderateScale(3),
        alignSelf:"center",
        alignItems:"center"
    }
});


const mapStateToProps = state => ({
    rtl: state.lang.rtl
});

export default connect(mapStateToProps)(AppHeader);


