import express from "express";
import { NextFunction, Request, Response } from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/*                                                      A D M I N    R O U T E S */
/***************************************************************************************************************************************************/
/* ADMIN AUTH ROUTES */
import signinRoutes from "./admin/auth/signin";
import signupRoutes from "./admin/auth/signup";
import signoutRoutes from "./admin/auth/signout";
import updateAdmin from "./admin/auth/updateAdmin";
import me from "./admin/auth/me";
/* ADMIN ROUTES */
import parentRoutes from "./admin/parent/ParentRoutes";


/*                                        I N I T I A L I Z E    D A S H B O A R D    R O U T E S                                                  */
/***************************************************************************************************************************************************/
app.use("/parent", parentRoutes);
app.use("/signup", signupRoutes);
app.use("/signout", signoutRoutes);
app.use("/signin", signinRoutes);
app.use("/admin", updateAdmin);
app.use("/me", me);
/***************************************************************************************************************************************************/


// if a route that doesn't exist is executed we throw an error
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: "failed",
    message: "the route is missing a parameter or doesn't exist",
  });
});

export default app;
