const http = require('http')
const CurrencyHelper = require('../helper/CurrencyHelper')
const BookHelper = require('../helper/BookHelper')
const BookInputHelper = require('../helper/BookInputHelper')

const main = (app) => {
    let server = http.createServer(app)

    const { Server } = require("socket.io");
    const io = new Server(server);
    
    io.on('connection', (socket) => {
        socket.on('get_data', async () => {
            try{
                const helper = new CurrencyHelper();
                const data = await helper.getInfo();

                io.emit('get_data', data);
            } catch (err) {
                console.log(err)
            }
        });

        socket.on('get_book', async () => {
            try{
                const helper = new BookHelper();
                const data = await helper.getInfo();
                io.emit('get_book', data);
            } catch (err) {
                console.log(err)
            }
        });

        socket.on('input_book', async (data) => {
            try{
                const helper = new BookInputHelper();
                return await helper.inputBooks(data);
            } catch (err) {
                console.log(err)
            }
        });
    });

    return server
}

module.exports = main