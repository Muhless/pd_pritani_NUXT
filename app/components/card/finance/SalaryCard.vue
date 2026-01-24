<script setup lang="ts">
import BaseCard from "../BaseCard.vue";
</script>

<template>
  <BaseCard>
    <div>
      <h1>Employees Salary</h1>
    </div>
    <table class="w-full table-fixed border">
      <colgroup>
        <col class="w-1/12" />
        <col class="w-1/5" />
        <col class="w-1/5" />
        <col class="w-1/5" />
        <col class="w-1/5" />
        <col class="w-1/5" />
        <col class="w-1/5" />
      </colgroup>
      <thead>
        <tr>
          <th class="">No</th>
          <th class="border">Nama</th>
          <th class="border">Work</th>
          <th class="border">Absent</th>
          <th class="border">Salary</th>
          <th class="border">Penalty</th>
          <th class="border">Total</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr>
          <td class="border">1</td>
          <td class="border">Muhta Nuryadi</td>
          <td class="border">20 days</td>
          <td class="border text-red-500">3 days</td>
          <td class="border">4.000.000</td>
          <td class="border">Rp 400.000</td>
          <td class="border">3.600.000</td>
        </tr>
      </tbody>
    </table>
  </BaseCard>
</template>
