import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = (theme) => ({
	text: {
		fontFamily: 'Zilla Slab'
	}
});

class RandomQuote extends Component {
	constructor(props) {
		super(props);
		this.state = {
			quotes: [],
			displayedquote: ''
		}
		this.getRandomQuote = this.getRandomQuote.bind(this);
	}

	getRandomQuote(quotes) {
		return quotes[Math.floor(Math.random() * quotes.length)];
	}

	componentDidMount() {
		axios.get('https://type.fit/api/quotes/')
		.then(response => {
			console.log(response);
			this.setState({ quotes: response.data });
			this.setState({ displayedquote: this.getRandomQuote(this.state.quotes) });
		})
		.catch(error => console.log(error));
		this.updateTimer = setInterval(() => this.setState({ displayedquote: this.getRandomQuote(this.state.quotes) }), 10000);
	}

	render() {
		const { classes } = this.props;
		return (
		this.state.displayedquote &&
		<div className={classes.text}>
			"{this.state.displayedquote.text}" <br/>
			- {this.state.displayedquote.author || "Unknown"}
		</div>
		)
	}
}

export default withStyles(useStyles)(RandomQuote)