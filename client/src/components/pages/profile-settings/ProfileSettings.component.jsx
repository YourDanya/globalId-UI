import React, {useState} from "react";
import {createStructuredSelector} from "reselect";
import {selectUser, selectUserData, updateUserData} from "../../../redux/user/user.slice";
import {connect} from "react-redux";

import styles from './ProfileSettings.module.sass'
import brokenImage from '../../../assets/icons/broken-image.png'
import baseUrl from "../../../api/baseUrl";
import { changeAvatar } from "../../../redux/profile/profile.slice";

const ProfileSettings= ({userData:{name, avatar}, updateData, changeAvatar}) =>{

    const [changeName, setName]=useState(name)

    const onSubmit = event =>{
        event.preventDefault()
        updateData({name: changeName})
    }

    async function handleAvatarInput(event) {
        changeAvatar(event.target.files[0])
    }

    return <div className={styles.ProfileSettings}>
        <img alt='avatar' className={styles.avatar} src={avatar ? `${baseUrl}/images/${avatar}` : brokenImage} />
        <label htmlFor="Change avatar">Change avatar</label>
        <input type='file' name='Change avatar' onChange={handleAvatarInput} />
        <form onSubmit={onSubmit}>
            <input
                name={'name'}
                type={'text'}
                placeholder={'name'}
                value={changeName}
                onChange={(event)=>setName(event.target.value)}
                required
            />
            <button type={'submit'}>Change name</button>
        </form>
        
        
    </div>
}

const mapStateToProps= createStructuredSelector({
    userData: selectUserData
})

const mapDispatchToProps = dispatch =>({
    updateData: data => dispatch(updateUserData(data)),
    changeAvatar: avatar => dispatch(changeAvatar(avatar))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings)