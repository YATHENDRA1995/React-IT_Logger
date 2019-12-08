import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTech } from '../../actions/techActions';
import M from 'materialize-css/dist/js/materialize';

const TechListItemModal = ({ tech, deleteTech }) => {

    const onDelete = () => {
        deleteTech(tech.id)
        M.toast({ html: 'Deleted technician successfully !!!'});
    }

    return (
        <li className='collection-item'>
            <div>
                {tech.firstName} {tech.lastName}
                <a href='#!' className='secondary-content' onClick={onDelete}>
                    <i className='material-icons grey-text'>delete</i>
                </a>
            </div>
        </li>
    )
}

TechListItemModal.propTypes = {
    tech: PropTypes.object.isRequired
}

export default connect(null, { deleteTech })(TechListItemModal);
