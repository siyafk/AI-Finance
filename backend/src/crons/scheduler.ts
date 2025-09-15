import cron from "node-cron";
import { processRecurringTransactions } from "./jobs/transaction.job";

const scheduleJob = (name: string, time: string, job: Function) => {
  console.log(`Scheduling ${name} at ${time}`);

  return cron.schedule(
    time,
    async () => {
      try {
        await job();
        console.log(`${name} completed`);
      } catch (err) {
        console.log(err);
      }
    },
    {
      timezone: "UTC",
    }
  );
};

export const startJobs = () => {
    return [
        scheduleJob("Transaction" , "5 0 * * *" , processRecurringTransactions),

    //  scheduleJob("Reports", "30 2 1 * *", processReportJob),
    ]
}
