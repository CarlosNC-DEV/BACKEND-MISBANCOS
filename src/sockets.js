import Tickets from './models/Tickets.js';

export default (io)=>{
    io.on('connection', (Socket)=>{
        
        Socket.on('asesor-tickest', async()=>{
            const ticketsCaja = await Tickets.find({ tipoConsulta: 'caja', atendido:false }).lean();
            const ticketsAsesoria = await Tickets.find({ tipoConsulta: 'asesoria', atendido:false}).lean();
            io.emit('tickest-caja', ticketsCaja);
            io.emit('tickest-asesoria', ticketsAsesoria);
        });

        Socket.on('atendiendo', async()=>{

            const atendiendoCaja = await Tickets.find({ enEspera: false, atendido:true, atendido:false, tipoConsulta: 'caja'});

            const atendinedoAsesor = await Tickets.find({ enEspera: false, atendido:true, atendido:false, tipoConsulta: 'asesoria'});
          
            Socket.emit('ticket-atendiendo-caja', atendiendoCaja);
            Socket.emit('ticket-atendiendo-asesor', atendinedoAsesor);


        });

    })
    
}