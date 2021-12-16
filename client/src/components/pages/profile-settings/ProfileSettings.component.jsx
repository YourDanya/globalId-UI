import React, {useState} from "react";
import {createStructuredSelector} from "reselect";
import {selectUser, selectUserData, updateUserData} from "../../../redux/user/user.slice";
import {connect} from "react-redux";

const ProfileSettings= ({userData:{name}, updateData}) =>{

    const [changeName, setName]=useState(name)

    const onSubmit = event =>{
        event.preventDefault()
        updateData({name: changeName})
    }

    return <div className={'file'}>
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
    updateData: data => dispatch(updateUserData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings)