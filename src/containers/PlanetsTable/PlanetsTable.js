import React, {Component} from "react";
import axios from 'axios';
import './PlanetsTable.css';
import Select from 'react-select';


class PlanetsTable extends Component {
    state = {
        planets : [],
        keys: [],
        selectedOptions: ' '
    };
    handleChange = (selectedOption) => {
        this.setState({selectedOption});
        console.log('Selected: ' + selectedOption.label)

    };
    sortBy(key) {
        console.log(this.state.planets);
        this.setState({
            planets: this.state.planets.sort((a, b) => +a[key] < +b[key])

        })
    }


    componentWillMount() {
        let keys;
        axios.get('https://swapi.co/api/planets/')
            .then(res => {
                // console.log(res.data.results);
                keys = Object.keys(res.data.results[0]).slice(0,9);
                // console.log(keys);
                this.setState({
                    planets: res.data.results,
                    keys: keys
                });
            })

    }


    render() {
        const { selectedOption } = this.state;
        return (
            <div className={'wrapper container-fluid'}>
                <div className="row">
                    <div className={'col-md-2'}>
                        <Select
                            placeholder='Terrain'
                            name='filter'
                            value={selectedOption}
                            onChange={this.handleChange}
                            searchable={false}
                            options={[
                                {value: 'grassy hills', label: 'Grassy Hills'},
                                {value: 'swamps', label: 'Swamps'},
                                {value: 'forests', label: 'Forests'},
                                {value: 'mountains', label: 'Mountains'},
                            ]}
                        />
                    </div>
                </div>
                <table className={'table  table-striped table-bordered'}>
                    <thead>
                    <tr>
                        {this.state.keys.map((key) =>{
                            if(key === 'rotation_period') {
                                return (
                                    <th onClick={() =>this.sortBy('rotation_period') } key={key}>
                                        {key}
                                        <i className={"fa fa-sort-amount-asc"} aria-hidden="true"></i>
                                    </th>
                                )
                            } else if (key === 'orbital_period') {
                                return (
                                    <th onClick={() =>this.sortBy('orbital_period') }  key={key}>
                                        {key}
                                        <i className={"fa fa-sort-amount-asc"} aria-hidden="true"></i>
                                    </th>
                                )
                            } else {
                                return (
                                    <th key={key}>
                                        {key}
                                    </th>
                                )
                            }

                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.planets.map((planet) => {
                        // console.log(planet);
                        return (
                            <tr key={planet.url}>
                                {this.state.keys.map((key) => {
                                    // console.log(planet[key]);
                                    return (
                                        <td key={key}>
                                            {planet[key]}
                                        </td>
                                    )
                                })}
                            </tr>
                        )

                    })}
                    </tbody>
                </table>
            </div>
        )
    }

}




export default  PlanetsTable;