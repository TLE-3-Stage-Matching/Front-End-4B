import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/internship-coordinator/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/internship-coordinator/login"!</div>
}
