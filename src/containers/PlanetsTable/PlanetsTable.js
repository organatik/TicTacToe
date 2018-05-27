import React, {Component} from "react";
import axios from 'axios';
import './PlanetsTable.css';
import Select from 'react-select';
import Planet from '../../components/Planet/planet';
import TableHeaders from '../../components/PlanetsTableHeaders/tableHeaders'


class PlanetsTable extends Component {
    state = {
        planets : [],
        keys: [],
        selectedOptionsTerrain : null,
        selectedOptionsPopulation: null,
        sortBy: true,
    };

    componentDidMount() {
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
    handleChangeTerrain = (selectedOption) => {
        // console.log(this.state.selectedOptions);
        if(selectedOption !== null) {
            this.setState({
                selectedOptionsTerrain: selectedOption.value
            });
        } else {
            this.setState({
                selectedOptionsTerrain: null
            });
        }


        // console.log('Selected: ' + selectedOption.label)

    };
    handleChangePopulation = (selectedOption) => {

        if(selectedOption !== null) {
            this.setState({
                selectedOptionsPopulation: selectedOption.value
            });
        } else {
            this.setState({
                selectedOptionsPopulation: null
            });
        }
        console.log(this.state.selectedOptionsPopulation);

    };

    // setFilter(filter) {
    //     this.setState((state)=> ({
    //         filters: Object.assign({},state.filters,{[filter]: !state.filters[filter]} )
    //     }))
    // }
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





    render() {

        const { selectedOption } = this.state;
        let planets = this.state.planets.slice();
        if(this.state.selectedOptionsTerrain) {
            planets = planets.filter( planet => planet.terrain.split(', ').includes(this.state.selectedOptionsTerrain));
        }
        if(this.state.selectedOptionsPopulation) {
            planets = planets.filter( planet => planet.population > this.state.selectedOptionsPopulation)
        }

      const allPlanets = (
          planets.map((planet ) => {
                return <Planet
                    planet={planet}
                    key={planet.url}
                    keys={this.state.keys}/>
          }
        )
    );

        const tableHeaders = (
                this.state.keys.map(key => {

                        return <TableHeaders
                            key={key}
                            keys={key}
                            click={ ()=>{this.sortBy(key)} }
                        />

                })
        );

        const selectTerrain = (
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
        );
        const selectPopulation = (
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
        );


        return (
            <div className={'wrapper container-fluid'}>
                <div className="row">
                    <div className={'col-md-2'}>
                        {selectTerrain}
                    </div>
                    <div className="col-md-2">
                        {selectPopulation}
                    </div>
                </div>
                <table className={'table  table-striped table-bordered'}>
                    <thead>
                        <tr>
                            {tableHeaders}
                        </tr>
                    </thead>
                    <tbody>
                        {allPlanets}
                    </tbody>
                </table>
            </div>
        )
    }

}




export default  PlanetsTable;