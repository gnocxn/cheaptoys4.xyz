import React from 'react';
import Firebase from 'firebase';
import _ from 'lodash';
/*import Datastore from 'nedb';

const db = {};
db.products = new Datastore();
db.tags = new Datastore();*/

const firebaseRef = new Firebase('https://aliexpress.firebaseio.com/sites/cheaptoys4yz/products');
const watting = require('../waiting.gif');

export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			products : [],
			isLoaded : false
		}
	}
	componentWillMount(){
        let self = this;
        firebaseRef.on('value', function(dataSnapshot) {
            let data = dataSnapshot.val();
            let products = _.values(data);
            self.setState({products : products, isLoaded : true});
        })
	}
	render(){
		let products = _.chain(this.state.products).sortBy((p)=>{return p._salePrice}).reverse().value();
        let isLoaded = this.state.isLoaded;
        if(isLoaded && products){
            return <div className="row">
                {products.map((product)=>{
                    return <div className="col-lg-3 col-md-4 col-xs-6 thumb" key={product.productId}>
                        <a href={`/item/${product.productId}?out=${product.productUrl}`} target="_blank" className="thumbnail">
                            <ImageProduct id={product.productId} alt={product.productTitle} src={product.imageUrl}/>
                        </a>
                        <p className="info">
                            <span className="pull-left">Sold : {product.volume}</span>
                            <span className="pull-right">{product.salePrice}</span>
                        </p>
                    </div>
                })}
            </div>
        }else{
            return <div className="row">
                <div className="col-md-12">
                    <img src={watting} alt="Loading..." className="center-block" width="100px" height="100px"/>
                </div>
            </div>
        }

	}
}

let ImageProduct = React.createClass({
    componentDidMount(){
        let image = new Image();
        let imageProduct = document.getElementById(`image_${this.props.id}`);
        image.onload = function(){
            imageProduct.src = this.src;
        }
        image.src = this.props.src;
    },
    render(){
        return <img src={watting} alt={this.props.alt} className="image-responsive center-block" id={`image_${this.props.id}`}/>
    }
})