import React from 'react';
import Picture from './Picture/Picture';

const Pictures = props => {
    if (props.objects && !props.loading) {
        return props.objects.map((object, index) => {
            return <Picture 
                URL={object.imgURL}
                key={object.id}
                title={object.title}
                catalog={object.catalog}
                clicked={props.clicked}
                data={object.style}
                index={index}
                // deleteSelf={props.deleteSelf}
            />
        })
    } else {
        return null;
    }
}

export default Pictures;