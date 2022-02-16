import React, {Component} from 'react';

class Counter extends Component {

    state = {
        count: 0,
        tags:['tag1','tag2','tag3']
    };

    formatCount(){
        return this.state.count === 0 ? 'Zero' : this.state.count;
    }

    styles = {
      fontSize: '60px',
        fontWeight:'bold'
    };

    renderTags(){
        if(this.state.tags.length === 0) return <p>There are no tags</p>;

        return (  <ul>
                    {this.state.tags.map(tag=><li key={tag}>{tag}</li>)}
                </ul>);
    }



    private handleIncrement = product =>{
        console.log(product);
        super.setState({ count: this.state.count + 1});
    }

    private doHandleIncrement = () => {
        this.handleIncrement({id: 1})
    }

    render() {


        return (<div>

            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
            <button onClick={() => {
                this.handleIncrement({id: 1})
            }} className="btn btn-secondary btn-sm">Increment</button>

        </div>);
    }

    private getBadgeClasses() {
        let classes = "badge m-2 bg-";
        classes += (this.state.count === 0) ? "warning" : "primary";
        return classes;
    }
}

export default Counter;