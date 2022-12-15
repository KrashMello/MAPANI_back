import * as users from "#Controller/users";
import * as auth from "#Controller/auth";
import * as receptionAgenda from "#Controller/receptionAgenda";
import * as project from "#Controller/project";
import * as sponsor from "#Controller/sponsor";
import * as patient from "#Controller/patient";
import * as gender from "#Controller/gender";
import * as documentType from "#Controller/documentType";
import * as martialStatus from "#Controller/martialStatus";
import * as disability from "#Controller/disability";
import * as region from "#Controller/region";
import * as stade from "#Controller/stade";
import * as municipality from "#Controller/municipality";
import * as parrish from "#Controller/parrish";
import * as jobPosition from "#Controller/jobPosition";
import * as departament from "#Controller/departament";
import * as employed from "#Controller/employed";
import * as userRoles from "#Controller/user_roles";
import * as userStatus from "#Controller/user_status";

export function routes(app) {
  app.get("/404", function (req, res, next) {
    next();
  });
  app.use("/Users", users.apiRoutes);
  app.use("/Auth", auth.apiRoutes);
  app.use("/appointment", receptionAgenda.apiRoutes);
  app.use("/project", project.apiRoutes);
  app.use("/sponsor", sponsor.apiRoutes);
  app.use("/patient", patient.apiRoutes);
  app.use("/gender", gender.apiRoutes);
  app.use("/documentType", documentType.apiRoutes);
  app.use("/martialStatus", martialStatus.apiRoutes);
  app.use("/disability", disability.apiRoutes);
  app.use("/region", region.apiRoutes);
  app.use("/stade", stade.apiRoutes);
  app.use("/municipality", municipality.apiRoutes);
  app.use("/parrish", parrish.apiRoutes);
  app.use("/jobPosition", jobPosition.apiRoutes);
  app.use("/departament", departament.apiRoutes);
  app.use("/employed", employed.apiRoutes);
  app.use("/userRoles", userRoles.apiRoutes);
  app.use("/userStatus", userStatus.apiRoutes);

  app.use(function (req, res, next) {
    res.status(404);

    res.format({
      json: function () {
        res.json({ error: "Not found" });
      },
      default: function () {
        res.type("txt").send("Not found");
      },
    });
  });
}
export function sockIO(io) {
  io.on("connection", (socket) => {
    console.log(`connection success id: ${socket.id}`);
    // users.socketRoutes(io, socket);
    // auth.socketRoutes(io, socket);
    // receptionAgenda.socketRoutes(io, socket);
    // employed.socketRoutes(io, socket);
  });
}
