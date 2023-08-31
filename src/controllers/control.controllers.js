export const getControls = (req, res) => {
    const scripts = [{script:'https://cdn.socket.io/4.5.4/socket.io.min.js'}, {script:'/js/socket-controles.js'}];
    res.render('control', {scripts: scripts});
};