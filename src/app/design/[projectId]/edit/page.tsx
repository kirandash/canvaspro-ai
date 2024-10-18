import EditorPage from "@/app/design/[projectId]/edit/editor-page";
import { protectRoute } from "@/features/auth/utils";

type Props = {
  params: {
    projectId: string;
  };
};

const DesignEditPage = async ({ params }: Props) => {
  const { projectId } = params;

  await protectRoute();
  return <EditorPage projectId={projectId} />;
};

export default DesignEditPage;
