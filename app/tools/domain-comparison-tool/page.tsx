import { editorialRoute } from "../_studio/editorialRoute";

const route = editorialRoute("domain-comparison-tool");
export const generateMetadata = route.generateMetadata;
export default route.Page;
