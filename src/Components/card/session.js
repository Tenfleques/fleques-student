import React, {Component}from 'react';
import {Link} from 'react-router-dom';
import AppConfig from "../../app.json";
import { userActions } from '../../redux';

class SessionCard extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }
    handleHide(){
        //this.props.session.id
    }
    render(){
        return (
            <div key={this.props.session.id} className="col-12 col-md-4 col-lg-3">
                <div className="card text-white bg-primary mb-3 pb-3">
                    <div className="card-body">
                        <div className="row">              
                            <span className="h5 col-12 px-2 text-right text-danger" onClick={() => this.handleHide()}>
                                {(this.props.user && this.props.user.role === "admin") && "x" }
                            </span>
                        </div>
                        <h4 className="card-title">
                            {this.props.session.title}
                        </h4>
                        <p className="card-text">{this.props.session.description}</p>
                    </div>
                    <div className="card-footer pt-1 pb-0">
                        <em>
                            {this.props.session.org}
                        </em>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default SessionCard;