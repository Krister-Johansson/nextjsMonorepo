import { Button } from "@repo/ui/components/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Welcome to{" "}
            <span className="text-primary">Kanbananza</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            The ultimate kanban board management platform for teams and organizations.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" asChild>
              <a href="/dashboard">Go to Dashboard</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/kiosk">View Kiosk</a>
            </Button>
          </div>
        </div>
        
        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground">Landing Page</h3>
            <p className="mt-2 text-muted-foreground">
              Public-facing website for kanbananza.com
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground">Dashboard</h3>
            <p className="mt-2 text-muted-foreground">
              Admin interface for managing kanban boards
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-foreground">Kiosk</h3>
            <p className="mt-2 text-muted-foreground">
              Public display for showing kanban boards
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
