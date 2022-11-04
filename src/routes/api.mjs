import users from "#Controller/users";
import auth from "#Controller/auth";
import receptionAgenda from "#Controller/receptionAgenda";
import project from "#Controller/project";
import sponsor from "#Controller/sponsor";
import patient from "#Controller/patient";
import gender from "#Controller/gender";

export function routes(app) {
  app.get('/404', function(req, res, next){
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  next();
});
  app.use("/Users", users);
  app.use("/Auth", auth);
  app.use("/appointment", receptionAgenda)
  app.use("/project",project)
  app.use("/sponsor",sponsor)
  app.use("/patient",patient)
  app.use("/gender",gender)

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
