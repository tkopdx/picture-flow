import React from 'react';
import Picture from './Picture/Picture';

const Pictures = props => {
    if (props.URLs) {
        return props.URLs.map(URL => {
            return <Picture 
                URL={URL}
                // clicked={}
                // close={}
            />
        })
    }
}

export default Pictures;