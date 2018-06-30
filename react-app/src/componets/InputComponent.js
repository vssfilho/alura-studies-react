import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class InputComponent extends Component{

    constructor() {
      super();
      this.state = {
        msgError: ''
      };
    }

    componentDidMount() {

      PubSub.subscribe("erro-validate",function(topico, error) {
        if(error.field === this.props.name) {
          this.setState({msgError: error.defaultMessage});
        }
      }.bind(this));

      PubSub.subscribe('clear-errors', function(topico) {
        this.setState({msgError: ''});
      }.bind(this));  

    }

    render() {
        return(
          <div className="pure-control-group">
            <label htmlFor={this.props.id}>{this.props.label}</label>
            <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
            <span>{this.state.msgError}</span>
          </div>
      );
    }
}