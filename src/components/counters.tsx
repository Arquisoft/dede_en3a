import React, {Component} from "react";
import Counter from './counter.tsx';

class Counters extends Component {
    state={
        counters: [
            {id: 1, value:0},
            {id:2, values:0},
            {id:3, value:0},
            {id:4,value:0}
        ]
    };

    render(){
        return (<div>
            {this.state.counters.map(cnt => (
                <Counter key={cnt.id} value={cnt.value} selected = {true}/>))}

        </div>);
    }
}

export default Counters;