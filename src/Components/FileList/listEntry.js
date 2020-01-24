import React from "react";

const ListEntry =  (props) => {
    return <div className={props.className + " mouse-pointer"} onClick={props.onClick}>
        {props.caption}
    </div>

}

export default ListEntry;