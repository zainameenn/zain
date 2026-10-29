import { editorialRoute } from "../_studio/editorialRoute";

const route = editorialRoute("website-audit-tool");
export const generateMetadata = route.generateMetadata;
export default route.Page;
