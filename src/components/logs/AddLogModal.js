import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLog } from '../../actions/logActions';

import M from 'materialize-css/dist/js/materialize';
import TechSelectOptions from "../techs/TechSelectOptions";


const AddLogModal = ({ addLog, techs }) => {

    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    // const [tech, setTech] = useState(techs !== null && techs.length > 0 ? techs[0] : '');
    const [tech, setTech] = useState('');
    useEffect(() => {
        if(techs !== null && techs.length > 0) {
            setTech(techs[0].firstName + ' ' + techs[0].lastName);
        }
    }, [techs])


    const onSubmit = () => {
        if (message === '' || tech === '') {
            M.toast({ html: 'Please enter a message and tech' });
        } else {
            const newLog = {
                message,
                attention,
                tech,
                date: new Date()
            }
            addLog(newLog);
            M.toast({ html: `Log added by ${tech}` });
        }

        // Clear Fields
        setMessage('');
        setAttention(false);
        setTech('');
    }

    return (
        <div id="add-log-modal" className="modal" style={modalStyle}>
            <div className="modal-content">
                <h4>Enter System Log</h4>
                <div className="row">
                    <div className="input-field">
                        <input
                            type='text'
                            name='message'
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                        />
                        <label htmlFor='message' className='active'>
                            Log Message
                        </label>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field'>
                        <select
                            name='tech'
                            value={`${tech.firstName} ${tech.lastName}`}
                            className='browser-default'
                            onChange={e => setTech(e.target.value)}
                        >
                            <TechSelectOptions />
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='input-field'>
                        <p>
                            <label>
                                <input
                                    type='checkbox'
                                    className='filled-in'
                                    checked={attention}
                                    value={attention}
                                    onChange={e => setAttention(!attention)}
                                />
                                <span>Needs Attention</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>
            <div className='modal-footer'>
                <a
                    href='#!'
                    onClick={onSubmit}
                    className='modal-close waves-effect blue waves-green btn'
                >
                    Enter
                </a>
            </div>
        </div>
    )
};

AddLogModal.propTypes = {
    addLog: PropTypes.func.isRequired,
};

const modalStyle = {
    width: '75%',
    height: '75%'
}

const mapStateToProps = state => ({
    techs: state.tech.techs
});

export default connect(mapStateToProps, { addLog })(AddLogModal);
