import React from "react";
import './header.component.styles.sass'
import pathLogo from '../../assets/logo2.jpg'
import defaultUser from '../../assets/default-avatar.jpg'

const Header= ()=>{
    return <div className={'header'}>
        <img src={pathLogo} alt={'logo'} className={'logo'}/>
        <div className={'forum-name'}>Danya FORUM</div>
        <div className={'entered-user'}>
            <img src={defaultUser} alt={'user photo'} className={'user-image'}/>
            <div className={'label'}>вы вошли как <br/> <span>анонимный пользователь №1</span></div>
        </div>
    </div>
}

export default Header