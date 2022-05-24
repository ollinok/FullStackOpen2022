const Notification = ({ message, success }) => {
    if (message === null) {
        return null;
    }
    const styling = success ? {color:'green',borderColor:'green'} : {color:'red',borderColor:'red'};

    return (
        <div className="notification" style={styling}>
            {message}
        </div>
    );
}

export default Notification;