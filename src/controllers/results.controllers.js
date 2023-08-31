export const getResults = (req, res) => {
    const scripts = [{script:'https://cdn.socket.io/4.5.4/socket.io.min.js'}, {script:'/js/socket-resultados.js'}];
    res.render('results', {scripts: scripts});
}