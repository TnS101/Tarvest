import React from 'react';

import logo from '../logo.svg';

export default class Logo extends React.Component
{
    render() {
        return <a href="/">
            <img src ={logo} width="50" height="50" alt="link"/>
        </a>
    }
}