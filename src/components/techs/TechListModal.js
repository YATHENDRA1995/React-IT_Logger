import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getTechs } from '../../actions/techActions';
import TechListItemModal from '../techs/TechListItemModal';

const TechListModal = ({ getTechs, tech: {techs, loading}}) => {

    useEffect(() => {
        getTechs();
        // eslint-disable-next-line
    }, [])

    return (
        <div id='tech-list-modal' className='modal'>
            <div className='modal-content'>
                <h4>Technician List</h4>
                <ul className='collection'>
                    {!loading && techs !== null && techs.map(tech => 
                        <TechListItemModal tech={tech} key={tech.id} />
                    )}
                </ul>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    tech: state.tech
});

export default connect(mapStateToProps, { getTechs })(TechListModal);