"use client";
import Typography from "@mui/material/Typography";
import PageContainer from "@/app/components/container/PageContainer";
import DashboardCard from "@/app/components/shared/DashboardCard";
import IncomeList from "./IncomeList";
import ExpenditureList from "./ExpenditureList";

export default function FinancePage() {
  return (
    <PageContainer title="Finance Page" description="Manage your finances">
      <DashboardCard title="Incomes">
        <IncomeList />
      </DashboardCard>
      <DashboardCard title="Expenditures">
        <ExpenditureList />
      </DashboardCard>
    </PageContainer>
  );
}
