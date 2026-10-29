import { editorialRoute } from "../_studio/editorialRoute";

const route = editorialRoute("core-web-vitals-checker");
export const generateMetadata = route.generateMetadata;
export default route.Page;
