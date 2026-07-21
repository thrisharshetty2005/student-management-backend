import studentApiHandler from "./src/Controller/managestudents/apiHelper.js";
const routes=(app)=>{
    app.use("/api/student",studentApiHandler);
};
export default routes;