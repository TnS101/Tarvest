import React from 'react';

export default class Navbar extends React.Component
{
    render()
    {
        return <nav>
        <a href='http://localhost:8000/card/list' >Card List</a>
        <a href='http://localhost:8000/card/create' >Create a Card</a>
         </nav>
    }
}