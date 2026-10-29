import { editorialRoute } from "../_studio/editorialRoute";

const route = editorialRoute("website-traffic-checker");
export const generateMetadata = route.generateMetadata;
export default route.Page;
