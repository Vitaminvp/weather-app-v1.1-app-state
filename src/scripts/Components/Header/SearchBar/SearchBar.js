import "babel-polyfill";
import { Component } from "../../../framework";
//import ComponentFactory from "../../../framework/ComponentFactory";
import { initAutocomplete } from "../../../../Services/constants";
import WeatherDataService from "../../../../Services/WeatherDataService";

class SearchBar extends Component{
    constructor(host, props) {
        super(host, props);
        this.props = props;
    }

    componentWillMount(){
        [ 'handleSubmit', 'handleAutocomplete' ]
            .forEach(name => this[name] = this[name].bind(this));
        this.handleAutocomplete();
        this.state = {};
        WeatherDataService.subscribeForWeather();
    }

    handleAutocomplete(){

        setTimeout(()=>{
            const input = document.querySelector(".search__input");
            initAutocomplete(input, this.handleAutocomplete);
        },100);
    }

    handleSubmit(e){
        e.preventDefault();
        const input = e.target.querySelector('.search__input');
        const query = input.value.split(', ');
        WeatherDataService.subscribeForWeather(query);
        input.value = '';
    };

    render(){
       return [
           {
               tag: 'form',
               classList: ['search__form'],
               attributes: [ {name: 'action', value: ''} ],
               eventHandler: {
                       submit: this.handleSubmit
               },
               children: [
                   {
                       tag: 'label',
                       classList: 'search__input_label',
                       children: [
                           {
                               tag: 'input',
                               classList: ['search__input'],
                               attributes: [
                                   {name: 'type', value: 'text'},
                                   {name: 'placeholder', value: 'Type location...'},
                                   {name: 'required', value: ''},
                                   {name: 'autofocus', value: ''},
                                   {name: 'autocomplete', value: 'off'},
                               ]
                           }
                       ]
                   }
               ]
           }
       ];
    }
}

//ComponentFactory.register(SearchBar);

export default SearchBar;