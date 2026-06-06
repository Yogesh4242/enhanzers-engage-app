import LogoutButton from "@/components/LogoutButton";

export default function WorkerDashboardPage() {
  return (
    <main className="min-h-screen bg-neutral-950 p-8 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Worker Dashboard</h1>
          <p className="mt-2 text-neutral-400">
            Welcome worker. You can manage customer details and restaurant tasks here.
          </p>
        </div>

        <LogoutButton />
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-xl font-semibold">Customer Entry</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Add or update customer visit details.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Track customer orders and bill amounts.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-xl font-semibold">Loyalty Points</h2>
          <p className="mt-2 text-sm text-neutral-400">
            View points earned by customers.
          </p>
        </div>
      </section>
    </main>
  );
}