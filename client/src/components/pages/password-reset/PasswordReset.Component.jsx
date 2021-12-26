import React, {useState} from 'react'
import {resetUserPassword} from "../../../redux/user/user.slice";
import { connect } from 'react-redux'

const PasswordReset= ({match:{params:{token}}, resetPassword}) =>{
    const [passValues, setPassValues]= useState({
        password: '',
        passwordConfirm: ''
    })

    const onChange= event =>{
        setPassValues({...passValues, [event.target.name] : event.target.value})
    }

    const onPasswordResetSubmit = event =>{
        event.preventDefault()
        resetPassword({...passValues, token})
    }

    return <div>
        <div>reset your password here</div>
        <form onSubmit={onPasswordResetSubmit}>
            <input
                name={'password'}
                placeholder={'new password'}
                type={'password'}
                value={passValues.password}
                onChange={onChange}
                required
            />
            <input
                name={'passwordConfirm'}
                placeholder={'password confirm'}
                type={'password'}
                value={passValues.passwordConfirm}
                onChange={onChange}
                required
            />
            <button type={'submit'}>reset password</button>
        </form>
    </div>
}

const mapDispatchToProps= dispatch =>({
    resetPassword: data => dispatch(resetUserPassword(data))
})

export default connect(null, mapDispatchToProps)(PasswordReset)