// import React from 'react';
import './MiniProfile.css';

const MiniProfile = ({ name, title, avatar }) => {
    return (
        <div className="mini-profile">
            <img src={avatar} alt={`${name}'s avatar`} className="mini-profile__avatar" />
            <div className="mini-profile__info">
                <h3 className="mini-profile__name">{name}</h3>
                <p className="mini-profile__title">{title}</p>
            </div>
        </div>
    );
};

export default MiniProfile;