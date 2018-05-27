import React, {Component} from "react";
import axios from 'axios';
import './PlanetsTable.css';
import Select from 'react-select';


class PlanetsTable extends Component {
    state = {
        planets : [],
        keys: [],
        selectedOptionsTerrain: ' ',
        selectedOptionsPopulation: ' ',
        sortBy: true
    };
    handleChangeTerrain = (selectedOption) => {
        // console.log(this.state.selectedOptions);
        if(selectedOption !== null) {
            this.setState({
                selectedOptionsTerrain: selectedOption.value
            });
        } else {
            this.setState({
                selectedOptionsTerrain: ' '
            });
        }
        // console.log('Selected: ' + selectedOption.label)

    };
    handleChangePopulation = (selectedOption) => {
        console.log(this.state.selectedOptionsPopulation);
        if(selectedOption !== null) {
            this.setState({
                selectedOptionsPopulation: selectedOption.value
            });
        } else {
            this.setState({
                selectedOptionsPopulation: ' '
            });
        }
        // console.log('Selected: ' + selectedOption.label)

    };
    sortBy(key) {
        console.log(this.state.planets);
        if(this.state.sortBy) {
            this.setState({
                planets: this.state.planets.sort((a, b) => +a[key] < +b[key]),
                sortBy: !this.state.sortBy
            });

        } else {
            this.setState({
                planets: this.state.planets.sort((a, b) => +a[key] > +b[key]),
                sortBy: !this.state.sortBy
            })
        }
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
                            name='filterTerrain'
                            value={selectedOption}
                            onChange={this.handleChangeTerrain}
                            searchable={false}
                            isClearable
                            options={[
                                {value: 'grassy hills', label: 'Grassy Hills'},
                                {value: 'swamps', label: 'Swamps'},
                                {value: 'forests', label: 'Forests'},
                                {value: 'mountains', label: 'Mountains'},
                            ]}
                        />
                    </div>
                    <div className="col-md-2">
                        <Select
                            placeholder='Population'
                            name='filterPopulation'
                            value={selectedOption}
                            onChange={this.handleChangePopulation}
                            searchable={false}
                            isClearable
                            options={[
                                {value: 100000, label: ' > 100000'},
                                {value: 1000000, label: '> 1000000 '},
                                {value: 5000000, label: ' > 5000000'},
                                {value: 100000000, label: ' > 100000000'},

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
                        console.log(planet.population);
                        console.log(+planet.population > this.state.selectedOptionsPopulation);
                        if((planet.terrain.split(', ').includes(this.state.selectedOptionsTerrain)) &&
                            (+planet.population > this.state.selectedOptionsPopulation)){
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
                        } else {
                            if(this.state.selectedOptionsTerrain === ' '
                                && (+planet.population > this.state.selectedOptionsPopulation)) {
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
                            } else if ((planet.terrain.split(', ').includes(this.state.selectedOptionsTerrain)
                                && this.state.selectedOptionsPopulation === ' ')) {
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
                            }
                        }

                    })}
                    </tbody>
                </table>
            </div>
        )
    }

}




export default  PlanetsTable;