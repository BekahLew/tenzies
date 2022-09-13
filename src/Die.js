import React from "react";

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "pink" : "white"
    }

    return (
        <div className="die" style={styles} onClick={props.holdDice}>
            <h2>{props.value}</h2>
        </div>
    )
}