
import Box from "@mui/material/Box";
import PageContainer from "@/app/components/container/PageContainer";
// components
import checkUser from "@/utils/checkUser";
import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";

export default async function Dashboard() {
  // const router = useRouter();
  const isUser= await checkUser();
  if(!isUser){
    redirect('/login');
  }
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
      </Box>
    </PageContainer>
  );
}
