import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthContext, useAuthProvider } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Directory from "@/pages/directory";
import Events from "@/pages/events";
import Donate from "@/pages/donate";
import Chat from "@/pages/chat";
import Login from "@/pages/login";
import Register from "@/pages/register";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/directory" component={Directory} />
      <Route path="/events" component={Events} />
      <Route path="/donate" component={Donate} />
      <Route path="/chat" component={Chat} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const authValue = useAuthProvider();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={authValue}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
