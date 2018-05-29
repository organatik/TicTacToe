import React, {Component} from "react";
import axios from 'axios';
import './PlanetsTable.css';
import Select from 'react-select';
import Planet from '../../components/Planet/planet';
import TableHeaders from '../../components/PlanetsTableHeaders/tableHeaders'
import {terrainOptions, populationOptions} from './constants'


class PlanetsTable extends Component {
    state = {
        planets: [],
        keys: [],
        selectedOptionsTerrain: null,
        selectedOptionsPopulation: null,
        sortBy: true,
    };

    componentDidMount() {
        let keys;
        axios.get('https://swapi.co/api/planets/')
            .then(res => {
                keys = Object.keys(res.data.results[0]).slice(0, 9);
                this.setState({
                    planets: res.data.results,
                    keys: keys
                });
            })

    }

    renderAllPlanets = () => {
        let planets = this.state.planets.slice();
        if (this.state.selectedOptionsTerrain) {
            planets = planets.filter(planet => planet.terrain.split(', ').includes(this.state.selectedOptionsTerrain));
        }
        if (this.state.selectedOptionsPopulation) {
            planets = planets.filter(planet => planet.population > this.state.selectedOptionsPopulation)
        }
        return (planets.map(planet =>
                 <Planet
                    planet={planet}
                    key={planet.url}
                    keys={this.state.keys}
                />
            )
        )
    };

    renderTableHeaders = () => (
        this.state.keys.map(key =>
             <TableHeaders
                key={key}
                keys={key}
                click={() => {
                    this.sortBy(key)
                }}
            />
        )
    );

    handleChangeTerrain = (selectedOption) =>
        this.setState(() => ({
            selectedOptionsTerrain: selectedOption
                ? selectedOption.value
                : null
        }));

    handleChangePopulation = (selectedOption) =>
        this.setState(() => ({
            selectedOptionsPopulation: selectedOption
                ? selectedOption.value
                : null
        }));


    sortBy(key) {
        this.setState(() => ({
            sortBy: !this.state.sortBy,
            planets: this.state.sortBy
                ? this.state.planets.sort((a, b) => +a[key] < +b[key])
                : this.state.planets.sort((a, b) => +a[key] > +b[key])
        }));
    }

    render() {

        const {selectedOption} = this.state;

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
                            options={terrainOptions}
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
                            options={populationOptions}
                        />
                    </div>
                </div>
                <table className={'table  table-striped table-bordered'}>
                    <thead>
                        <tr>
                            {this.renderTableHeaders()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderAllPlanets()}
                    </tbody>
                </table>
            </div>
        )
    }

}


export default PlanetsTable;