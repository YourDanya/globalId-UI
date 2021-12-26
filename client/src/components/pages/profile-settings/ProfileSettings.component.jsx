import React, {useState} from "react"
import {createStructuredSelector} from "reselect";
import {forgetUserPassword, selectUserData, updateUserData, updateUserPassword} from "../../../redux/user/user.slice";
import {selectUpdateUserDataLoading} from '../../../redux/loading.slice'
import {connect} from "react-redux";

import styles from './ProfileSettings.module.sass'
import brokenImage from '../../../assets/icons/broken-image.png'
import baseUrl from "../../../api/baseUrl";
import { changeAvatar } from "../../../redux/profile/profile.slice";

const ProfileSettings= ({userData:{name, avatar}, updateData, changeAvatar, changeNameMessage, updatePassword, forgetPassword}) =>{

    const [allValues, setAllValues] = useState({
        newName: name,
        currentPassword: '',
        newPassword: '',
        passwordConfirm: '',
        email: ''
    })


    const handleChange= event => {
        setAllValues({...allValues, [event.target.name] : event.target.value})
    }

    const onNameChangeSubmit = event =>{
        event.preventDefault()
        updateData({name: allValues.newName})
    }

    const onPasswordUpdateSubmit = event =>{
        event.preventDefault()
        console.log(allValues)
        const {newName, ...passValues}= allValues
        updatePassword(passValues)
    }

    async function handleAvatarInput(event) {
        changeAvatar(event.target.files[0])
    }

    const onForgetPasswordSubmit= event =>{
        event.preventDefault()
        forgetPassword({email: allValues.email})
    }

    return <div className={styles.ProfileSettings}>
        <img alt='avatar' className={styles.avatar} src={avatar ? `${baseUrl}/images/${avatar}` : brokenImage} />
        <div>{name}</div>
        <label htmlFor="Change avatar">Change avatar</label>
        <input type='file' name='Change avatar' onChange={handleAvatarInput} />
        <form onSubmit={onNameChangeSubmit}>
            <input
                name={'newName'}
                type={'text'}
                placeholder={'name'}
                value={allValues.newName}
                onChange={handleChange}
                required
            />
            <button type={'submit'}>Change name</button>
        </form>
        {changeNameMessage}
        <form onSubmit={onPasswordUpdateSubmit}>
            <input
                name={'currentPassword'}
                type={'password'}
                placeholder={'currentPassword'}
                value={allValues.currentPassword}
                onChange={handleChange}
                required
            />
            <input
                name={'newPassword'}
                type={'password'}
                placeholder={'new password'}
                value={allValues.newPassword}
                onChange={handleChange}
                required
            />
            <input
                name={'passwordConfirm'}
                type={'password'}
                placeholder={'password confirm'}
                value={allValues.passwordConfirm}
                onChange={handleChange}
                required
            />
            <button type={'submit'}>Change pass</button>
        </form>

        <form onSubmit={onForgetPasswordSubmit}>
            <input
                name={'email'}
                type={'email'}
                placeholder={'email'}
                value={allValues.email}
                onChange={handleChange}
                required
            />
            <button type={'submit'}>reset pass</button>
        </form>
    </div>
}

const mapStateToProps= state => ({
    userData: selectUserData(state),
    changeNameMessage: selectUpdateUserDataLoading(state).message
})

const mapDispatchToProps = dispatch =>({
    updateData: data => dispatch(updateUserData(data)),
    changeAvatar: avatar => dispatch(changeAvatar(avatar)),
    updatePassword: data => dispatch(updateUserPassword(data)),
    forgetPassword: data => dispatch(forgetUserPassword(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings)