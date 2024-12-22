import Box from "@mui/material/Box";
import PageContainer from "@/app/components/container/PageContainer";
// components
import checkUser from "@/utils/checkUser";
import { redirect } from "next/navigation";
import { CardContent, Grid, Typography } from "@mui/material";
// import { useRouter } from "next/navigation";

async function fetchData(api: string) {
  try {
    const url = process.env.API_URL+ api;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${api}`);
    }
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}

export default async function Dashboard() {
  // const router = useRouter();
  const isUser = await checkUser();
  if (!isUser) {
    redirect('/login');
  }

  const totalEmployees = await fetchData('/api/getTotalEmployees');
  const totalCows = await fetchData('/api/getTotalCows');
  const milkStock = await fetchData('/api/getMilkStock');
  const highestSale = await fetchData('/api/getHighestSale');
  const highestExpenditure = await fetchData('/api/getHighestExpenditure');

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} lg={2}>
            <Box bgcolor={"primary" + ".light"} textAlign="center">
              <CardContent>
                <Typography
                  color={"primary" + ".main"}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  Employees
                </Typography>
                <Typography
                  color={"primary" + ".main"}
                  variant="h4"
                  fontWeight={600}
                >
                  {totalEmployees.error ? "Error" : totalEmployees.totalEmployees}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} lg={2}>
            <Box bgcolor={"primary" + ".light"} textAlign="center">
              <CardContent>
                <Typography
                  color={"primary" + ".main"}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  Cows
                </Typography>
                <Typography
                  color={"primary" + ".main"}
                  variant="h4"
                  fontWeight={600}
                >
                  {totalCows.error ? "Error" : totalCows.totalCows}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} lg={2}>
            <Box bgcolor={"primary" + ".light"} textAlign="center">
              <CardContent>
                <Typography
                  color={"primary" + ".main"}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  Milk Stock
                </Typography>
                <Typography
                  color={"primary" + ".main"}
                  variant="h4"
                  fontWeight={600}
                >
                  {milkStock.error ? "Error" : milkStock.totalMilk}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} lg={2}> 
            <Box bgcolor={"primary" + ".light"} textAlign="center">
              <CardContent>
                <Typography
                  color={"primary" + ".main"}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  Highest Sale
                </Typography>
                <Typography
                  color={"primary" + ".main"}
                  variant="h4"
                  fontWeight={600}
                >
                  {highestSale.error ? "Error" : highestSale.highestSale.amount}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} lg={2}>
            <Box bgcolor={"primary" + ".light"} textAlign="center">
              <CardContent>
                <Typography
                  color={"primary" + ".main"}
                  mt={1}
                  variant="subtitle1"
                  fontWeight={600}
                >
                  Highest Expenditure
                </Typography>
                <Typography
                  color={"primary" + ".main"}
                  variant="h4"
                  fontWeight={600}
                >
                  {highestExpenditure.error ? "Error" : highestExpenditure.highestExpenditure.amount}
                </Typography>
              </CardContent>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
}
