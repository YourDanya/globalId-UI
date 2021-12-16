import React from 'react'
import WithSpinner from "../../layout/WithSpinner/WithSpinner";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import ProfileSettings from "./ProfileSettings.component";
import {selectUpdateUserDataLoading, selectFetchUserDataLoading, selectUserLoading} from "../../../redux/loading.slice";
import {compose} from "redux";

const mapStateToProps= state => ({
    isLoading: selectFetchUserDataLoading(state).isLoading || selectUpdateUserDataLoading(state).isLoading
})

const ProfileSettingsContainer=compose(
    connect(mapStateToProps),
    WithSpinner
)(ProfileSettings)

export default ProfileSettingsContainer