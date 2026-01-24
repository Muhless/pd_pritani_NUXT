<script setup>
import BaseCard from "~/components/card/BaseCard.vue";
import DebtCard from "~/components/card/finance/DebtCard.vue";
import FinanceCard from "~/components/card/finance/FinanceCard.vue";
import IncomeCard from "~/components/card/finance/IncomeCard.vue";
import SalaryCard from "~/components/card/finance/SalaryCard.vue";

useHead({
  title: "Keuangan | PG. Pritani",
});

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div class="p-9 space-y-3">
    <BaseCard>
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">Finance</h1>
      </div>
    </BaseCard>
    <div class="grid grid-cols-3 gap-3">
      <FinanceCard title="Salary" />
      <FinanceCard title="Debt" />
      <FinanceCard title="Income" />
    </div>
    <SalaryCard />
    <IncomeCard />
    <DebtCard />
  </div>
</template>
