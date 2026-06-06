import LogoutButton from "@/components/LogoutButton";

export default function CustomerDashboardPage() {
  return (
    <main className="min-h-screen bg-neutral-950 p-8 text-white">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <p className="mt-2 text-neutral-400">
            Welcome customer. You can view your loyalty points and offers here.
          </p>
        </div>

        <LogoutButton />
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-xl font-semibold">My Points</h2>
          <p className="mt-2 text-sm text-neutral-400">
            Check your current loyalty points.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-xl font-semibold">My Offers</h2>
          <p className="mt-2 text-sm text-neutral-400">
            View offers available for your account.
          </p>
        </div>

        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <h2 className="text-xl font-semibold">Visit History</h2>
          <p className="mt-2 text-sm text-neutral-400">
            See your previous restaurant visits.
          </p>
        </div>
      </section>
    </main>
  );
}