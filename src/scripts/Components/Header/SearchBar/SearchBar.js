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
        this.input = document.createElement("input");
        this.input.type = "text";
        this.input.setAttribute("placeholder", "Type location...");
        this.input.setAttribute("required", "");
        this.input.setAttribute("autofocus", "");
        this.input.classList.add("search__input");

        [ 'handleSubmit', 'handleAutocomplete' ]
            .forEach(name => this[name] = this[name].bind(this));
        this.handleAutocomplete();
        this.state = {};
        WeatherDataService.subscribeForWeather();
    }

    handleAutocomplete(){

        initAutocomplete(this.input, this.handleAutocomplete);
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
                           // {
                           //     tag: 'input',
                           //     classList: ['search__input'],
                           //     attributes: [
                           //         {name: 'type', value: 'text'},
                           //         {name: 'placeholder', value: 'Type location...'},
                           //         {name: 'required', value: ''},
                           //         {name: 'autofocus', value: ''},
                           //         {name: 'autocomplete', value: 'off'},
                           //     ]
                           // }
                           this.input
                       ]
                   }
               ]
           }
       ];
    }
}

//ComponentFactory.register(SearchBar);

export default SearchBar;