import { protectRoute } from "@/features/auth/utils";
import Editor from "../../../../features/editor/components/editor";

const DesignEditPage = async () => {
  await protectRoute();
  return <Editor />;
};

export default DesignEditPage;
