import React from 'react';

export default class Merp extends React.Component {
    render() {
        // eslint-disable-next-line jsx-a11y/iframe-has-title
        return <iframe style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} src={`https://www.youtube.com/embed/ed-XFmrzht4?autoplay=1&loop=1&&controls=0&enablejsapi=1&iv_load_policy=3&modestbranding=1`} frameBorder="0" allowFullScreen />;
    }

}