import React from 'react';

const SelectedPicture = props => {
    return (
        <div className="select-pane">
            <div className="selected-pic-box">
                <img src={props.object.imgURL} alt={props.object.title}></img>
            </div>
            <div className="info-pane">
                <h1>About this image</h1>
                <h2>TITLE</h2>
                <p>{props.object.title}</p>
                <h2>CATALOG</h2>
                <p>{props.object.catalog}</p>
                <h2>CONTENT</h2>
                <p>{props.object.content}</p>
            </div>
            <button className="selected-pane-btn" onClick={props.deselect}>Close</button>
        </div>
    )
}

export default SelectedPicture;