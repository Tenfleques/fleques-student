import React, {Component} from 'react';
// import Select from "../../../Controls/Select"
import AutoCompleteTextBox from "../../../Controls/AutocompleteTextBox"
// import Locale from "../../../_locale"
import TextUtils from "../../../utilities"
import Table from "../../../Components/Table"
import TranscripTableProps from "../../../Configs/Constants/transcript_table.json"

function processSubjectFile(text){
    let lines = text.split("\n");
    let group = null;
    let options = [];

    for (let i = 0; i < lines.length; ++i){
        let arr = lines[i].split(";");

        options[i] = null

        if(arr.length !== 2){
            continue;
        }
        
        if(arr[0].includes("Кафедра")){
            group = arr;
            continue;
        }

        options[i] = {
            "department" : group,
            "label" : arr[0],
            "ru" : arr[0],
            "en" : arr[1],
            "value" : i
        }
    }
    return options;
}

class TranscriptPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            options : [], 
            selected_options : [], 
            table : {
                columns : TranscripTableProps.columns,
                data : [],
                title : "Extract from the progress record book"
            },
            table_header : {
                student : {},
                faculty : {},
                speciality: {},
                form_of_training: {}
            }
        }
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onClickOption = this.onClickOption.bind(this);
        this.formatOptions = this.formatOptions.bind(this);
    }
    onChangeSelect(e){
        
    }
    onClickOption(e){  
        let selected_options = this.state.selected_options;
        let chosen_option =  e.target.dataset["key"];
        selected_options.push(this.state.options[chosen_option]);

        this.setState({selected_options}, () => {
        });
    }
    
    formatOptions(options, onClick){
        return options.filter(a => a && !this.state.selected_options.includes(a)).map(a => {
            return <button key={a.value} data-key={a.value} className="dropdown-item" onClick={onClick}>
                {a.label}
            </button>
        })
    }
    formatTableRows(){
        return this.state.selected_options.filter(a => a !== null).map((a, index) => {
            return {
                "id" : index + 1,
                "discipline" : a.en,
                "num_hours" : "",
                "type_of_assesment" : "",
                "turnout" : "",
                "grade" : ""
            }
        })
    }
    optionsFilterFunction(text, options){  
        if(text.length === 0 )
            return []   

        let sorted = options.filter(a => a !== null).map(a => {
            let sims = [0];
            for (let i = 0; i < a.label.length - text.length; ++i){
                let sim = TextUtils.TextUtilities.similarity(a.label.slice(i, i + text.length ), text);
                sims.push(sim)
            }
            for (let i = 0; i < a.department[0].length - text.length; ++i){
                let sim = TextUtils.TextUtilities.similarity(a.department[0].slice(i, i + text.length ), text);
                sims.push(sim)
            }
            a["order"] =  Math.max.apply(null, sims);
            return a;
        })
        .filter(a => a.order > 0.5)
        .sort((a, b) => b.order - a.order);

        return sorted;
    }
    componentDidMount(){
        fetch('/data/translations.csv')
            .then((r) => r.text())
            .then(text  => {
                let options = processSubjectFile(text);
                this.setState({options : options})
            })  
    }
    render(){
        return (
            <div className="container-fluid">            
                <div className="row mt-5" >
                    <div className="col-12 my-3">
                        <AutoCompleteTextBox 
                        options={this.state.options}
                        filtered_options={[]}
                        filterFunc={this.optionsFilterFunction} 
                        formatOptions={this.formatOptions}
                        onClickElement={this.onClickOption}
                        className="col-12 col-md-5" 
                        optionsDropdownClass="bg-white z-1000 col-10 border-right"                       
                        name="filter-disciplines"
                        />
                    </div>
                    <div className="col-12 mt-3">
                        <Table columns={this.state.table.columns} data={this.formatTableRows()} rows='10' title={this.state.table.title}/>
                    </div>
                </div>
            </div>      
        );
    }
}
export default TranscriptPage;  