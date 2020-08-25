import React from 'react';
import ReactTable from 'react-table';
import api from '../api';
import columnBuilder from '../utilities/column-builder';

export default class cardList extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = 
        {
            cards: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async() => 
    {
        this.setState({isLoading: true});
    
    await api.getAllCards().then(cards =>
        {
            this.setState(
                {
                    cards : cards.data.data,
                    isLoading: false,
                });
        });
    }

    render() {
        const {cards, isLoading} = this.state;

        const columns = columnBuilder(cards[0]);

        let showTable = true;

        if (!cards.length) {
            showTable = false;
        }

        return (
            <div>
            {showTable &&(
                <ReactTable
                    data = {cards}
                    columns = {columns}
                    loading = {isLoading}
                    defaltPageSize = {10}
                    showPageSizeOptions = {true}
                    minRows = {0}
                />
            )}
            </div>
        );
    }
}