import React from 'react';
import Firebase from 'firebase';
import _ from 'lodash';

export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			products : []
		}
	}
	componentWillMount(){
		let sefl = this;
		sefl.firebaseRef = new Firebase('https://aliexpress.firebaseio.com/sites/cheaptoys4yz/products');
		sefl.firebaseRef.on('value', function(dataSnapshot) {
			let data = dataSnapshot.val();
			let productIds = _.keys(data);
			let products = _.values(data);
			sefl.setState({products : products});
		})
	}
	render(){
		let products = _.sortBy(this.state.products,['volume']);
		return <div className="row">
			{products.map((product)=>{
				return <div className="col-lg-3 col-md-4 col-xs-6 thumb" key={product.productId}>
					<a href={product.productUrl} target="_blank" className="thumbnail">
						<img src={product.imageUrl} alt={product.productTitle} className="img-responsive" />
					</a>
					<p className="info">
						<span className="pull-left">Sold : {product.volume}</span>
						<span className="pull-right">{product.salePrice}</span>
					</p>
				</div>
			})}
		</div>
	}
}