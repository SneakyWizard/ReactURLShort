/*

	https://react-hook-form.com/

*/

import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import './App.css';
import helper from './helper.js';

var Helper = new helper();

function App() {

	const [ path, setPath ]          = useState('');
	const [ error, setError ]        = useState('');
	const [ custom, setCustom ]      = useState(false);
	const [ domain, setDomain ]      = useState('');
	const [ submit, setSubmit ]      = useState(false);
	const [ sub_domain, setSub ]     = useState('');
	const [ complete, setComplete ]  = useState(false);
	const [ linkedin, setLinkedIn ]  = useState('');
	const { register, handleSubmit } = useForm();

	let ip_addr = '116.203.76.21';

	useEffect( () => {

		setError('');

		if ( domain.length && !Helper.is_valid_domain( domain ) ) { 
			setError( 'The domain must follow normal format like example.com' );
		} 

		if ( sub_domain.length && !Helper.is_valid_sub( sub_domain ) ) { 
			setError( 'The sub-domain must be only alphanumeric' );
		} 

		if ( path.length && !Helper.is_valid_sub( path ) ) { 
			setError( 'The name must be only alphanumeric' );
		} 

		if ( linkedin.length && !Helper.is_valid_linkedin( linkedin ) ) { 
			setError( 'Only valid linked in urls e.g. linkedin.com allowed' );
		}

	}, [ sub_domain, domain, path, linkedin ] );

	function resetState() { 
		setSub('');
		setPath('');
		setError('');
		setDomain('');
		setLinkedIn('');
	}

	function updateHtml( e ) {
		var name  = e.target.name;
		var value = e.target.value;

		if ( name === 'path' ) {
			setPath( value );
		} 

		if ( name === 'sub_domain' ) {
			setSub( value );
		}
		
		if ( name === 'domain' ) { 
			setDomain( value );
		}
		
		if ( name === 'linkedin_url' ) { 
			setLinkedIn( value );
		}
	}

	// Custom input that syncs with state. 
	function custFields() { 
		return (
			<>
				<h6>DNS:</h6>&nbsp;&nbsp;http://{sub_domain ? sub_domain : 'the-name'}.{domain ? domain : 'example.com'}
				<input ref={register()} type="hidden" name="form-name" value="custom" />
				<div><input className="form-control input-lg" ref={register()} value={sub_domain} type="text" name="sub_domain" placeholder="the-name" onChange={updateHtml} autoComplete="off" /></div>
				<div><input className="form-control input-lg" ref={register()} value={domain} type="text" name="domain" placeholder="example.com" onChange={updateHtml} autoComplete="off" /></div>
			</>
		);
	}

	// Basic input that syncs with state. 
	function basicFields() { 
		return ( 
			<>
				<h6>Short URL:</h6>&nbsp;&nbsp;http://lktd.in/{path ? path : 'the-name'}
				<input ref={register()} type="hidden" name="form-name" value="default" />
				<div><input className="form-control input-lg" ref={register()} value={path} type="text" name="path" placeholder="the-name" onChange={updateHtml} autoComplete="off" /></div>
			</>
		);
	}

	// Send JSON to the server.
	const onSubmit = async( data ) => { 
		
		const req = { 
			method: 'POST',
			headers: { 'Content-Type': 'application/json'  },
			body: JSON.stringify( data )
		};

		let response = await fetch( '/save', req );
		response     = await response.json();

		if ( response.error ) { 
			setError( response.error );
		} else if ( response.success ) { 
			setComplete( true );
		}
	}

	return (
			<div className="container">
				<div className="row">
					<div className="col-md-12">
						<div className={`${complete ? "show" : "hide"}`}>
							<center>
								{path  && <h5>http://lktd.in/{path}</h5>}
								{!path && <h5>http://{sub_domain}.{domain}</h5>}
								<h5>Goes to:</h5>
								<h5>{linkedin}</h5>
							</center>
						</div>
						<form id='form' className={`${complete ? "hide" : "show"}`} onSubmit={ handleSubmit( onSubmit ) }>
							<div className="form-group">
								{!custom && <h3>Create a Linked in <u>short link</u> with a provided domain.</h3>}
								{custom  && <h3>In your DNS provider settings, add a new "A record" pointing to <u>{ip_addr}</u></h3>}
								{custom  && custFields()}
								{!custom && basicFields()}
								<input className="form-control input-lg" ref={register()} type="text" name="linkedin_url" value={linkedin} onChange={updateHtml} placeholder="linkedin profile url" autoComplete="off" /><br />
							</div>
							<table className="btn-table">
								<tbody>
									<tr>
										<td><button className={`btn ${custom ? "btn-primary" : "btn-success"}`} type="button" onClick={ ( e ) => setCustom( false ) }>Basic</button></td>
										<td><button className={`btn ${custom ? "btn-success" : "btn-primary"}`} type="button" onClick={ ( e ) => setCustom( true ) }>Custom</button></td>
										<td><button className="btn btn-warning" type="button" onClick={ () => resetState() }>Reset</button></td>
										<td><button className="btn btn-danger" type="submit">Submit</button></td>
									</tr>
								</tbody>
							</table>
						</form>
						<div className="col-md-12">
							<br />
							{error && <div className="error" id='error'>{error}</div>}
						</div>
					</div>
				</div>
			</div>
	);
}

export default App;
