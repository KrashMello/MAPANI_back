import * as users from "#Controller/users";
import * as auth from "#Controller/auth";
import * as receptionAgenda from "#Controller/receptionAgenda";
import * as project from "#Controller/project";
import * as sponsor from "#Controller/sponsor";
import * as patient from "#Controller/patient";
import * as gender from "#Controller/gender";

export function routes(app) {
  app.get('/404', function(req, res, next){
    next();
  });
  app.use("/Users", users.apiRoutes );
  app.use("/Auth", auth.apiRoutes);
  app.use("/appointment", receptionAgenda.apiRoutes)
  app.use("/project",project.apiRoutes)
  app.use("/sponsor",sponsor.apiRoutes)
  app.use("/patient",patient.apiRoutes)
  app.use("/gender",gender.apiRoutes)

  app.use(function(req, res, next){
    res.status(404);

    res.format({
      json: function () {
        res.json({ error: 'Not found' })
      },
      default: function () {
        res.type('txt').send('Not found')
      }
    })
  }); 
}
export function sockIO(io) {
   io.on('connection', (socket) => {
    console.log(`connection success id: ${socket.id}`);
    users.socketRoutes(socket);
    auth.socketRoutes(io,socket);
    receptionAgenda.socketRoutes(io,socket);

  })
}
